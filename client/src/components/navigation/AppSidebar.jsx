import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  FolderPlus,
  Home,
  LayoutPanelLeft,
  PanelLeftClose,
  Plus,
  Sparkles,
  SquarePen,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import useFileStore from "../../store/useFileStore";
import SidebarTreeItem from "./SidebarTreeItem";

const COLLAPSED_WIDTH = 68;
const DEFAULT_WIDTH = 324;
const MIN_WIDTH = 280;
const MAX_WIDTH = 430;

const AppSidebar = () => {
  const {
    addItem,
    error,
    expandedFolders,
    fileSystem,
    isLoading,
    setActiveFile,
    toggleFolder,
  } = useFileStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const createMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setIsCreateMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isResizing) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const nextWidth = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, event.clientX),
      );
      setSidebarWidth(nextWidth);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [isResizing]);

  const navItems = useMemo(
    () => [
      { id: "home", icon: Home, label: "Home", path: "/" },
      {
        id: "playlist",
        icon: Sparkles,
        label: "Playlist",
        path: "/playlist",
      },
      {
        id: "profile",
        icon: BarChart3,
        label: "Profile",
        path: "/profile-analysis",
      },
    ],
    [],
  );

  const rootItems = fileSystem.filter((item) => item.parentId == null);
  const collapsedRootItems = rootItems.slice(0, 8);

  const createRootItem = async (type) => {
    const label = type === "file" ? "file" : "folder";
    const name = window.prompt(`Enter ${label} name:`);
    if (!name) {
      setIsCreateMenuOpen(false);
      return;
    }

    const created = await addItem(null, name, type);
    if (!created) {
      window.alert(`Could not create ${label}. Check backend and try again.`);
    }
    setIsCreateMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleCollapsedItemClick = (item) => {
    setIsCollapsed(false);

    if (item.type === "folder") {
      if (!expandedFolders.includes(item.id)) {
        toggleFolder(item.id);
      }
      navigate(`/folder/${item.id}`);
      return;
    }

    setActiveFile(item.id);
    navigate(`/problem/${item.id}`);
  };

  const currentWidth = isCollapsed ? COLLAPSED_WIDTH : sidebarWidth;

  return (
    <aside
      className="relative flex h-full shrink-0 border-r border-white/10 bg-[#0a1020] text-white"
      style={{ width: `${currentWidth}px` }}
    >
      <div className="flex h-full min-w-0 flex-1 flex-col bg-[#0a1020]">
        <div
          className={`flex items-center border-b border-white/10 ${
            isCollapsed ? "h-16 justify-center" : "h-16 justify-between px-4"
          }`}
        >
          {!isCollapsed && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/28">
                Explorer
              </div>
              <h2 className="mt-1 text-[15px] font-semibold tracking-wide text-white/88">
                Algo Note
              </h2>
            </div>
          )}

          <div className="flex items-center gap-2" ref={createMenuRef}>
            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setIsCreateMenuOpen((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#131b2f] text-white/70 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                title="Create new"
              >
                <Plus size={16} />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsCollapsed((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <LayoutPanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </button>

            {!isCollapsed && isCreateMenuOpen && (
              <div className="absolute right-4 top-14 z-50 min-w-40 rounded-2xl border border-white/10 bg-[#10182b] p-1.5 shadow-[0_18px_48px_rgba(0,0,0,0.46)]">
                <button
                  type="button"
                  onClick={() => createRootItem("folder")}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <FolderPlus size={15} className="text-blue-400" />
                  New Folder
                </button>
                <button
                  type="button"
                  onClick={() => createRootItem("file")}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <SquarePen size={15} className="text-orange-400" />
                  New File
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          {isCollapsed ? (
            <div className="space-y-2">
              {collapsedRootItems.map((item) => {
                const initial = item.name?.trim()?.charAt(0)?.toUpperCase() || "?";
                const isFolder = item.type === "folder";

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCollapsedItemClick(item)}
                    className={`mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-semibold transition ${
                      isFolder
                        ? "border-blue-500/20 bg-blue-500/10 text-blue-300 hover:border-blue-400/30 hover:bg-blue-500/14"
                        : "border-orange-500/20 bg-orange-500/10 text-orange-300 hover:border-orange-400/30 hover:bg-orange-500/14"
                    }`}
                    title={item.name}
                  >
                    {isFolder ? initial : <SquarePen size={16} />}
                  </button>
                );
              })}
            </div>
          ) : isLoading ? (
            <div className="px-2 py-3 text-sm text-white/45">Loading files...</div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-3 text-sm text-red-300">
              Failed to load files: {error}
            </div>
          ) : fileSystem.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white/45">
              No files yet. Use the plus button to create your first folder or file.
            </div>
          ) : (
            <div className="space-y-1.5">
              {fileSystem.map((item) => (
                <SidebarTreeItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-3 py-4">
          <div className="space-y-2">
            {navItems.map(({ id, icon: Icon, label, path }) => {
              const isActive = isActivePath(path);

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => navigate(path)}
                  className={`flex items-center rounded-2xl border transition ${
                    isCollapsed
                      ? `mx-auto h-11 w-11 justify-center ${
                          isActive
                            ? "border-white/15 bg-white/[0.08] text-white shadow-[0_10px_25px_rgba(0,0,0,0.24)]"
                            : "border-transparent bg-transparent text-white/45 hover:border-white/10 hover:bg-white/[0.05] hover:text-white/85"
                        }`
                      : `w-full gap-3 px-3 py-3 ${
                          isActive
                            ? "border-white/15 bg-white/[0.08] text-white shadow-[0_10px_25px_rgba(0,0,0,0.24)]"
                            : "border-transparent bg-transparent text-white/55 hover:border-white/10 hover:bg-white/[0.05] hover:text-white/90"
                        }`
                  }`}
                  title={label}
                >
                  <Icon size={19} />
                  {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {!isCollapsed && (
          <button
            type="button"
            aria-label="Resize sidebar"
            onMouseDown={() => setIsResizing(true)}
            className="absolute inset-y-0 right-0 z-20 w-1.5 cursor-col-resize bg-transparent transition hover:bg-blue-500/30"
          />
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
