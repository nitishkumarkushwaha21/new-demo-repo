const express = require("express");
const {
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} = require("../controllers/problemController");
const { importLeetCodeProblem } = require("../controllers/importController");

const router = express.Router();

router.get("/:fileId", getProblem);
router.post("/", createProblem);
router.put("/:fileId", updateProblem);
router.delete("/:fileId", deleteProblem);
router.post("/import", importLeetCodeProblem);

module.exports = router;
