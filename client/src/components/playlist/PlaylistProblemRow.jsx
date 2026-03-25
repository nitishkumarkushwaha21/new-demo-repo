import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PlaylistDifficultyBadge from "./PlaylistDifficultyBadge";

const PlaylistProblemRow = ({ index, problem }) => {
  const handleOpen = () => {
    if (problem.leetcode_link) {
      window.open(problem.leetcode_link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group flex items-center gap-4 rounded-2xl border border-slate-500/14 bg-[#171c25] px-5 py-4 transition-all hover:bg-[#1c2230]"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-500/16 bg-[#10141c] text-sm font-bold text-white/60">
        {index + 1}
      </div>

      <span
        className="flex-1 cursor-pointer truncate text-base font-semibold text-white transition-colors hover:text-zinc-300"
        onClick={handleOpen}
      >
        {problem.title}
      </span>

      {problem.confidence_score != null && (
        <span className="hidden shrink-0 rounded-xl border border-slate-500/16 bg-[#10141c] px-2.5 py-1 text-sm font-medium text-zinc-400 sm:block">
          {Math.round(problem.confidence_score * 100)}% match
        </span>
      )}

      <div className="flex w-24 shrink-0 justify-center">
        <PlaylistDifficultyBadge difficulty={problem.difficulty} />
      </div>

      <button
        onClick={handleOpen}
        className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-zinc-200"
        title="Open on LeetCode"
      >
        Open
        <ExternalLink size={14} />
      </button>
    </motion.div>
  );
};

export default PlaylistProblemRow;
