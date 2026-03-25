const axios = require("axios");

/**
 * openrouterService — uses OpenRouter API with DeepSeek to identify
 * the LeetCode problem from a YouTube video title.
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-chat";

function getOpenRouterApiKey() {
  // Backward compatibility: existing deployments may still use OPENAI_API_KEY
  // with an OpenRouter token value.
  return process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
}

function parseModelJson(rawText) {
  if (!rawText) return null;

  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (_err) {
    // Some models add prose around JSON. Extract the first object block.
    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");
    if (first >= 0 && last > first) {
      const objectSlice = cleaned.slice(first, last + 1);
      try {
        return JSON.parse(objectSlice);
      } catch (_innerErr) {
        return null;
      }
    }
    return null;
  }
}

function normalizeVideoTitle(title) {
  return String(title || "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatCandidateContext(candidateProblems = []) {
  if (!Array.isArray(candidateProblems) || candidateProblems.length === 0) {
    return "None";
  }

  return candidateProblems
    .slice(0, 8)
    .map(
      (p, index) =>
        `${index + 1}. ${p.title} | slug=${p.titleSlug} | id=${p.frontendId || "n/a"} | difficulty=${p.difficulty || "n/a"} | score=${p.score ?? "n/a"}`,
    )
    .join("\n");
}

/**
 * Given a DSA tutorial video title, asks DeepSeek (via OpenRouter) to
 * identify the corresponding LeetCode problem.
 *
 * Returns: { title, titleSlug, difficulty, confidence }
 * Returns null if no problem could be identified or on error.
 */
async function identifyLeetCodeProblem(videoTitle, options = {}) {
  const apiKey = getOpenRouterApiKey();
  const candidateProblems = options?.candidateProblems || [];
  const cleanedTitle = normalizeVideoTitle(videoTitle);

  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY (or OPENAI_API_KEY fallback) is not set in environment variables",
    );
  }

  const prompt = `Match this YouTube DSA video title to exact LeetCode problem.

Rules:
- Prefer one of the candidate problems when they match semantically.
- If the title does not clearly map to a LeetCode problem, return null fields.
- Do not hallucinate a slug outside the candidates unless confidence is very high.

Return ONLY a valid JSON object (no markdown, no explanation):
{
  "title": "string - the exact LeetCode problem title",
  "titleSlug": "string - the LeetCode URL slug (e.g. two-sum)",
  "frontendId": "string|null - LeetCode question number if known",
  "difficulty": "string - Easy | Medium | Hard",
  "confidence": number between 0 and 1
}

If you cannot identify a specific LeetCode problem, return:
{ "title": null, "titleSlug": null, "difficulty": null, "confidence": 0 }

Original Title: ${videoTitle}
Cleaned Title: ${cleanedTitle}
Candidate Problems:
${formatCandidateContext(candidateProblems)}`;

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      },
    );

    const raw = response.data?.choices?.[0]?.message?.content?.trim();
    if (!raw) return null;

    const parsed = parseModelJson(raw);
    if (!parsed.titleSlug) return null;

    return parsed;
  } catch (err) {
    console.error(`OpenRouter error for title "${videoTitle}":`, err.message);
    return null;
  }
}

module.exports = { identifyLeetCodeProblem };
