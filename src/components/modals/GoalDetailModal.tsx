import React, { useState } from 'react';
import { Goal } from '../../types';

interface GoalDetailModalProps {
  goal: Goal;
  onClose: () => void;
  onDeposit: (goalId: string, amount: number) => void;
  onToggleComplete: (goalId: string) => void;
  onDeleteGoal: (goalId: string) => void;
}

export const GoalDetailModal: React.FC<GoalDetailModalProps> = ({
  goal,
  onClose,
  onDeposit,
  onToggleComplete,
  onDeleteGoal,
}) => {
  const [customDeposit, setCustomDeposit] = useState('');
  const [depositMsg, setDepositMsg] = useState(false);

  const formatMoney = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

  const handleQuickAdd = (amount: number) => {
    onDeposit(goal.id, amount);
    setDepositMsg(true);
    setTimeout(() => setDepositMsg(false), 1200);
  };

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customDeposit);
    if (!isNaN(val) && val > 0) {
      onDeposit(goal.id, val);
      setCustomDeposit('');
      setDepositMsg(true);
      setTimeout(() => setDepositMsg(false), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md rounded-t-[28px] sm:rounded-2xl bg-[#0e1f17] border border-[#273830] p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Top Drag bar */}
        <div className="w-12 h-1.5 bg-[#273830] rounded-full mx-auto mb-4 sm:hidden"></div>

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1d2d25]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#273830] flex items-center justify-center text-[#4be277]">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {goal.icon}
              </span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#d3e7db]">{goal.name}</h3>
              <p className="text-[12px] text-[#bccbb9]">{goal.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1d2d25] flex items-center justify-center text-[#bccbb9] hover:text-[#d3e7db]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Progress Card */}
        <div className="my-4 p-4 rounded-2xl bg-[#12231b] border border-[#1d2d25]">
          <div className="flex justify-between items-baseline">
            <span className="text-[12px] text-[#bccbb9]">Current Savings</span>
            <span className="text-[12px] font-bold text-[#4be277]">{percent}% Reached</span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-[24px] font-bold text-[#d3e7db]">₱ {formatMoney(goal.currentAmount)}</span>
            <span className="text-[14px] text-[#bccbb9]">/ ₱ {formatMoney(goal.targetAmount)}</span>
          </div>

          {/* Bar */}
          <div className="w-full h-3 rounded-full bg-[#02110a] mt-3 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-[#4be277] transition-all duration-500 shadow-[0_0_10px_rgba(75,226,119,0.5)]"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-[11px] text-[#bccbb9] mt-2">
            <span>Remaining: ₱ {remaining.toLocaleString()}</span>
            <span>Target: {goal.targetDate}</span>
          </div>
        </div>

        {/* Quick Deposit Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] uppercase tracking-wider text-[#bccbb9] font-semibold">
              Add Quick Deposit
            </span>
            {depositMsg && (
              <span className="text-[11px] text-[#4be277] font-semibold animate-pulse">
                + Saved!
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickAdd(500)}
              className="py-2.5 rounded-xl bg-[#1d2d25] hover:bg-[#273830] text-[#d3e7db] text-[13px] font-semibold border border-[#273830] active:scale-95 transition-all"
            >
              +₱500
            </button>
            <button
              onClick={() => handleQuickAdd(1000)}
              className="py-2.5 rounded-xl bg-[#1d2d25] hover:bg-[#273830] text-[#d3e7db] text-[13px] font-semibold border border-[#273830] active:scale-95 transition-all"
            >
              +₱1,000
            </button>
            <button
              onClick={() => handleQuickAdd(5000)}
              className="py-2.5 rounded-xl bg-[#1d2d25] hover:bg-[#273830] text-[#d3e7db] text-[13px] font-semibold border border-[#273830] active:scale-95 transition-all"
            >
              +₱5,000
            </button>
          </div>

          {/* Custom Deposit Form */}
          <form onSubmit={handleCustomAdd} className="flex gap-2 mt-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-3 text-[#4be277] text-[14px] font-bold">₱</span>
              <input
                type="number"
                value={customDeposit}
                onChange={(e) => setCustomDeposit(e.target.value)}
                placeholder="Custom amount..."
                className="w-full h-11 pl-7 pr-3 rounded-xl bg-[#02110a] border border-[#1d2d25] text-[#d3e7db] text-[14px] focus:outline-none focus:border-[#4be277]"
              />
            </div>
            <button
              type="submit"
              className="px-4 h-11 rounded-xl bg-[#22c55e] text-[#004b1e] font-bold text-[13px] active:scale-95 transition-all"
            >
              Deposit
            </button>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2 mt-6 pt-3 border-t border-[#1d2d25]">
          <button
            onClick={() => {
              onToggleComplete(goal.id);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#1d2d25] hover:bg-[#273830] text-[#4be277] text-[13px] font-semibold border border-[#273830]"
          >
            {goal.status === 'Completed' ? 'Mark as In-Progress' : 'Mark Completed'}
          </button>
          <button
            onClick={() => {
              onDeleteGoal(goal.id);
              onClose();
            }}
            className="py-2.5 px-3 rounded-xl bg-[#d73b00]/15 hover:bg-[#d73b00]/25 text-[#ffb4ab] text-[13px] font-semibold border border-[#d73b00]/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
