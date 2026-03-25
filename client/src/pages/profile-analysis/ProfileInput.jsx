import React, { useState } from 'react';

// Extract plain username from a full LeetCode URL or return as-is
const extractUsername = (input) => {
  const trimmed = input.trim();
  try {
    // Match both formats:
    //   https://leetcode.com/u/username/
    //   https://leetcode.com/username/
    const match = trimmed.match(/leetcode\.com\/(?:u\/)?([^/?#]+)/);
    if (match && match[1]) return match[1].replace(/\/$/, '');
  } catch (_) {}
  return trimmed; // Already a plain username
};

const ProfileInput = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');
  const parsedUsername = extractUsername(input);
  const isUrl = input.trim().startsWith('http');

  const handleAnalyze = () => {
    const username = extractUsername(input);
    if (username) onAnalyze(username);
  };

  return (
    <div className="mb-6 mt-4 overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/85 p-6 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.65)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600 dark:text-amber-300">
            Analyze LeetCode Profile
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            Paste a username or profile URL
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            We&apos;ll normalize the profile link, calculate topic coverage,
            and generate a cleaner practice queue from the weak spots.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
          Works with `leetcode.com/u/username/` and plain handles.
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-grow flex-col gap-2">
          <input
            type="text"
            placeholder="Enter username or paste leetcode.com profile URL..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && input.trim() && handleAnalyze()}
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-inner shadow-slate-200/50 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-200/60 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white dark:shadow-none dark:placeholder:text-slate-500 dark:focus:border-amber-400 dark:focus:ring-amber-500/20"
          />
          {/* Show extracted username preview when URL is pasted */}
          {isUrl && parsedUsername && (
            <p className="ml-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              ✓ Username detected: <strong>{parsedUsername}</strong>
            </p>
          )}
        </div>
        <button
          onClick={handleAnalyze}
          disabled={!input.trim() || isLoading}
          className="flex min-w-[152px] items-center justify-center self-start rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.9)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 dark:disabled:bg-slate-700 dark:disabled:text-slate-300"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Analyze'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileInput;
