import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Edit2,
  FileCode2,
  FolderClosed,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFileStore from "../../store/useFileStore";

const ProductivitySidebarTreeItem = ({ item, depth = 0, searchTerm = "" }) => {
  const navigate = useNavigate();
  const {
    activeFileId,
    deleteItem,
    expandedFolders,
    renameItem,
    setActiveFile,
    toggleFolder,
  } = useFileStore();
  const [isRenaming, setIsRenaming] = useState(false);
  const [nextName, setNextName] = useState(item.name);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const isExpanded = expandedFolders.includes(item.id);
  const isActive = String(activeFileId) === String(item.id);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  useEffect(() => {
    if (!showContextMenu) {
      return undefined;
    }

    const closeMenu = () => setShowContextMenu(false);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showContextMenu]);

  const childItems = item.children || [];
  const matchingChildren = childItems.filter((child) => {
    if (!normalizedSearch) {
      return true;
    }

    const selfMatches = child.name.toLowerCase().includes(normalizedSearch);
    const descendantMatches = (child.children || []).some((descendant) =>
      JSON.stringify(descendant).toLowerCase().includes(normalizedSearch),
    );

    return selfMatches || descendantMatches;
  });

  const selfMatches =
    !normalizedSearch || item.name.toLowerCase().includes(normalizedSearch);
  const shouldRender =
    selfMatches || matchingChildren.length > 0 || normalizedSearch.length === 0;

  if (!shouldRender) {
    return null;
  }

  const handleSelect = (event) => {
    event.stopPropagation();

    if (item.type === "folder") {
      toggleFolder(item.id);
      navigate(`/folder/${item.id}`);
      return;
    }

    setActiveFile(item.id);
    navigate(`/problem/${item.id}`);
  };

  const handleRenameSubmit = async (event) => {
    event.preventDefault();

    if (nextName.trim() && nextName !== item.name) {
      await renameItem(item.id, nextName.trim());
    }

    setIsRenaming(false);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    if (window.confirm(`Delete ${item.type} "${item.name}"?`)) {
      await deleteItem(item.id);
    }
    setShowContextMenu(false);
  };

  return (
    <div className="relative">
      <div
        className={`group relative flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all ${
          isActive
            ? "bg-linear-to-r from-blue-500/18 to-emerald-500/12 text-white ring-1 ring-blue-400/20"
            : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
        }`}
        style={{ marginLeft: `${depth * 12}px` }}
        onClick={handleSelect}
        onContextMenu={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setShowContextMenu((prev) => !prev);
        }}
      >
        <span className="shrink-0 text-slate-500">
          {item.type === "folder" &&
            (isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            ))}
        </span>

        <span className="shrink-0">
          {item.type === "folder" ? (
            <FolderClosed
              size={16}
              className={isActive ? "text-blue-300" : "text-blue-400"}
            />
          ) : (
            <FileCode2
              size={16}
              className={isActive ? "text-emerald-300" : "text-emerald-400"}
            />
          )}
        </span>

        {isRenaming ? (
          <form onSubmit={handleRenameSubmit} className="min-w-0 flex-1">
            <input
              autoFocus
              type="text"
              value={nextName}
              onChange={(event) => setNextName(event.target.value)}
              onBlur={() => {
                setNextName(item.name);
                setIsRenaming(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setNextName(item.name);
                  setIsRenaming(false);
                }
              }}
              className="w-full rounded-md border border-blue-400/40 bg-slate-950 px-2 py-1 text-sm text-slate-100 outline-none"
            />
          </form>
        ) : (
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{item.name}</div>
            {item.type === "file" && item.link && (
              <div className="truncate text-[11px] text-slate-500">
                linked problem
              </div>
            )}
          </div>
        )}

        {!isRenaming && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setShowContextMenu((prev) => !prev);
            }}
            className="rounded-md p-1 text-slate-500 opacity-0 transition-all hover:bg-slate-700 hover:text-slate-200 group-hover:opacity-100"
            title="Item actions"
          >
            <MoreHorizontal size={14} />
          </button>
        )}
      </div>

      {showContextMenu && (
        <div className="absolute right-3 top-11 z-50 min-w-28 rounded-xl border border-slate-700 bg-slate-900/98 p-1 shadow-2xl backdrop-blur">
          <button
            onClick={(event) => {
              event.stopPropagation();
              setShowContextMenu(false);
              setIsRenaming(true);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
          >
            <Edit2 size={12} />
            Rename
          </button>
          <button
            onClick={handleDelete}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-300 hover:bg-rose-950/50"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      )}

      {item.type === "folder" &&
        (isExpanded || normalizedSearch.length > 0) &&
        matchingChildren.length > 0 && (
        <div className="mt-1 space-y-1">
          {matchingChildren.map((child) => (
            <ProductivitySidebarTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductivitySidebarTreeItem;
