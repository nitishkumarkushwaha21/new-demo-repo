import React, { useMemo, useState } from "react";
import {
  ChevronRight,
  FilePlus2,
  FolderPlus,
  Home,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import useFileStore from "../../store/useFileStore";
import ProductivitySidebarTreeItem from "./ProductivitySidebarTreeItem";

const quickLinks = [
  {
    id: "dashboard",
    label: "Workspace",
    description: "Your root folders and notes",
    path: "/",
  },
  {
    id: "playlist",
    label: "Playlist Sheets",
    description: "Import learning paths fast",
    path: "/playlist",
  },
  {
    id: "profile",
    label: "Profile Analysis",
    description: "Visualize progress and gaps",
    path: "/profile-analysis",
  },
];

const ProductivitySidebar = ({ onClose }) => {
  const { addItem, error, fileSystem, isLoading } = useFileStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [draftType, setDraftType] = useState("file");
  const [draftName, setDraftName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarStats = useMemo(() => {
    const stack = [...fileSystem];
    let folders = 0;
    let problems = 0;
    let revised = 0;

    while (stack.length > 0) {
      const current = stack.pop();
      if (!current) {
        continue;
      }

      if (current.type === "folder") {
        folders += 1;
      } else {
        problems += 1;
        if (current.isRevised) {
          revised += 1;
        }
      }

      if (current.children?.length) {
        stack.push(...current.children);
      }
    }

    return { folders, problems, revised };
  }, [fileSystem]);

  const handleQuickCreate = async (event) => {
    event.preventDefault();
    if (!draftName.trim()) {
      return;
    }

    const created = await addItem(null, draftName.trim(), draftType);
    if (!created) {
      window.alert("Could not create item. Check backend and try again.");
      return;
    }

    setDraftName("");
  };

  return (
    <aside className="flex h-full min-w-[19rem] flex-col overflow-hidden border-r border-slate-800 bg-[#0f172a] text-slate-100">
      <div className="border-b border-slate-800/90 px-4 py-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <button
            onClick={() => navigate("/")}
            className="min-w-0 text-left"
            title="Go to workspace"
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              <Sparkles size={12} className="text-emerald-400" />
              Algo Note
            </div>
            <div className="mt-1 text-lg font-semibold text-slate-100">
              Fastest note-making workflow
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Problems, notes, and analysis in one sidebar.
            </div>
          </button>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700/80 bg-slate-900/80 p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
            title="Close Sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">
              Folders
            </div>
            <div className="mt-1 text-lg font-semibold text-blue-300">
              {sidebarStats.folders}
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">
              Problems
            </div>
            <div className="mt-1 text-lg font-semibold text-slate-100">
              {sidebarStats.problems}
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-slate-500">
              Revised
            </div>
            <div className="mt-1 text-lg font-semibold text-emerald-300">
              {sidebarStats.revised}
            </div>
          </div>
        </div>

        <div className="relative mt-4">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search problems, folders, notes..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pr-3 pl-9 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-blue-500/50"
          />
        </div>

        <form
          onSubmit={handleQuickCreate}
          className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-3"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-100">
                Quick capture
              </div>
              <div className="text-xs text-slate-400">
                Add a root item without leaving the flow.
              </div>
            </div>
            <ChevronRight size={15} className="text-slate-600" />
          </div>

          <div className="mb-3 flex gap-2">
            <button
              type="button"
              onClick={() => setDraftType("file")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                draftType === "file"
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20"
                  : "bg-slate-800/90 text-slate-400 hover:text-slate-200"
              }`}
            >
              <FilePlus2 size={14} />
              Problem
            </button>
            <button
              type="button"
              onClick={() => setDraftType("folder")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                draftType === "folder"
                  ? "bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20"
                  : "bg-slate-800/90 text-slate-400 hover:text-slate-200"
              }`}
            >
              <FolderPlus size={14} />
              Folder
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              placeholder={
                draftType === "file"
                  ? "e.g. Binary Search"
                  : "e.g. Dynamic Programming"
              }
              className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500/50"
            />
            <button
              type="submit"
              disabled={!draftName.trim()}
              className="rounded-xl bg-linear-to-r from-blue-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="border-b border-slate-800/80 px-3 py-3">
        <div className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Navigate
        </div>
        <div className="space-y-1">
          {quickLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <button
                key={link.id}
                onClick={() => navigate(link.path)}
                className={`w-full rounded-2xl px-3 py-2.5 text-left transition-all ${
                  isActive
                    ? "bg-slate-800/90 ring-1 ring-slate-700"
                    : "hover:bg-slate-800/70"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-slate-100">
                      {link.label}
                    </div>
                    <div className="text-xs text-slate-400">
                      {link.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <Home size={12} />
            Explorer
          </div>
          <div className="text-[11px] text-slate-500">
            {searchTerm ? "filtered" : "all"}
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-6 text-sm text-slate-400">
            Loading workspace...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-900/50 bg-rose-950/20 px-4 py-4 text-sm text-rose-300">
            Failed to load files: {error}
          </div>
        ) : fileSystem.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 px-4 py-8 text-center">
            <div className="text-sm font-medium text-slate-300">
              No notes yet
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Start by adding your first folder or problem above.
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            {fileSystem.map((item) => (
              <ProductivitySidebarTreeItem
                key={item.id}
                item={item}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ProductivitySidebar;
