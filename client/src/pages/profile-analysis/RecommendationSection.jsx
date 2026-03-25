import React, { useState } from "react";
import {
  Download,
  ExternalLink,
  FolderPlus,
  Loader2,
  Sparkles,
} from "lucide-react";

const RecommendationSection = ({
  recommendations,
  onAddToRevision,
  onExportSheet,
  hasRevisionRows,
  onImportToExplorer,
  isImporting,
  importResult,
}) => {
  const [addingState, setAddingState] = useState({});

  if (!recommendations || Object.keys(recommendations).length === 0) {
    return null;
  }

  const handleAdd = async (problem, topic) => {
    const key = `${topic}-${problem.name}`;
    setAddingState((prev) => ({ ...prev, [key]: "adding" }));

    try {
      await onAddToRevision(problem, topic);
      setAddingState((prev) => ({ ...prev, [key]: "added" }));
      setTimeout(
        () => setAddingState((prev) => ({ ...prev, [key]: null })),
        2500,
      );
    } catch {
      setAddingState((prev) => ({ ...prev, [key]: "error" }));
      setTimeout(
        () => setAddingState((prev) => ({ ...prev, [key]: null })),
        3000,
      );
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch ((difficulty || "").toLowerCase()) {
      case "easy":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
      case "hard":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div className="mb-6 overflow-hidden rounded-[30px] border border-slate-200/70 bg-white/92 p-6 shadow-[0_30px_75px_-52px_rgba(15,23,42,0.95)] dark:border-slate-700 dark:bg-slate-900/88">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-2xl bg-amber-400/15 p-3 text-amber-700 ring-1 ring-inset ring-amber-400/20 dark:text-amber-300">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Generated Questions
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              <b>Add to Revision</b> saves to your list.{" "}
              <b>Import All to Explorer</b> creates the full Weak Areas folder
              in one shot.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            onClick={onImportToExplorer}
            disabled={isImporting}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {isImporting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <FolderPlus size={14} />
            )}
            {isImporting ? "Importing..." : "Import All to Explorer"}
          </button>

          <button
            onClick={onExportSheet}
            disabled={!hasRevisionRows}
            className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors ${
              hasRevisionRows
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-300 dark:hover:bg-emerald-950/35"
                : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-500"
            }`}
          >
            <Download size={14} />
            Export Sheet (CSV)
          </button>
        </div>
      </div>

      {importResult && (
        <div
          className={`mb-4 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium ${
            importResult.success
              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
          }`}
        >
          <span>{importResult.success ? "✓" : "x"}</span>
          <span>{importResult.message}</span>
          {importResult.success && (
            <span className="text-slate-500 dark:text-slate-400">
              check the File Explorer sidebar.
            </span>
          )}
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(recommendations).map(([topic, problems]) => (
          <div
            key={topic}
            className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-slate-50/70 shadow-sm dark:border-slate-800 dark:bg-slate-950/40"
          >
            <div className="border-b border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(241,245,249,0.95))] px-5 py-4 dark:border-slate-800 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.88))]">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Focus:{" "}
                <span className="text-sky-600 dark:text-sky-300">{topic}</span>
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Recommended practice set for this weak area.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200/80 dark:border-slate-800">
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Question
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Difficulty
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Note
                    </th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((prob, idx) => {
                    const addKey = `${topic}-${prob.name}`;
                    const state = addingState[addKey];
                    const practiceUrl = prob.leetcodeUrl || prob.url;

                    return (
                      <tr
                        key={idx}
                        className="border-b border-slate-200/70 transition-colors hover:bg-slate-100/70 dark:border-slate-800 dark:hover:bg-slate-900/70"
                      >
                        <td className="px-5 py-3 text-sm text-slate-700 dark:text-slate-200">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300/80 bg-slate-100 text-sm font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              {idx + 1}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                                {prob.name}
                              </div>
                              {practiceUrl && (
                                <a
                                  href={practiceUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Practice on LeetCode"
                                  className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-sky-500 dark:hover:text-sky-300"
                                >
                                  Open
                                  <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap ${getDifficultyColor(
                              prob.difficulty,
                            )}`}
                          >
                            {prob.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                          <span className="block max-w-[320px] truncate">
                            {prob.comment || "Recommended for this topic"}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {practiceUrl && (
                              <a
                                href={practiceUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="Practice on LeetCode"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                            <button
                              onClick={() => handleAdd(prob, topic)}
                              disabled={state === "adding" || state === "added"}
                              className={`flex min-w-[138px] items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                                state === "added"
                                  ? "bg-green-500 text-white"
                                  : state === "error"
                                    ? "bg-red-500 text-white"
                                    : "border border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                              }`}
                            >
                              {state === "adding" ? (
                                <>
                                  <div className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                  Adding...
                                </>
                              ) : state === "added" ? (
                                "Saved"
                              ) : state === "error" ? (
                                "Failed"
                              ) : (
                                "+ Add to Revision"
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
