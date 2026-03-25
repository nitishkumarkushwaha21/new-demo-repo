const axios = require("axios");

/**
 * leetcodeService — fetches full problem data from LeetCode's public GraphQL API.
 */

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";
const LEETCODE_ALL_PROBLEMS_URL = "https://leetcode.com/api/problems/all/";

let frontendIdToSlugCache = null;
let problemCatalogCache = null;
let tokenToProblemIdsCache = null;

const STOP_WORDS = new Set([
  "leetcode",
  "problem",
  "problems",
  "solution",
  "solutions",
  "coding",
  "interview",
  "explained",
  "explanation",
  "tutorial",
  "approach",
  "optimal",
  "easy",
  "medium",
  "hard",
  "daily",
  "challenge",
  "dsa",
  "hindi",
  "english",
  "in",
  "with",
  "by",
  "for",
  "the",
  "and",
  "of",
  "to",
  "on",
  "at",
  "or",
  "vs",
  "part",
  "episode",
  "ep",
  "live",
  "class",
  "short",
  "shorts",
]);

// GraphQL query to fetch problem details by slug
const PROBLEM_DETAIL_QUERY = `
  query getProblemDetail($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      title
      titleSlug
      difficulty
      content
      exampleTestcases
      codeSnippets {
        lang
        langSlug
        code
      }
    }
  }
`;

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTokens(text) {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  return normalized
    .split(/[\s-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
    .filter((token) => !/^\d+$/.test(token))
    .filter((token) => !STOP_WORDS.has(token));
}

function extractFrontendIdHints(text) {
  const hints = new Set();
  const normalized = String(text || "");

  const matchers = [
    /(?:leetcode|lc)\s*#?\s*(\d{1,4})\b/gi,
    /\b(?:problem|ques(?:tion)?)\s*#?\s*(\d{1,4})\b/gi,
    /\b#(\d{1,4})\b/g,
    /\b(\d{1,4})\s*[.\-:|]\s*[a-z]/gi,
    /^(\d{1,4})\b/gi,
  ];

  for (const matcher of matchers) {
    for (const match of normalized.matchAll(matcher)) {
      const id = Number(match?.[1]);
      if (!id || id < 1 || id > 4000) continue;
      hints.add(String(id));
    }
  }

  return hints;
}

/**
 * Fetches full problem data from LeetCode by title slug.
 * Returns a simplified problem object or null on failure.
 */
async function fetchProblemBySlug(titleSlug) {
  try {
    const response = await axios.post(
      LEETCODE_GRAPHQL_URL,
      {
        query: PROBLEM_DETAIL_QUERY,
        variables: { titleSlug },
      },
      {
        headers: {
          "Content-Type": "application/json",
          // LeetCode requires a referer header to avoid blocks
          Referer: `https://leetcode.com/problems/${titleSlug}/`,
          "User-Agent": "Mozilla/5.0 (compatible; AlgoNoteAI/1.0)",
        },
        timeout: 10000,
      },
    );

    const question = response.data?.data?.question;
    if (!question) return null;

    // Extract JavaScript starter code as the default
    const jsSnippet = question.codeSnippets?.find(
      (s) => s.langSlug === "javascript",
    );
    const starterCode =
      jsSnippet?.code || question.codeSnippets?.[0]?.code || "";

    return {
      title: question.title,
      titleSlug: question.titleSlug,
      difficulty: question.difficulty,
      description: question.content || "",
      exampleTestcases: question.exampleTestcases || "",
      starterCode,
      leetcodeLink: `https://leetcode.com/problems/${question.titleSlug}/`,
    };
  } catch (err) {
    console.error(`LeetCode fetch error for slug "${titleSlug}":`, err.message);
    return null;
  }
}

async function getFrontendIdToSlugMap() {
  if (frontendIdToSlugCache) return frontendIdToSlugCache;

  const response = await axios.get(LEETCODE_ALL_PROBLEMS_URL, {
    timeout: 20000,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AlgoNoteAI/1.0)",
    },
  });

  const pairs = response.data?.stat_status_pairs || [];
  const map = new Map();

  for (const item of pairs) {
    const frontendId = String(item?.stat?.frontend_question_id || "").trim();
    const slug = item?.stat?.question__title_slug;
    if (!frontendId || !slug) continue;
    if (!map.has(frontendId)) {
      map.set(frontendId, slug);
    }
  }

  frontendIdToSlugCache = map;
  return frontendIdToSlugCache;
}

