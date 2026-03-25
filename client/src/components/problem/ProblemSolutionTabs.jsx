import React, { useState } from "react";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";

const ProblemSolutionTabs = ({
  activeTab,
  solutions,
  onAdd,
  onChange,
  onDelete,
  onMoveLeft,
  onMoveRight,
  onRename,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [draftLabel, setDraftLabel] = useState("");

  return (
    <div className="flex items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-950 px-3 py-2">
      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
        {solutions.map((tab, index) => (
          <div
            key={tab.id}
            className={clsx(
              "mb-[-1px] flex shrink-0 items-center gap-1 rounded-t-xl border px-3 py-2 text-sm transition-colors",
              activeTab === tab.id
                ? "border-neutral-800 border-b-neutral-900 bg-neutral-900 text-blue-300"
                : "border-transparent bg-transparent text-gray-500 hover:bg-neutral-900/50 hover:text-gray-300",
            )}
          >
            <div
              onClick={() => {
                if (editingId !== tab.id) {
                  onChange(tab.id);
                }
              }}
              className="max-w-40 cursor-pointer truncate"
            >
              {editingId === tab.id ? (
                <input
                  autoFocus
                  value={draftLabel}
                  onChange={(event) => setDraftLabel(event.target.value)}
                  onBlur={() => {
                    if (draftLabel.trim()) {
                      onRename(tab.id, draftLabel.trim());
                    }
                    setEditingId(null);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.currentTarget.blur();
                    }
                    if (event.key === "Escape") {
                      setEditingId(null);
                    }
                  }}
                  className="w-28 rounded bg-transparent text-sm text-white outline-none"
                />
              ) : (
                tab.label
              )}
            </div>

            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => {
                  setEditingId(tab.id);
                  setDraftLabel(tab.label);
                }}
                className="rounded p-1 text-gray-500 transition hover:bg-white/5 hover:text-white"
                title="Rename solution"
              >
                <Pencil size={11} />
              </button>
              <button
                type="button"
                onClick={() => onMoveLeft(index)}
                disabled={index === 0}
                className="rounded p-1 text-gray-500 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                title="Move left"
              >
                <ChevronLeft size={12} />
              </button>
              <button
                type="button"
                onClick={() => onMoveRight(index)}
                disabled={index === solutions.length - 1}
                className="rounded p-1 text-gray-500 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                title="Move right"
              >
                <ChevronRight size={12} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(tab.id)}
                disabled={solutions.length === 1}
                className="rounded p-1 text-gray-500 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-30"
                title="Delete solution"
              >
                <Trash2 size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
      >
        <Plus size={14} />
        Add Solution
      </button>
    </div>
  );
};

export default ProblemSolutionTabs;
