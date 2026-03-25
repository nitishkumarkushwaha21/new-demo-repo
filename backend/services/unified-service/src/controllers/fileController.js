const sequelize = require("../config/database");
const FileNode = require("../models/FileNode");
const {
  createProblemForFile,
  deleteProblemByFileId,
  updateProblemByFileId,
} = require("../services/problemDomainService");
const { getUserIdFromReq } = require("../shared/requestContext");

async function resetFileNodeSequence() {
  const [rows] = await sequelize.query(
    'SELECT COALESCE(MAX(id), 0) AS max_id FROM "FileNodes";',
  );
  const nextId = Number(rows[0].max_id || 0) + 1;
  await sequelize.query(
    `ALTER SEQUENCE "FileNodes_id_seq" RESTART WITH ${nextId};`,
  );
  return nextId;
}

exports.getFileSystem = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const nodes = await FileNode.findAll({ where: { userId }, raw: true });

    const buildTree = (parentId) =>
      nodes
        .filter((node) => node.parentId === parentId)
        .map((node) => ({
          ...node,
          id: node.id,
          children: node.type === "folder" ? buildTree(node.id) : undefined,
        }));

    return res.json(buildTree(null));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createFileNode = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, type, parentId, link } = req.body;

    let fileNode;
    try {
      fileNode = await FileNode.create({
        userId,
        name,
        type,
        parentId: parentId || null,
        link: link || "",
      });
    } catch (createErr) {
      const detail = createErr.errors
        ? createErr.errors.map((e) => `${e.path}: ${e.message}`).join("; ")
        : createErr.message;

      if (/id: id must be unique/i.test(detail)) {
        const nextId = await resetFileNodeSequence();
        console.warn(
          `[createFileNode] sequence drift detected. Reset to ${nextId} and retrying.`,
        );
        fileNode = await FileNode.create({
          userId,
          name,
          type,
          parentId: parentId || null,
          link: link || "",
        });
      } else {
        throw createErr;
      }
    }

    if (type === "file") {
      try {
        await createProblemForFile({
          fileId: fileNode.id,
          title: name,
          userId,
        });
      } catch (err) {
        console.error("Failed to create problem in unified service:", err.message);
      }
    }

    return res.status(201).json(fileNode);
  } catch (error) {
    const detail = error.errors
      ? error.errors.map((e) => `${e.path}: ${e.message}`).join("; ")
      : error.message;
    console.error("[createFileNode] error:", detail);
    return res.status(400).json({ message: detail });
  }
};

exports.updateFileNode = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, link, isSolved, isRevised, isImportant } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (link !== undefined) updateData.link = link;
    if (isSolved !== undefined) updateData.isSolved = isSolved;
    if (isRevised !== undefined) updateData.isRevised = isRevised;
    if (isImportant !== undefined) updateData.isImportant = isImportant;

    const [updatedRows] = await FileNode.update(updateData, {
      where: { id: req.params.id, userId },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const fileNode = await FileNode.findOne({
      where: { id: req.params.id, userId },
    });

    if (name && fileNode.type === "file") {
      try {
        await updateProblemByFileId({
          fileId: fileNode.id,
          userId,
          payload: { title: name },
        });
      } catch (err) {
        console.error("Failed to update problem title:", err.message);
      }
    }

    return res.json(fileNode);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteFileNode = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const deleted = await FileNode.destroy({ where: { id, userId } });

    if (deleted) {
      try {
        await deleteProblemByFileId({ fileId: id, userId });
      } catch (err) {
        console.error("Failed to delete problem:", err.message);
      }
    }

    return res.json({ message: "File deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
