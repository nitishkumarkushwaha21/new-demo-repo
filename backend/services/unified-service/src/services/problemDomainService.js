const Problem = require("../models/Problem");

function normalizeLegacySolutions(problem) {
  if (Array.isArray(problem.solutionEntries) && problem.solutionEntries.length > 0) {
    return problem.solutionEntries;
  }

  const legacyEntries = [
    {
      id: "brute",
      label: "Brute Force",
      code: problem.brute_solution || "",
    },
    {
      id: "better",
      label: "Better",
      code: problem.better_solution || "",
    },
    {
      id: "optimal",
      label: "Optimal",
      code: problem.optimal_solution || "",
    },
  ].filter((entry) => entry.code);

  if (legacyEntries.length > 0) {
    return legacyEntries;
  }

  return [
    {
      id: "optimal",
      label: "Optimal",
      code: "",
    },
  ];
}

function formatProblemResponse(problem) {
  const solutionEntries = normalizeLegacySolutions(problem);

  return {
    id: problem.id,
    fileId: problem.fileId,
    title: problem.title || "",
    slug: problem.slug || "",
    difficulty: problem.difficulty || "",
    description: problem.description || "",
    exampleTestcases: problem.exampleTestcases || "",
    tags: problem.tags || [],
    codeSnippets: problem.codeSnippets || [],
    notes: problem.notes || "",
    solutionEntries,
    solutions: {
      brute:
        solutionEntries.find((entry) => entry.id === "brute")?.code ||
        problem.brute_solution ||
        "",
      better:
        solutionEntries.find((entry) => entry.id === "better")?.code ||
        problem.better_solution ||
        "",
      optimal:
        solutionEntries.find((entry) => entry.id === "optimal")?.code ||
        problem.optimal_solution ||
        "",
    },
    analysis: {
      time: problem.time_complexity || "",
      space: problem.space_complexity || "",
    },
  };
}

async function findOrCreateProblem({ fileId, userId }) {
  const [problem] = await Problem.findOrCreate({
    where: { fileId, userId },
    defaults: {
      userId,
      title: "",
      slug: "",
      difficulty: "",
      description: "",
      exampleTestcases: "",
      tags: [],
      codeSnippets: [],
      solutionEntries: [
        {
          id: "optimal",
          label: "Optimal",
          code: "",
        },
      ],
      notes: "",
      brute_solution: "",
      better_solution: "",
      optimal_solution: "",
      time_complexity: "",
      space_complexity: "",
    },
  });

  return problem;
}

async function createProblemForFile({ fileId, userId, title }) {
  const [problem] = await Problem.findOrCreate({
    where: { fileId, userId },
    defaults: {
      userId,
      fileId,
      title: title || "",
      solutionEntries: [
        {
          id: "optimal",
          label: "Optimal",
          code: "",
        },
      ],
      notes: "",
      brute_solution: "",
      better_solution: "",
      optimal_solution: "",
      time_complexity: "",
      space_complexity: "",
    },
  });

  return problem;
}

async function updateProblemByFileId({ fileId, userId, payload }) {
  let problem = await Problem.findOne({ where: { fileId, userId } });
  if (!problem) {
    problem = await Problem.create({
      userId,
      fileId,
      notes: "",
      solutionEntries: [
        {
          id: "optimal",
          label: "Optimal",
          code: "",
        },
      ],
      brute_solution: "",
      better_solution: "",
      optimal_solution: "",
      time_complexity: "",
      space_complexity: "",
    });
  }

  const {
    solutions,
    notes,
    analysis,
    title,
    slug,
    difficulty,
    description,
    exampleTestcases,
    tags,
    codeSnippets,
    solutionEntries,
  } = payload;

  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (slug !== undefined) updateData.slug = slug;
  if (difficulty !== undefined) updateData.difficulty = difficulty;
  if (description !== undefined) updateData.description = description;
  if (exampleTestcases !== undefined) {
    updateData.exampleTestcases = exampleTestcases;
  }
  if (tags !== undefined) updateData.tags = tags;
  if (codeSnippets !== undefined) updateData.codeSnippets = codeSnippets;
  if (solutionEntries !== undefined) updateData.solutionEntries = solutionEntries;
  if (notes !== undefined) updateData.notes = notes;
  if (solutions) {
    if (solutions.brute !== undefined) {
      updateData.brute_solution = solutions.brute;
    }
    if (solutions.better !== undefined) {
      updateData.better_solution = solutions.better;
    }
    if (solutions.optimal !== undefined) {
      updateData.optimal_solution = solutions.optimal;
    }
  }
  if (analysis) {
    if (analysis.time !== undefined) {
      updateData.time_complexity = analysis.time;
    }
    if (analysis.space !== undefined) {
      updateData.space_complexity = analysis.space;
    }
  }

  await problem.update(updateData);
  return Problem.findOne({ where: { fileId, userId } });
}

async function deleteProblemByFileId({ fileId, userId }) {
  return Problem.destroy({ where: { fileId, userId } });
}

module.exports = {
  createProblemForFile,
  deleteProblemByFileId,
  findOrCreateProblem,
  formatProblemResponse,
  updateProblemByFileId,
};
