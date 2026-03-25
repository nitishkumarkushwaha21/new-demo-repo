const {
  createProblemForFile,
  findOrCreateProblem,
  formatProblemResponse,
  updateProblemByFileId,
  deleteProblemByFileId,
} = require("../services/problemDomainService");
const { getUserIdFromReq } = require("../shared/requestContext");

exports.getProblem = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const problem = await findOrCreateProblem({
      fileId: req.params.fileId,
      userId,
    });

    return res.json(formatProblemResponse(problem));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createProblem = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { fileId, title } = req.body;
    const problem = await createProblemForFile({ fileId, title, userId });
    return res.status(201).json(problem);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updated = await updateProblemByFileId({
      fileId: req.params.fileId,
      userId,
      payload: req.body,
    });

    return res.json(formatProblemResponse(updated));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await deleteProblemByFileId({
      fileId: req.params.fileId,
      userId,
    });

    return res.json({ message: "Problem deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
