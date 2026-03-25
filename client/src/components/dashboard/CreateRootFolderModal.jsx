import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const CreateRootFolderModal = ({
  isOpen,
  value,
  onChange,
  onClose,
  onSubmit,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-96 rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl"
          >
            <h2 className="mb-4 text-xl font-bold text-white">New Root Folder</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold uppercase text-gray-500">
                  Name
                </label>
                <input
                  autoFocus
                  type="text"
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  placeholder="e.g. Dynamic Programming"
                  className="w-full rounded-lg border-none bg-neutral-800 px-4 py-2 text-white outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-400 transition-colors hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!value.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateRootFolderModal;
