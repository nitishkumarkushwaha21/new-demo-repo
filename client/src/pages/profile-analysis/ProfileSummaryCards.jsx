import React from 'react';

const Card = ({ title, value, colorClass, accentClass }) => (
  <div className="group relative overflow-hidden rounded-[24px] border border-slate-200/70 bg-white/90 p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_-40px_rgba(15,23,42,0.9)] dark:border-slate-700 dark:bg-slate-900/85">
    <div className={`absolute inset-x-0 top-0 h-1.5 ${accentClass}`} />
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{title}</h3>
    <p className={`text-3xl font-black ${colorClass}`}>{value}</p>
  </div>
);

const ProfileSummaryCards = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
      <Card title="Total Solved" value={data.totalSolved} colorClass="text-sky-600 dark:text-sky-300" accentClass="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500" />
      <Card title="Easy" value={data.easySolved} colorClass="text-emerald-600 dark:text-emerald-300" accentClass="bg-gradient-to-r from-emerald-400 to-lime-400" />
      <Card title="Medium" value={data.mediumSolved} colorClass="text-amber-500 dark:text-amber-300" accentClass="bg-gradient-to-r from-amber-300 to-orange-400" />
      <Card title="Hard" value={data.hardSolved} colorClass="text-rose-500 dark:text-rose-300" accentClass="bg-gradient-to-r from-rose-400 to-red-500" />
      <Card title="Acceptance Rate" value={`${data.acceptanceRate}%`} colorClass="text-violet-600 dark:text-violet-300" accentClass="bg-gradient-to-r from-violet-400 to-fuchsia-400" />
      <Card title="Ranking" value={data.ranking.toLocaleString()} colorClass="text-indigo-600 dark:text-indigo-300" accentClass="bg-gradient-to-r from-indigo-400 to-blue-500" />
      <Card title="Contest Rating" value={Math.round(data.contestRating)} colorClass="text-pink-600 dark:text-pink-300" accentClass="bg-gradient-to-r from-pink-400 to-rose-400" />
    </div>
  );
};

export default ProfileSummaryCards;