async function getProblemCatalog() {
  if (problemCatalogCache && tokenToProblemIdsCache) {
    return {
      catalog: problemCatalogCache,
      tokenToProblemIds: tokenToProblemIdsCache,
    };
  }

  const response = await axios.get(LEETCODE_ALL_PROBLEMS_URL, {
    timeout: 20000,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AlgoNoteAI/1.0)",
    },
  });

  const pairs = response.data?.stat_status_pairs || [];
  const catalog = [];
  const tokenToProblemIds = new Map();

  for (const item of pairs) {
    const title = String(item?.stat?.question__title || "").trim();
    const titleSlug = item?.stat?.question__title_slug;
    const frontendId = String(item?.stat?.frontend_question_id || "").trim();
    const difficultyLevel = Number(item?.difficulty?.level || 0);

    if (!title || !titleSlug || !frontendId) continue;

    const tokens = splitTokens(title);
    const problem = {
      title,
      titleSlug,
      frontendId,
      difficulty:
        difficultyLevel === 1
          ? "Easy"
          : difficultyLevel === 2
            ? "Medium"
            : difficultyLevel === 3
              ? "Hard"
              : null,
      normalizedTitle: normalizeText(title),
      tokenSet: new Set(tokens),
    };

    const index = catalog.push(problem) - 1;

    for (const token of problem.tokenSet) {
      if (!tokenToProblemIds.has(token)) {
        tokenToProblemIds.set(token, new Set());
      }
      tokenToProblemIds.get(token).add(index);
    }
  }

  problemCatalogCache = catalog;
  tokenToProblemIdsCache = tokenToProblemIds;

  return { catalog, tokenToProblemIds };
}

function scoreTitleMatch(queryNormalized, queryTokens, idHints, problem) {
  if (!queryNormalized || queryTokens.length === 0) return 0;

  let score = 0;

  if (idHints.size > 0) {
    if (idHints.has(problem.frontendId)) {
      score += 0.8;
    } else {
      score -= 0.25;
    }
  }

  if (problem.normalizedTitle === queryNormalized) {
    score += 1;
  } else if (queryNormalized.includes(problem.normalizedTitle)) {
    score += 0.35;
  } else if (problem.normalizedTitle.includes(queryNormalized)) {
    score += 0.2;
  }

  let overlap = 0;
  for (const token of queryTokens) {
    if (problem.tokenSet.has(token)) overlap += 1;
  }

  const recall = overlap / queryTokens.length;
  const precision = overlap / Math.max(problem.tokenSet.size, 1);
  score += recall * 0.55 + precision * 0.35;

  if (overlap >= 2) score += 0.1;
  if (overlap === queryTokens.length && overlap > 0) score += 0.2;

  return Math.max(0, Math.min(score, 1));
}

async function findProblemCandidatesByTitle(videoTitle, limit = 5) {
  const queryNormalized = normalizeText(videoTitle);
  const queryTokens = splitTokens(videoTitle);
  const idHints = extractFrontendIdHints(videoTitle);

  if (!queryNormalized || queryTokens.length === 0) {
    return [];
  }

  try {
    const { catalog, tokenToProblemIds } = await getProblemCatalog();
    const candidateProblemIds = new Set();

    for (const token of queryTokens) {
      const ids = tokenToProblemIds.get(token);
      if (!ids) continue;
      for (const id of ids) {
        candidateProblemIds.add(id);
      }
    }

    const scored = [];

    for (const id of candidateProblemIds) {
      const problem = catalog[id];
      const score = scoreTitleMatch(
        queryNormalized,
        queryTokens,
        idHints,
        problem,
      );
      if (score < 0.35) continue;

      scored.push({
        title: problem.title,
        titleSlug: problem.titleSlug,
        frontendId: problem.frontendId,
        difficulty: problem.difficulty,
        score: Number(score.toFixed(3)),
      });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, Math.max(1, limit));
  } catch (err) {
    console.error(
      `LeetCode candidate match error for title "${videoTitle}":`,
      err.message,
    );
    return [];
  }
}

async function fetchProblemByFrontendId(frontendId) {
  const id = String(frontendId || "").trim();
  if (!id) return null;

  try {
    const map = await getFrontendIdToSlugMap();
    const slug = map.get(id);
    if (!slug) return null;
    return await fetchProblemBySlug(slug);
  } catch (err) {
    console.error(`LeetCode fetch error for frontend id "${id}":`, err.message);
    return null;
  }
}

module.exports = {
  fetchProblemBySlug,
  fetchProblemByFrontendId,
  findProblemCandidatesByTitle,
};
