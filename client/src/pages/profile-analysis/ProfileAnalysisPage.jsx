import React, { useState } from "react";
import ProfileInput from "./ProfileInput";
import ProfileSummaryCards from "./ProfileSummaryCards";
import ChartsSection from "./ChartsSection";
import StrengthSection from "./StrengthSection";
import WeaknessSection from "./WeaknessSection";
import RecommendationSection from "./RecommendationSection";
import VerdictSection from "./VerdictSection";
import profileAnalysisApi from "../../services/profileAnalysisApi";

// ── Static topic data (LeetCode API doesn't provide topic breakdown) ──────────
const STATIC_TOPICS = [
  { name: "Array", solved: 0 },
  { name: "String", solved: 0 },
  { name: "Hash Table", solved: 0 },
  { name: "Dynamic Programming", solved: 0 },
  { name: "Tree", solved: 0 },
  { name: "Depth-First Search", solved: 0 },
  { name: "Binary Search", solved: 0 },
  { name: "Graph", solved: 0 },
  { name: "Trie", solved: 0 },
  { name: "Backtracking", solved: 0 },
];

// Distribute solved counts across topics based on difficulty breakdown
const buildTopics = (easy, medium, hard) => {
  const total = easy + medium + hard;
  if (total === 0) return STATIC_TOPICS;
  // Heuristic distribution based on problem ratios
  return [
    { name: "Array", solved: Math.round(easy * 0.6 + medium * 0.4) },
    { name: "String", solved: Math.round(easy * 0.4 + medium * 0.2) },
    { name: "Hash Table", solved: Math.round(medium * 0.25) },
    {
      name: "Dynamic Programming",
      solved: Math.round(medium * 0.3 + hard * 0.4),
    },
    { name: "Tree", solved: Math.round(easy * 0.2 + medium * 0.2) },
    {
      name: "Depth-First Search",
      solved: Math.round(medium * 0.15 + hard * 0.2),
    },
    { name: "Binary Search", solved: Math.round(medium * 0.1 + easy * 0.1) },
    { name: "Graph", solved: Math.round(medium * 0.1 + hard * 0.2) },
    { name: "Trie", solved: Math.round(hard * 0.1) },
    { name: "Backtracking", solved: Math.round(medium * 0.05 + hard * 0.1) },
  ];
};

const calculateVerdict = ({ easySolved, mediumSolved, hardSolved }) => {
  const rawScore = easySolved * 1 + mediumSolved * 2 + hardSolved * 3;
  const MAX_RAW_SCORE = 1500;
  const score = Math.min((rawScore / MAX_RAW_SCORE) * 100, 100);

  let level = "Beginner Level";
  let message =
    "Focus on building foundational knowledge. Solve more easy problems to grasp core concepts.";
  if (score >= 70) {
    level = "SDE Interview Ready";
    message =
      "You have a strong grasp of DSA! Focus on hard problems and mock interviews to sharpen your edge.";
  } else if (score >= 40) {
    level = "Intermediate Level";
    message =
      "Good progress! Start focusing on medium problems and topics like DP and Graphs to level up.";
  }
  return { score, level, message };
};

