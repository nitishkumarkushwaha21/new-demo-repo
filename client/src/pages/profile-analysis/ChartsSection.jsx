import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartsSection = ({ diffData, topicData }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const palette = useMemo(
    () => ({
      textColor: isDarkMode ? '#e2e8f0' : '#334155',
      mutedText: isDarkMode ? '#94a3b8' : '#64748b',
      gridColor: isDarkMode
        ? 'rgba(148, 163, 184, 0.16)'
        : 'rgba(148, 163, 184, 0.22)',
      cardClass:
        'rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_25px_65px_-45px_rgba(15,23,42,0.8)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/85',
    }),
    [isDarkMode],
  );

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: palette.textColor,
          font: {
            family: "'Segoe UI', 'sans-serif'",
            size: 14,
            weight: '600',
          },
          boxWidth: 14,
          boxHeight: 14,
          padding: 18,
        },
      },
    },
  };

  // Pie Chart Config (Difficulty)
  const pieData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [diffData?.easy || 0, diffData?.medium || 0, diffData?.hard || 0],
        backgroundColor: [
          'rgba(16, 185, 129, 0.86)',
          'rgba(245, 158, 11, 0.84)',
          'rgba(244, 63, 94, 0.82)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(244, 63, 94, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Bar Chart Config (Topics)
  const barData = {
    labels: topicData?.labels || [],
    datasets: [
      {
        label: 'Problems Solved',
        data: topicData?.data || [],
        backgroundColor: 'rgba(56, 189, 248, 0.75)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: 'Strong Threshold',
        data: topicData?.labels.map(() => 50) || [],
        type: 'line',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Weak Threshold',
        data: topicData?.labels.map(() => 20) || [],
        type: 'line',
        borderColor: 'rgba(244, 63, 94, 1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      }
    ],
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: palette.gridColor },
        ticks: { color: palette.mutedText, font: { size: 12, weight: '600' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: palette.mutedText, font: { size: 12, weight: '600' } }
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* Pie Chart */}
      <div className={`${palette.cardClass} lg:col-span-1`}>
        <h3 className="mb-2 text-xl font-black text-slate-900 dark:text-white">Difficulty Distribution</h3>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">A quick look at how your solved set is spread across easy, medium, and hard.</p>
        <div className="h-[280px] flex justify-center items-center">
          {(diffData?.easy || diffData?.medium || diffData?.hard) ? (
             <Pie data={pieData} options={commonOptions} />
          ) : (
             <div className="text-slate-400 font-medium">No data available</div>
          )}
        </div>
      </div>
      
      {/* Bar Chart */}
      <div className={`${palette.cardClass} lg:col-span-2`}>
        <h3 className="mb-2 text-xl font-black text-slate-900 dark:text-white">Topic Strength Distribution</h3>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Bars show coverage by topic, with threshold lines marking strong and weak zones.</p>
        <div className="h-[280px] w-full">
          {topicData ? (
             <Bar data={barData} options={barOptions} />
          ) : (
             <div className="h-full flex justify-center items-center text-slate-400 font-medium">No data available</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default ChartsSection;
