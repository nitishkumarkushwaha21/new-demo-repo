const express = require("express");
const {
  getFileSystem,
  createFileNode,
  updateFileNode,
  deleteFileNode,
} = require("../controllers/fileController");

const router = express.Router();

router.get("/", getFileSystem);
router.post("/", createFileNode);
router.put("/:id", updateFileNode);
router.delete("/:id", deleteFileNode);

module.exports = router;
