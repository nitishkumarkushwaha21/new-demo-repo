import React from "react";
import { ArrowLeft, FolderPlus, RotateCcw, Search, Sparkles, SquarePen } from "lucide-react";

const FolderHeader = ({
  folderName,
  itemCount,
  searchTerm,
  folderInput,
  problemInput,
  activeFilter,
  onBack,
  onResetRevisions,
  onSearchChange,
  onFolderInputKeyDown,
  onProblemInputKeyDown,
  onFolderInputChange,
  onProblemInputChange,
  onCreateFolder,
  onCreateProblem,
  onFilterChange,
}) => {
  const filters = ["all", "unsolved", "unrevised", "important"];

  return (
    <div style={styles.header}>
      <div style={styles.left}>
        <button
          style={styles.iconButton}
          onClick={onBack}
          title="Back"
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
        >
          <ArrowLeft size={18} color="rgba(255,255,255,0.75)" />
        </button>
        <div>
          <h1 style={styles.title}>
            <svg width="22" height="20" viewBox="0 0 280 210" style={{ marginRight: 10, flexShrink: 0 }}>
              <rect x="10" y="0" width="80" height="18" rx="7" fill="rgba(255,255,255,0.18)" />
              <rect x="0" y="14" width="280" height="196" rx="16" fill="rgba(255,255,255,0.10)" />
            </svg>
            /{folderName}
          </h1>
          <p style={styles.subtitle}>{itemCount} items</p>
        </div>
      </div>

      <div style={styles.right}>
        <button
          style={styles.iconButton}
          onClick={onResetRevisions}
          title="Reset All Revisions"
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
        >
          <RotateCcw size={16} color="rgba(255,255,255,0.55)" />
        </button>

        <div style={styles.actionStack}>
          <div style={styles.actionGroup}>
            <div style={styles.inputWrap}>
              <SquarePen size={14} color="rgba(251,146,60,0.9)" />
              <input
                type="text"
                placeholder="Paste LeetCode problem link..."
                style={styles.actionInput}
                value={problemInput}
                onChange={(event) => onProblemInputChange(event.target.value)}
                onKeyDown={onProblemInputKeyDown}
                onFocus={(event) => {
                  event.target.style.borderColor = "rgba(255,255,255,0.35)";
                }}
                onBlur={(event) => {
                  event.target.style.borderColor = "rgba(255,255,255,0.12)";
                }}
              />
            </div>
            <button
              style={styles.actionButton}
              onClick={onCreateProblem}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "rgba(255,255,255,0.13)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
            >
              <Sparkles size={14} />
              Add Problem
            </button>
          </div>

          <div style={styles.actionGroup}>
            <div style={styles.inputWrap}>
              <FolderPlus size={14} color="rgba(96,165,250,0.95)" />
              <input
                type="text"
                placeholder="Add folder..."
                style={styles.actionInput}
                value={folderInput}
                onChange={(event) => onFolderInputChange(event.target.value)}
                onKeyDown={onFolderInputKeyDown}
                onFocus={(event) => {
                  event.target.style.borderColor = "rgba(255,255,255,0.35)";
                }}
                onBlur={(event) => {
                  event.target.style.borderColor = "rgba(255,255,255,0.12)";
                }}
              />
            </div>
            <button
              style={styles.actionButton}
              onClick={onCreateFolder}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "rgba(255,255,255,0.13)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
            >
              <FolderPlus size={14} />
              Add Folder
            </button>
          </div>

          <div style={styles.searchWrap}>
            <Search size={14} color="rgba(255,255,255,0.45)" />
            <input
              type="text"
              placeholder="Search items..."
              style={styles.actionInput}
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              onFocus={(event) => {
                event.target.style.borderColor = "rgba(255,255,255,0.35)";
              }}
              onBlur={(event) => {
                event.target.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            />
          </div>

          <div style={styles.filterWrap}>
            {filters.map((filter) => (
              <button
                key={filter}
                style={{
                  ...styles.filterButton,
                  ...(activeFilter === filter ? styles.filterButtonActive : {}),
                }}
                onClick={() => onFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(0,0,0,0.65)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    gap: 16,
    flexWrap: "wrap",
    fontFamily: "'Inter', sans-serif",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontSize: 19,
    fontWeight: 600,
    color: "rgba(255,255,255,0.92)",
    fontFamily: "'JetBrains Mono', monospace",
    margin: 0,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.28)",
    fontFamily: "'Inter', sans-serif",
    marginTop: 3,
  },
  right: {
    display: "flex",
    alignItems: "stretch",
    gap: 12,
    flex: 1,
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  actionStack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    flexWrap: "wrap",
    flex: 1,
  },
  actionGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  inputWrap: {
    height: 38,
    minWidth: 230,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
  },
  searchWrap: {
    height: 38,
    minWidth: 220,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
  },
  filterWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  filterButton: {
    height: 34,
    padding: "0 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    color: "rgba(255,255,255,0.62)",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    cursor: "pointer",
  },
  filterButtonActive: {
    border: "1px solid rgba(96,165,250,0.32)",
    background: "rgba(96,165,250,0.16)",
    color: "rgba(191,219,254,0.96)",
  },
  actionInput: {
    height: "100%",
    width: "100%",
    border: "none",
    background: "transparent",
    color: "rgba(255,255,255,0.86)",
    fontSize: 13,
    fontFamily: "'Inter', sans-serif",
    outline: "none",
  },
  actionButton: {
    height: 38,
    padding: "0 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.88)",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    transition: "background .15s",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background .15s",
    flexShrink: 0,
  },
};

export default FolderHeader;
