import React from 'react';

const WeaknessSection = ({ weakTopics }) => {
  if (!weakTopics || weakTopics.length === 0) return null;

  return (
    <div className="mb-6 rounded-[28px] border border-amber-200/80 bg-[linear-gradient(140deg,rgba(255,251,235,0.98),rgba(255,255,255,0.96))] p-6 shadow-[0_24px_60px_-45px_rgba(245,158,11,0.9)] dark:border-amber-900/60 dark:bg-[linear-gradient(140deg,rgba(120,53,15,0.42),rgba(15,23,42,0.96))]">
      <div className="mb-2 flex items-center">
        <div className="mr-4 rounded-2xl bg-amber-500/15 p-3 text-amber-700 ring-1 ring-inset ring-amber-500/20 dark:text-amber-300">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Weak Areas</h2>
      </div>
      <p className="mb-6 ml-16 text-base font-medium text-slate-600 dark:text-slate-300">Focus on these topics to improve your coding profile.</p>
      
      <div className="flex flex-wrap gap-4">
        {weakTopics.map((topic, index) => (
          <div key={index} className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white/80 px-5 py-3 text-lg font-bold text-amber-800 shadow-sm transition-colors hover:bg-amber-50 dark:border-amber-800/60 dark:bg-amber-950/15 dark:text-amber-200 dark:hover:bg-amber-950/30">
            <span>{topic.name}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">{topic.solved} solved</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaknessSection;
