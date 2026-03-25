import React from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";

const difficultyStyles = {
  Easy: "border-green-500/20 bg-green-500/10 text-green-400",
  Medium: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  Hard: "border-red-500/20 bg-red-500/10 text-red-400",
};

const ProblemMetadataPanel = ({
  activeFile,
  isImporting,
  localLink,
  onLinkChange,
  onLinkBlur,
  onImportClick,
}) => {
  const canImport =
    localLink &&
    localLink.includes("leetcode.com/problems/") &&
    !activeFile.description &&
    !isImporting;

  return (
    <div className="h-full overflow-y-auto bg-[#0f141d] p-6">
      <style>{`
        .problem-statement {
          color: rgb(209 213 219);
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .problem-statement > *:first-child {
          margin-top: 0;
        }

        .problem-statement h1,
        .problem-statement h2,
        .problem-statement h3,
        .problem-statement h4 {
          color: #ffffff;
          font-weight: 700;
          line-height: 1.35;
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
        }

        .problem-statement p,
        .problem-statement ul,
        .problem-statement ol,
        .problem-statement blockquote {
          margin-top: 0.9rem;
          margin-bottom: 0.9rem;
        }

        .problem-statement ul,
        .problem-statement ol {
          padding-left: 1.25rem;
        }

        .problem-statement li {
          margin: 0.4rem 0;
        }

        .problem-statement pre {
          white-space: pre-wrap;
          word-break: break-word;
          overflow-wrap: anywhere;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          padding: 14px 16px;
          color: #e5e7eb;
          font-size: 0.84rem;
          line-height: 1.65;
          overflow-x: auto;
        }

        .problem-statement code {
          white-space: pre-wrap;
          word-break: break-word;
          overflow-wrap: anywhere;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          padding: 0.14rem 0.38rem;
          color: #f8fafc;
          font-size: 0.84rem;
        }

        .problem-statement pre code {
          background: transparent;
          padding: 0;
          border-radius: 0;
        }

        .problem-statement strong {
          color: #fff;
          font-weight: 700;
        }

        .problem-statement table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }

        .problem-statement td,
        .problem-statement th {
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.7rem;
          vertical-align: top;
          text-align: left;
        }

        .problem-statement * {
          max-width: 100%;
        }
      `}</style>

      <div className="mb-6 rounded-3xl border border-white/8 bg-white/[0.03] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
        <h1 className="mb-2 text-3xl font-bold text-white">
          {activeFile.title || activeFile.name}
        </h1>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {activeFile.difficulty && (
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                  difficultyStyles[activeFile.difficulty] ||
                  difficultyStyles.Hard
                }`}
              >
                {activeFile.difficulty}
              </span>
            )}
            {activeFile.tags?.map((tag) => (
              <span
                key={tag.name}
                className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              key={`link-${activeFile.id}`}
              type="text"
              placeholder="Paste LeetCode Link here..."
              className={`flex-1 rounded border px-3 py-1 text-xs outline-none transition-colors ${
                isImporting
                  ? "animate-pulse border-yellow-500 text-yellow-400"
                  : "border-neutral-800 bg-neutral-950 text-gray-400 focus:border-blue-500 focus:text-white"
              }`}
              value={localLink}
              disabled={isImporting}
              onChange={(event) => onLinkChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.target.blur();
                }
              }}
              onBlur={onLinkBlur}
            />

            {localLink && localLink.includes("leetcode.com") && (
              <a
                href={localLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded border border-orange-500/20 bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-400 transition-colors hover:bg-orange-500/25"
                title="Open on LeetCode"
              >
                <ExternalLink size={11} />
                LeetCode
              </a>
            )}

            <button
              type="button"
              onClick={onImportClick}
              disabled={!canImport}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded border px-3 py-1 text-xs font-medium transition-colors ${
                canImport
                  ? "border-blue-500/25 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25"
                  : "cursor-not-allowed border-neutral-800 bg-neutral-900 text-gray-500"
              }`}
              title="Import and save question"
            >
              {isImporting ? <Loader2 size={11} className="animate-spin" /> : <Download size={11} />}
              Import Question
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
        {isImporting ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="mr-2 animate-spin" size={20} />
            <span className="text-yellow-400">
              Importing LeetCode problem...
            </span>
          </div>
        ) : activeFile.description ? (
          <div
            className="problem-statement"
            dangerouslySetInnerHTML={{ __html: activeFile.description }}
          />
        ) : (
          <div className="italic text-gray-500">
            No description available yet. Paste a LeetCode link above and use
            Import Question to save the statement for future fast opens.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemMetadataPanel;
