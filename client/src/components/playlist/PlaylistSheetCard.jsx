import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FolderPlus,
  Loader2,
  PencilLine,
  PlayCircle,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import playlistApi from "../../services/playlistApi";
import PlaylistProblemRow from "./PlaylistProblemRow";

const PlaylistSheetCard = ({ sheet, onDelete, onRename }) => {
  const [expanded, setExpanded] = useState(false);
  const [problems, setProblems] = useState([]);
  const [isLoadingProblems, setIsLoadingProblems] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderCreated, setFolderCreated] = useState(false);
  const [folderError, setFolderError] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(sheet.name);
  const [isSavingName, setIsSavingName] = useState(false);
  const navigate = useNavigate();

  const handleStartRename = (event) => {
    event.stopPropagation();
    setDraftName(sheet.name);
    setIsEditingName(true);
    setFolderError(null);
  };

  const handleCancelRename = (event) => {
    event.stopPropagation();
    setDraftName(sheet.name);
    setIsEditingName(false);
  };

  const handleSaveRename = async (event) => {
    event.stopPropagation();
    const trimmedName = draftName.trim();

    if (!trimmedName || trimmedName === sheet.name) {
      setIsEditingName(false);
      setDraftName(sheet.name);
      return;
    }

    setIsSavingName(true);
    setFolderError(null);

    try {
      await onRename(sheet.id, trimmedName);
      setIsEditingName(false);
    } catch (error) {
      setFolderError(
        error.response?.data?.error || error.message || "Failed to rename sheet",
      );
    } finally {
      setIsSavingName(false);
    }
  };

  const handleExpand = async () => {
    if (!expanded && problems.length === 0) {
      setIsLoadingProblems(true);
      try {
        const { data } = await playlistApi.getSheet(sheet.id);
        setProblems(data.problems || []);
      } catch (_error) {
        setProblems([]);
      } finally {
        setIsLoadingProblems(false);
      }
    }

    setExpanded((prev) => !prev);
  };

  const handleCreateFolder = async (event) => {
    event.stopPropagation();
    setIsCreatingFolder(true);
    setFolderError(null);

    try {
      await playlistApi.createFolderFromSheet(sheet.id);
      setFolderCreated(true);
      navigate("/");
    } catch (error) {
      setFolderError(
        error.response?.data?.error || error.message || "Failed to create folder",
      );
    } finally {
      setIsCreatingFolder(false);
    }
  };

  const easyCount = problems.filter((problem) => problem.difficulty === "Easy").length;
  const mediumCount = problems.filter(
    (problem) => problem.difficulty === "Medium",
  ).length;
  const hardCount = problems.filter((problem) => problem.difficulty === "Hard").length;

  return (
    <div className="mb-4 overflow-hidden rounded-[22px] border border-slate-500/14 bg-[#151922] shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
      <div className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-[#1a202a]">
        <div className="shrink-0 rounded-2xl border border-slate-500/16 bg-[#1d2330] p-2.5 text-white/80">
          <PlayCircle size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            {isEditingName ? (
              <input
                type="text"
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSaveRename(event);
                  }
                  if (event.key === "Escape") {
                    handleCancelRename(event);
                  }
                }}
                autoFocus
                className="h-10 min-w-0 flex-1 rounded-xl border border-slate-400/18 bg-[#10141c] px-3 text-sm font-semibold text-white outline-none focus:border-white/25 focus:bg-[#171c25]"
              />
            ) : (
              <p className="truncate text-base font-bold text-white">{sheet.name}</p>
            )}
            <span className="rounded-full border border-slate-500/16 bg-[#11151d] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
              Sheet
            </span>
          </div>

          <div className="mt-3 h-px w-20 bg-gradient-to-r from-white/20 to-transparent" />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-500/16 bg-[#10141c] px-3 py-1 text-xs font-semibold text-white/78">
              {problems.length || sheet.problem_count || "?"} problems
            </span>
            <span className="rounded-full border border-emerald-400/15 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              {easyCount} Easy
            </span>
            <span className="rounded-full border border-amber-400/15 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              {mediumCount} Medium
            </span>
            <span className="rounded-full border border-rose-400/15 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
              {hardCount} Hard
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-start gap-2">
          <div className="hidden pt-1 text-right md:block">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/30">
              Created
            </div>
            <div className="mt-1 text-sm text-zinc-400">
              {new Date(sheet.created_at).toLocaleDateString()}
            </div>
          </div>

          <button
            className="shrink-0 rounded-2xl border border-slate-500/16 bg-[#10141c] p-2.5 text-white/55 transition hover:bg-[#181d27] hover:text-white"
            title={expanded ? "Collapse problems" : "Expand problems"}
            onClick={handleExpand}
          >
            {expanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          </button>

          {isEditingName ? (
            <>
              <button
                className="shrink-0 rounded-2xl border border-slate-500/16 bg-[#10141c] p-2.5 text-white/75 transition hover:bg-[#181d27]"
                title="Save name"
                onClick={handleSaveRename}
                disabled={isSavingName}
              >
                {isSavingName ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}
              </button>
              <button
                className="shrink-0 rounded-2xl border border-slate-500/16 bg-[#10141c] p-2.5 text-white/55 transition hover:bg-[#181d27] hover:text-white"
                title="Cancel rename"
                onClick={handleCancelRename}
              >
                <X size={17} />
              </button>
            </>
          ) : (
            <button
              className="shrink-0 rounded-2xl border border-slate-500/16 bg-[#10141c] p-2.5 text-white/55 transition hover:bg-[#181d27] hover:text-white"
              title="Rename sheet"
              onClick={handleStartRename}
            >
              <PencilLine size={17} />
            </button>
          )}

          <button
            className={`shrink-0 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition ${
              folderCreated
                ? "cursor-default border-emerald-400/20 bg-emerald-500/15 text-emerald-200"
                : "border-slate-500/16 bg-[#10141c] text-white/78 hover:bg-[#181d27]"
            }`}
            title={
              folderCreated
                ? "Folder already created"
                : "Create folder in File Explorer"
            }
            onClick={handleCreateFolder}
            disabled={isCreatingFolder || folderCreated}
          >
            <span className="flex items-center gap-2">
              {isCreatingFolder ? (
                <Loader2 size={15} className="animate-spin" />
              ) : folderCreated ? (
                <CheckCircle2 size={15} />
              ) : (
                <FolderPlus size={15} />
              )}
              <span className="hidden xl:inline">
                {isCreatingFolder
                  ? "Creating..."
                  : folderCreated
                    ? "Added"
                    : "Add to Workspace"}
              </span>
            </span>
          </button>

          <button
            className="shrink-0 rounded-2xl border border-slate-500/16 bg-[#10141c] p-2.5 text-white/45 transition hover:border-red-400/15 hover:bg-red-500/10 hover:text-red-300"
            title="Delete sheet"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(sheet.id);
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {folderError && (
        <div className="flex items-center gap-2 border-t border-red-400/10 bg-red-500/10 px-6 py-3 text-sm text-red-200">
          <AlertCircle size={16} />
          {folderError}
        </div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2.5 border-t border-slate-500/12 bg-[#0f131b] px-5 pt-3.5 pb-5">
              {isLoadingProblems ? (
                <div className="flex items-center justify-center gap-3 py-12 text-zinc-500">
                  <Loader2 size={24} className="animate-spin text-white/70" />
                  <span className="text-base font-medium">Loading problems...</span>
                </div>
              ) : problems.length === 0 ? (
                <p className="py-10 text-center text-base text-zinc-500">
                  No problems found in this sheet.
                </p>
              ) : (
                problems.map((problem, index) => (
                  <PlaylistProblemRow
                    key={problem.id}
                    index={index}
                    problem={problem}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlaylistSheetCard;
