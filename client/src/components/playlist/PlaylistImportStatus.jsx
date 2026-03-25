import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";

const PlaylistImportStatus = ({ error, isGenerating, successInfo }) => {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-3 rounded-2xl border border-blue-400/15 bg-blue-500/10 px-5 py-4 text-sm text-slate-200"
          >
            <Loader2 size={18} className="mt-0.5 shrink-0 animate-spin text-blue-300" />
            <span>
              Scanning playlist videos, mapping LeetCode problems, and building
              your revision sheet. Large playlists can take a little time.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-3 rounded-2xl border border-red-400/15 bg-red-500/10 px-5 py-4 text-sm text-red-200"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successInfo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200"
          >
            <Sparkles size={18} className="mt-0.5 shrink-0" />
            <span>
              <strong>{successInfo.sheetName}</strong> created with{" "}
              {successInfo.savedProblems} problems from {successInfo.totalVideos} videos.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlaylistImportStatus;
