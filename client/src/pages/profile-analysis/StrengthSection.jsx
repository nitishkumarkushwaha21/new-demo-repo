import React from 'react';

const StrengthSection = ({ strongTopics }) => {
  if (!strongTopics || strongTopics.length === 0) return null;

  return (
    <div className="mb-6 rounded-[28px] border border-emerald-200/70 bg-[linear-gradient(140deg,rgba(236,253,245,0.96),rgba(255,255,255,0.96))] p-6 shadow-[0_24px_60px_-45px_rgba(16,185,129,0.9)] dark:border-emerald-900/60 dark:bg-[linear-gradient(140deg,rgba(6,78,59,0.55),rgba(15,23,42,0.96))]">
      <div className="mb-6 flex items-center">
        <div className="mr-4 rounded-2xl bg-emerald-500/15 p-3 text-emerald-700 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-300">
          <span className="text-2xl">💪</span>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Strong Areas</h2>
          <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-200/80">
            These are the topics where your repetition is building confidence.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {strongTopics.map((topic, index) => (
          <div key={index} className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white/80 px-5 py-3 text-lg font-bold text-emerald-800 shadow-sm transition-colors hover:bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/20 dark:text-emerald-200 dark:hover:bg-emerald-950/35">
            <span>{topic.name}</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">{topic.solved} solved</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrengthSection;
