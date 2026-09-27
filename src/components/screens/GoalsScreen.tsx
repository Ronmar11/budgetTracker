import React, { useState, useMemo } from 'react';
import { Goal } from '../../types';

interface GoalsScreenProps {
  goals: Goal[];
  onSelectGoal: (goal: Goal) => void;
  onOpenNewGoal: () => void;
  onOpenManageAutomation: () => void;
}

export const GoalsScreen: React.FC<GoalsScreenProps> = ({
  goals,
  onSelectGoal,
  onOpenNewGoal,
  onOpenManageAutomation,
}) => {
  const [filter, setFilter] = useState<'active' | 'completed' | 'all'>('active');

  const formatMoney = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const activeGoals = useMemo(() => goals.filter((g) => g.status !== 'Completed'), [goals]);
  const completedGoals = useMemo(() => goals.filter((g) => g.status === 'Completed'), [goals]);

  // Total saved across goals
  const totalSaved = useMemo(() => {
    return activeGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  }, [activeGoals]);

  const totalTarget = useMemo(() => {
    return activeGoals.reduce((sum, g) => sum + g.targetAmount, 0) || 150000;
  }, [activeGoals]);

  const overallPercent = Math.min(100, Math.round((totalSaved / totalTarget) * 100)) || 57;

  const displayGoals = useMemo(() => {
    if (filter === 'active') return activeGoals;
    if (filter === 'completed') return completedGoals;
    return goals;
  }, [filter, activeGoals, completedGoals, goals]);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Top Header Row */}
      <section className="flex items-start justify-between gap-2 pt-2 pb-4">
        <div className="flex flex-col min-w-0">
          <h1 className="text-[28px] leading-[34px] font-bold text-[#d3e7db] tracking-tight">
            Financial Goals
          </h1>
          <p className="text-[14px] leading-[20px] text-[#bccbb9] mt-0.5">
            Track your milestones and build your future.
          </p>
        </div>
        <button
          onClick={onOpenNewGoal}
          className="shrink-0 flex items-center gap-1.5 h-11 px-3.5 rounded-full bg-[#1d2d25] hover:bg-[#273830] border border-[#273830] text-[#d3e7db] shadow-sm active:scale-95 transition-all duration-150"
          type="button"
        >
          <span className="material-symbols-outlined text-[#4be277] text-[20px]">add</span>
          <span className="text-[12px] font-semibold tracking-wide">New Goal</span>
        </button>
      </section>

      {/* Global Savings Summary Card */}
      <section className="relative w-full rounded-[20px] bg-[#0e1f17] border border-[#1d2d25] p-5 shadow-xl overflow-hidden mb-5">
        {/* Ambient specular sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4be277]/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col">
          {/* Card Header Metric Row */}
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#bccbb9] font-medium">Total Goals Saved</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#273830] text-[#4be277] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4be277] animate-pulse"></span>
              {activeGoals.length} Active Goals
            </span>
          </div>

          {/* Primary Amount Valuation */}
          <div className="mt-2">
            <div className="flex items-baseline gap-1 tracking-tight">
              <span className="text-[16px] text-[#4be277] font-bold">₱</span>
              <span className="text-[32px] leading-[38px] font-bold text-[#d3e7db]">
                {formatMoney(totalSaved)}
              </span>
            </div>
            <p className="text-[14px] text-[#bccbb9] mt-0.5">
              of <span className="text-[#d3e7db] font-medium">₱ {formatMoney(totalTarget)}</span> total target
            </p>
          </div>

          {/* Overall Visual Progress Segment */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-[#bccbb9]">Overall Completion</span>
              <span className="text-[11px] text-[#4be277] font-bold">{overallPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#02110a] overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#4be277] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                style={{ width: `${overallPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Card Sub-Footer Info */}
          <div className="flex items-center justify-between text-xs mt-3.5 pt-3 border-t border-[#1d2d25]/60">
            <div className="flex items-center gap-1.5 text-[#4be277] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>↑ ₱ 6,500 added this month • On track</span>
            </div>
            <span className="text-[11px] text-[#bccbb9]">Target: Q4 2026</span>
          </div>
        </div>
      </section>

      {/* Segmented Filter Switcher */}
      <section aria-label="Goals Filter" className="flex items-center gap-2 mb-4" role="tablist">
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-150 ${
            filter === 'active'
              ? 'bg-[#4be277] text-[#003915] shadow-[0_4px_16px_rgba(75,226,119,0.3)]'
              : 'bg-[#12231b] text-[#bccbb9] hover:text-[#d3e7db] border border-[#1d2d25]'
          }`}
          role="tab"
          type="button"
        >
          Active ({activeGoals.length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-150 ${
            filter === 'completed'
              ? 'bg-[#4be277] text-[#003915] shadow-[0_4px_16px_rgba(75,226,119,0.3)]'
              : 'bg-[#12231b] text-[#bccbb9] hover:text-[#d3e7db] border border-[#1d2d25]'
          }`}
          role="tab"
          type="button"
        >
          Completed ({completedGoals.length})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-150 ${
            filter === 'all'
              ? 'bg-[#4be277] text-[#003915] shadow-[0_4px_16px_rgba(75,226,119,0.3)]'
              : 'bg-[#12231b] text-[#bccbb9] hover:text-[#d3e7db] border border-[#1d2d25]'
          }`}
          role="tab"
          type="button"
        >
          All
        </button>
      </section>

      {/* Goals List Stack */}
      <section className="flex flex-col gap-3.5 mb-5">
        {displayGoals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

          // Color themes for progress bar & icon
          let iconColor = 'text-[#4be277]';
          let barColor = 'bg-[#4be277] shadow-[0_0_8px_rgba(75,226,119,0.3)]';
          let statusBadgeClass = 'bg-[#273830] text-[#4be277]';

          if (goal.status === 'Behind') {
            iconColor = 'text-[#4dd8f7]';
            barColor = 'bg-[#4dd8f7] shadow-[0_0_8px_rgba(77,216,247,0.3)]';
            statusBadgeClass = 'bg-[#273830] text-[#ffb5a0]';
          } else if (goal.colorType === 'secondary-container') {
            iconColor = 'text-[#d73b00]';
            barColor = 'bg-[#d73b00] shadow-[0_0_8px_rgba(215,59,0,0.3)]';
            statusBadgeClass = 'bg-[#273830] text-[#4be277]';
          } else if (goal.status === 'Completed') {
            iconColor = 'text-[#4be277]';
            barColor = 'bg-[#4be277]';
            statusBadgeClass = 'bg-[#22c55e]/20 text-[#4be277]';
          }

          return (
            <article
              key={goal.id}
              onClick={() => onSelectGoal(goal)}
              className="relative rounded-[20px] bg-[#0e1f17] border border-[#1d2d25] p-4 shadow-md active:scale-[0.99] hover:bg-[#12231b] transition-all duration-150 cursor-pointer"
            >
              <div className="flex items-start gap-3.5">
                {/* Icon Badge */}
                <div className="w-11 h-11 rounded-2xl bg-[#273830] flex items-center justify-center shrink-0 shadow-sm">
                  <span
                    className={`material-symbols-outlined text-[24px] ${iconColor}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {goal.icon}
                  </span>
                </div>

                {/* Metric Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-[16px] text-[#d3e7db] font-semibold truncate">
                      {goal.name}
                    </h2>
                    <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusBadgeClass}`}>
                      {goal.status === 'Behind' && goal.behindAmount
                        ? `Behind by ₱ ${goal.behindAmount.toLocaleString()}`
                        : goal.status}
                    </span>
                  </div>

                  {/* Numbers */}
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-[18px] font-bold text-[#d3e7db]">
                      ₱ {formatMoney(goal.currentAmount)}
                    </span>
                    <span className="text-[14px] text-[#bccbb9]">
                      / ₱ {formatMoney(goal.targetAmount)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#02110a] mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  {/* Footer Metadata */}
                  <div className="flex items-center justify-between mt-2.5 text-[11px]">
                    <span className="text-[#bccbb9]">
                      {goal.status === 'Completed'
                        ? 'Goal Achieved!'
                        : `₱ ${remaining.toLocaleString()} left • ${goal.status === 'Behind' ? `Target: ${goal.targetDate}` : `Est. ${goal.estimatedCompletion}`}`}
                    </span>
                    <span
                      className={`font-medium ${
                        goal.colorType === 'secondary-container'
                          ? 'text-[#ffb5a0]'
                          : goal.status === 'Behind'
                          ? 'text-[#4dd8f7]'
                          : 'text-[#4be277]'
                      }`}
                    >
                      {goal.status === 'Completed'
                        ? '100% done'
                        : goal.status === 'Behind'
                        ? `${percent}% done`
                        : goal.colorType === 'secondary-container'
                        ? `${percent}% done`
                        : `₱ ${goal.monthlyContribution.toLocaleString()}/mo`}
                    </span>
                  </div>
                </div>

                {/* Chevron Action */}
                <div className="self-center pl-1 text-[#bccbb9]">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </div>
              </div>
            </article>
          );
        })}

        {displayGoals.length === 0 && (
          <div className="p-8 rounded-2xl bg-[#0e1f17] border border-[#1d2d25] text-center">
            <span className="material-symbols-outlined text-[32px] text-[#bccbb9] mb-2">flag</span>
            <p className="text-[14px] text-[#d3e7db] font-semibold">No goals in this category</p>
            <p className="text-[12px] text-[#bccbb9] mt-1">
              Create a new goal to start tracking your financial milestones.
            </p>
          </div>
        )}
      </section>

      {/* Quick Deposit Action Banner */}
      <section className="rounded-[20px] bg-[#0e1f17] border border-[#1d2d25] p-4 shadow-lg flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#273830] flex items-center justify-center shrink-0 text-[#4be277]">
            <span className="material-symbols-outlined text-[22px]">autorenew</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-[15px] font-semibold text-[#d3e7db] truncate">
              Automated Monthly Deposit
            </h3>
            <p className="text-[11px] text-[#bccbb9] truncate">
              Next ₱ 4,500 transfers on Oct 1st.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenManageAutomation}
          className="shrink-0 px-3.5 py-1.5 rounded-xl bg-[#1d2d25] hover:bg-[#2c3d34] text-[#d3e7db] text-[12px] font-semibold active:scale-95 transition-all border border-[#273830]"
          type="button"
        >
          Manage
        </button>
      </section>
    </div>
  );
};
