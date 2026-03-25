import React, { useEffect, useRef, useState } from "react";
import FolderThemeOne from "./FolderCard";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Inter:wght@400;500;600&display=swap');

  .sfc-card {
    position: relative;
    border-radius: 16px;
    border: 1px solid rgba(148,163,184,0.14);
    background:
      radial-gradient(circle at top right, rgba(59,130,246,0.08), transparent 34%),
      linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.012)),
      #182230;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.04),
      0 18px 36px rgba(2,6,23,0.28);
    cursor: pointer;
    transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
  }

  .sfc-card:hover {
    transform: translateY(-3px);
    border-color: rgba(96,165,250,0.24);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.05),
      0 22px 42px rgba(2,6,23,0.34);
  }

  .sfc-shell {
    position: relative;
    min-height: 138px;
    padding: 15px 16px 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
  }

  .sfc-shell::after {
    content: "";
    position: absolute;
    inset: auto 18px 14px 18px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    pointer-events: none;
  }

  .sfc-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .sfc-folder {
    position: relative;
    width: 76px;
    height: 58px;
    flex-shrink: 0;
    border-radius: 10px;
    background:
      linear-gradient(180deg, rgba(147,197,253,0.26) 0%, rgba(59,130,246,0.18) 100%),
      rgba(30,64,175,0.18);
    border: 1px solid rgba(96,165,250,0.26);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.16),
      0 10px 24px rgba(30,64,175,0.16);
    overflow: hidden;
  }

  .sfc-folder::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 9px;
    width: 24px;
    height: 9px;
    border-radius: 8px 8px 0 0;
    background: rgba(219,234,254,0.90);
  }

  .sfc-folder::after {
    content: "";
    position: absolute;
    inset: 16px 7px 7px;
    border-radius: 8px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05)),
      linear-gradient(180deg, rgba(59,130,246,0.54), rgba(37,99,235,0.76));
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);
  }

  .sfc-folder-glow {
    position: absolute;
    inset: auto 10px 10px 10px;
    height: 22px;
    border-radius: 999px;
    background: rgba(255,255,255,0.12);
    filter: blur(12px);
    pointer-events: none;
    z-index: 2;
  }

  .sfc-copy {
    min-width: 0;
    flex: 1;
  }

  .sfc-title {
    margin: 0;
    color: rgba(248,250,252,0.98);
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sfc-count {
    margin-top: 8px;
    color: rgba(191,219,254,0.92);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
  }

  .sfc-menu-wrap {
    position: relative;
    z-index: 4;
    flex-shrink: 0;
  }

  .sfc-menu-btn {
    width: 30px;
    height: 24px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 0;
    cursor: pointer;
    transition: background .16s ease, border-color .16s ease;
  }

  .sfc-menu-btn:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.18);
  }

  .sfc-dot {
    width: 3px;
    height: 3px;
    border-radius: 999px;
    background: rgba(255,255,255,0.75);
  }

  .sfc-dropdown {
    position: absolute;
    top: 30px;
    right: 0;
    min-width: 144px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(15,23,42,0.98);
    padding: 6px;
    box-shadow: 0 18px 46px rgba(2,6,23,0.48);
    z-index: 20;
  }

  .sfc-dd-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: transparent;
    color: rgba(226,232,240,0.82);
    padding: 9px 10px;
    border-radius: 8px;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    transition: background .14s ease, color .14s ease;
  }

  .sfc-dd-item:hover {
    background: rgba(255,255,255,0.06);
    color: #fff;
  }

  .sfc-dd-item.danger {
    color: #fca5a5;
  }

  .sfc-dd-item.danger:hover {
    background: rgba(239,68,68,0.12);
    color: #fecaca;
  }

  .sfc-sep {
    height: 1px;
    margin: 5px 0;
    background: rgba(255,255,255,0.08);
  }

  .sfc-rename {
    position: relative;
    z-index: 3;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 0 18px 14px;
  }

  .sfc-rename-input {
    flex: 1;
    height: 38px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04);
    color: #fff;
    padding: 0 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    outline: none;
  }

  .sfc-rename-input:focus {
    border-color: rgba(96,165,250,0.34);
  }

  .sfc-rename-btn {
    height: 38px;
    border-radius: 10px;
    border: 1px solid rgba(96,165,250,0.24);
    background: rgba(59,130,246,0.12);
    color: #bfdbfe;
    padding: 0 14px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .sfc-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .sfc-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    border-radius: 999px;
    border: 1px solid rgba(96,165,250,0.18);
    background: rgba(59,130,246,0.10);
    color: #bfdbfe;
    padding: 6px 10px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
  }

  .sfc-tag-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96,165,250,0.12);
  }

  .sfc-meta {
    color: rgba(191,219,254,0.76);
    font-size: 11px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .sfc-date {
    color: rgba(148,163,184,0.68);
    font-size: 11px;
    white-space: nowrap;
    font-family: 'JetBrains Mono', monospace;
  }

  .sfc-confirm {
    position: absolute;
    inset: 0;
    z-index: 6;
    background: rgba(15,23,42,0.95);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 22px;
  }

  .sfc-confirm-text {
    margin: 0;
    text-align: center;
    color: rgba(226,232,240,0.78);
    line-height: 1.6;
    font-size: 13px;
  }

  .sfc-confirm-text strong {
    color: #fff;
  }

  .sfc-confirm-actions {
    display: flex;
    gap: 8px;
  }

  .sfc-confirm-btn {
    height: 36px;
    padding: 0 14px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    color: rgba(226,232,240,0.84);
    cursor: pointer;
  }

  .sfc-confirm-btn.danger {
    border-color: rgba(239,68,68,0.20);
    background: rgba(239,68,68,0.12);
    color: #fecaca;
  }
`;

const formatDate = (dateValue) =>
  new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const FolderThemeTwo = ({ folder, onDelete, onOpen, onRename }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [nextName, setNextName] = useState(folder.name);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isRenaming]);

  const commitRename = () => {
    const trimmed = nextName.trim();

    if (!trimmed) {
      setNextName(folder.name);
      setIsRenaming(false);
      return;
    }

    if (trimmed !== folder.name) {
      onRename?.(folder.id, trimmed);
    }

    setIsRenaming(false);
  };

  return (
    <>
      <style>{css}</style>
      <div
        className="sfc-card"
        onClick={() => {
          if (!isRenaming && !isConfirmingDelete) {
            onOpen?.(folder);
          }
        }}
      >
        {isConfirmingDelete && (
          <div className="sfc-confirm">
            <p className="sfc-confirm-text">
              Delete <strong>/{folder.name}</strong>?
            </p>
            <div className="sfc-confirm-actions">
              <button
                type="button"
                className="sfc-confirm-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsConfirmingDelete(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="sfc-confirm-btn danger"
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete?.(folder);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        <div className="sfc-shell">
          <div className="sfc-top">
            <div className="sfc-folder" aria-hidden="true">
              <div className="sfc-folder-glow" />
            </div>

            <div className="sfc-copy">
              <h3 className="sfc-title">/{folder.name}</h3>
              <div className="sfc-count">
                {folder.files} {folder.files === 1 ? "FILE" : "FILES"}
              </div>
            </div>

            <div className="sfc-menu-wrap" ref={menuRef}>
              <button
                type="button"
                className="sfc-menu-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsMenuOpen((current) => !current);
                }}
                title="More"
              >
                <span className="sfc-dot" />
                <span className="sfc-dot" />
                <span className="sfc-dot" />
              </button>

              {isMenuOpen && (
                <div className="sfc-dropdown">
                  <button
                    type="button"
                    className="sfc-dd-item"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsMenuOpen(false);
                      setIsRenaming(true);
                    }}
                  >
                    Rename
                  </button>
                  <div className="sfc-sep" />
                  <button
                    type="button"
                    className="sfc-dd-item danger"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsMenuOpen(false);
                      setIsConfirmingDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="sfc-bottom">
            <div className="sfc-meta">
              {folder.files} {folder.files === 1 ? "problem" : "problems"}
            </div>
            <div className="sfc-date">{formatDate(folder.created || Date.now())}</div>
          </div>
        </div>

        {isRenaming && (
          <div
            className="sfc-rename"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              ref={inputRef}
              className="sfc-rename-input"
              value={nextName}
              onChange={(event) => setNextName(event.target.value)}
              onBlur={commitRename}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  commitRename();
                }
                if (event.key === "Escape") {
                  setNextName(folder.name);
                  setIsRenaming(false);
                }
              }}
            />
            <button
              type="button"
              className="sfc-rename-btn"
              onMouseDown={(event) => {
                event.preventDefault();
                commitRename();
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const SlateFolderCard = FolderThemeTwo;

export { FolderThemeOne, FolderThemeTwo };

export default SlateFolderCard;
