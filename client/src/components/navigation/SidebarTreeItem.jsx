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
import { useLocation, useNavigate } from "react-router-dom";
import useFileStore from "../../store/useFileStore";

const SidebarTreeItem = ({ item, depth = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeFileId,
    deleteItem,
    expandedFolders,
    renameItem,
    setActiveFile,
    toggleFolder,
  } = useFileStore();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [nextName, setNextName] = useState(item.name);

  const isExpanded = expandedFolders.includes(item.id);
  const isActive =
    (item.type === "file" && String(activeFileId) === String(item.id)) ||
    (item.type === "folder" && location.pathname === `/folder/${item.id}`);

  useEffect(() => {
    if (!showContextMenu) {
      return undefined;
    }

    const handleClickOutside = () => setShowContextMenu(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showContextMenu]);

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
        className={`group relative flex cursor-pointer select-none items-center gap-2 rounded-2xl px-3 py-2 text-sm transition-colors ${
          isActive
            ? "bg-white/[0.08] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            : "text-white/72 hover:bg-white/[0.04] hover:text-white"
        }`}
        style={{ paddingLeft: `${depth * 14 + 14}px` }}
        onClick={handleSelect}
        onContextMenu={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setShowContextMenu((prev) => !prev);
        }}
      >
        <span className="shrink-0 text-white/34">
          {item.type === "folder" &&
            (isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            ))}
        </span>

        <span className="shrink-0">
          {item.type === "folder" ? (
            <FolderClosed size={17} className="text-blue-400" />
          ) : (
            <FileCode2 size={17} className="text-orange-400" />
          )}
        </span>

        {isRenaming ? (
          <form onSubmit={handleRenameSubmit} className="flex-1">
            <input
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
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-2 py-1 text-sm text-white outline-none"
              autoFocus
            />
          </form>
        ) : (
          <span className="min-w-0 flex-1 truncate">{item.name}</span>
        )}

        {!isRenaming && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              setShowContextMenu((prev) => !prev);
            }}
            className="rounded-xl p-1.5 text-white/36 opacity-0 transition hover:bg-white/[0.06] hover:text-white/80 group-hover:opacity-100"
            title="More"
          >
            <MoreHorizontal size={12} />
          </button>
        )}
      </div>

      {showContextMenu && (
        <div className="absolute right-2 top-10 z-50 min-w-28 rounded-2xl border border-white/10 bg-[#0b0d12] p-1.5 shadow-[0_18px_48px_rgba(0,0,0,0.46)]">
          <button
            onClick={(event) => {
              event.stopPropagation();
              setShowContextMenu(false);
              setIsRenaming(true);
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/80 hover:bg-white/[0.06] hover:text-white"
          >
            <Edit2 size={12} />
            Rename
          </button>
          <button
            onClick={handleDelete}
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/12"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      )}

      {item.type === "folder" && isExpanded && item.children?.length > 0 && (
        <div>
          {item.children.map((child) => (
            <SidebarTreeItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarTreeItem;
