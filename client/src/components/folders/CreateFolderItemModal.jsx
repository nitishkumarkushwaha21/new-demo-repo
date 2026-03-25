import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { FileCode, Folder } from "lucide-react";

const CreateFolderItemModal = ({
  isOpen,
  itemName,
  itemType,
  onChangeName,
  onChangeType,
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
            <h2 className="mb-4 text-xl font-bold text-white">Create New</h2>

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="mb-2 block text-xs font-bold uppercase text-gray-500">
                  Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChangeType("file")}
                    className={clsx(
                      "flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 transition-all",
                      itemType === "file"
                        ? "border-blue-600 bg-blue-600/20 text-blue-400"
                        : "border-neutral-700 bg-neutral-800 text-gray-400 hover:bg-neutral-700",
                    )}
                  >
                    <FileCode size={18} />
                    Problem
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeType("folder")}
                    className={clsx(
                      "flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 transition-all",
                      itemType === "folder"
                        ? "border-blue-600 bg-blue-600/20 text-blue-400"
                        : "border-neutral-700 bg-neutral-800 text-gray-400 hover:bg-neutral-700",
                    )}
                  >
                    <Folder size={18} />
                    Folder
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold uppercase text-gray-500">
                  Name
                </label>
                <input
                  autoFocus
                  type="text"
                  value={itemName}
                  onChange={(event) => onChangeName(event.target.value)}
                  placeholder={
                    itemType === "file" ? "e.g. Two Sum" : "e.g. Graphs"
                  }
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
                  disabled={!itemName.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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

export default CreateFolderItemModal;