// ─────────────────────────────────────────────────────────────────────────────
const ProfileAnalysisPage = () => {
  const [profileData, setProfileData] = useState(null);
  const [topics, setTopics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");
  const [revisionSheetRows, setRevisionSheetRows] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const handleAnalyze = async (username) => {
    if (!username.trim()) return;
    setIsLoading(true);
    setError(null);
    setProfileData(null);
    setRevisionSheetRows([]);

    try {
      const { data } = await profileAnalysisApi.analyzeProfile(username.trim());

      const normalised = {
        totalSolved: data.totalSolved ?? 0,
        easySolved: data.easySolved ?? 0,
        mediumSolved: data.mediumSolved ?? 0,
        hardSolved: data.hardSolved ?? 0,
        acceptanceRate:
          data.acceptanceRate != null
            ? parseFloat(data.acceptanceRate).toFixed(1)
            : "N/A",
        ranking: data.ranking ?? 0,
        contestRating: data.contributionPoints ?? data.reputation ?? 0,
      };

      const derivedTopics = buildTopics(
        normalised.easySolved,
        normalised.mediumSolved,
        normalised.hardSolved,
      );
      const verdictData = calculateVerdict(normalised);

      const weakTopicNames = derivedTopics
        .filter((t) => t.solved <= 20)
        .map((t) => t.name);
      let filteredRecs = {};
      try {
        const recRes = await profileAnalysisApi.getRecommendations({
          weakAreas: weakTopicNames,
          limit: 20,
        });
        filteredRecs = recRes.data?.data || {};
      } catch (e) {
        filteredRecs = {};
      }

      setProfileData(normalised);
      setTopics(derivedTopics);
      setVerdict(verdictData);
      setRecommendations(filteredRecs);
      setCurrentUsername(username.trim().toLowerCase());
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Failed to fetch profile. Check username and try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Saves a single problem to the revision list (MongoDB via profile-analysis service)
  const handleAddToRevision = async (problem, topic) => {
    if (!currentUsername) throw new Error("No user analyzed yet.");
    const problemName = problem.problemName || problem.name;
    const leetcodeUrl = problem.leetcodeUrl || problem.url || "";
    const topicFolderName = topic || "Recommended";

    await profileAnalysisApi.addRevision({
      username: currentUsername,
      problemName,
      difficulty: problem.difficulty || "Medium",
      leetcodeUrl,
    });

    setRevisionSheetRows((rows) => [
      ...rows,
      {
        topic: topicFolderName,
        problem: problemName,
        difficulty: problem.difficulty || "Medium",
        link: leetcodeUrl,
      },
    ]);
  };

  // Imports ALL recommendations into the Explorer in one shot (backend service-to-service)
  const handleImportToExplorer = async () => {
    if (!recommendations || Object.keys(recommendations).length === 0) return;
    setIsImporting(true);
    setImportResult(null);
    try {
      const problems = [];
      Object.entries(recommendations).forEach(([topic, probs]) => {
        probs.forEach((p) => {
          problems.push({
            topic,
            problemName: p.name,
            difficulty: p.difficulty || "Medium",
            leetcodeUrl: p.leetcodeUrl || p.url || "",
          });
        });
      });
      const res = await profileAnalysisApi.importWeakAreas({ problems });
      setImportResult({
        success: true,
        message: `Imported ${res.data.filesCreated} problems into Explorer under "Weak Areas"`,
      });
    } catch (err) {
      setImportResult({
        success: false,
        message: err.response?.data?.error || err.message || "Import failed",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const exportRevisionSheet = () => {
    if (!revisionSheetRows.length) return;
    const header = ["Topic", "Problem", "Difficulty", "Link"];
    const lines = revisionSheetRows.map((r) =>
      [r.topic, r.problem, r.difficulty, r.link].join(","),
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `revision-sheet-${currentUsername || "session"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartTopicData = topics
    ? { labels: topics.map((t) => t.name), data: topics.map((t) => t.solved) }
    : null;

  const chartDiffData = profileData
    ? {
        easy: profileData.easySolved,
        medium: profileData.mediumSolved,
        hard: profileData.hardSolved,
      }
    : null;

  return (
    <div className="relative isolate overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.22),transparent_58%)]" />
      <div className="pointer-events-none absolute right-0 top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18),transparent_62%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 overflow-hidden rounded-[32px] border border-white/60 bg-[linear-gradient(135deg,rgba(15,23,42,0.97),rgba(30,41,59,0.94),rgba(51,65,85,0.92))] px-6 py-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.85)] sm:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Interview Readiness Dashboard
          </div>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Profile Analysis
          </h1>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-200 sm:text-lg">
            Audit your LeetCode progress, surface the gaps holding you back,
            and turn weak areas into a sharper practice plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200 ring-1 ring-inset ring-emerald-300/20">
              Topic signals
            </span>
            <span className="rounded-full bg-sky-400/15 px-3 py-1 text-sky-200 ring-1 ring-inset ring-sky-300/20">
              Difficulty mix
            </span>
            <span className="rounded-full bg-amber-400/15 px-3 py-1 text-amber-100 ring-1 ring-inset ring-amber-300/20">
              Generated questions
            </span>
          </div>
        </div>

        <ProfileInput onAnalyze={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200/80 bg-red-50/90 px-5 py-4 text-red-700 shadow-[0_20px_45px_-35px_rgba(220,38,38,0.8)] backdrop-blur">
            <span className="text-xl shrink-0">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {profileData && (
          <div className="animate-fadeIn">
            <ProfileSummaryCards data={profileData} />

            {verdict && (
              <VerdictSection
                score={verdict.score}
                level={verdict.level}
                message={verdict.message}
              />
            )}

            <ChartsSection diffData={chartDiffData} topicData={chartTopicData} />

            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
              <StrengthSection
                strongTopics={topics?.filter((t) => t.solved >= 50)}
              />
              <WeaknessSection
                weakTopics={topics?.filter((t) => t.solved <= 20)}
              />
            </div>

            <RecommendationSection
              recommendations={recommendations}
              onAddToRevision={handleAddToRevision}
              onExportSheet={exportRevisionSheet}
              hasRevisionRows={revisionSheetRows.length > 0}
              onImportToExplorer={handleImportToExplorer}
              isImporting={isImporting}
              importResult={importResult}
            />
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `,
        }}
      />
    </div>
  );
};

export default ProfileAnalysisPage;
