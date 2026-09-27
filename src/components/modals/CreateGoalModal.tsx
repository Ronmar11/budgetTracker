import React, { useState, useMemo } from 'react';
import { Goal, LinkedAccount } from '../../types';
import { BRAND_LOGO_URL } from '../../data/initialData';

interface CreateGoalModalProps {
  accounts: LinkedAccount[];
  onClose: () => void;
  onCreateGoal: (newGoal: Goal) => void;
}

const GOAL_CATEGORIES = [
  { name: 'Savings & Investment', icon: 'savings', tag: 'Primary', desc: 'Wealth accumulation' },
  { name: 'Tech & Workstation', icon: 'laptop_mac', tag: 'Gear', desc: 'Hardware & tools' },
  { name: 'Travel & Leisure', icon: 'flight_takeoff', tag: 'Adventure', desc: 'Vacations & trips' },
  { name: 'Emergency Fund', icon: 'shield', tag: 'Essential', desc: 'Financial safety cushion' },
  { name: 'Vehicle & Mobility', icon: 'directions_car', tag: 'Asset', desc: 'Transport upgrade' },
  { name: 'Real Estate / Home', icon: 'home', tag: 'Long-term', desc: 'Down payment fund' },
];

export const CreateGoalModal: React.FC<CreateGoalModalProps> = ({
  accounts,
  onClose,
  onCreateGoal,
}) => {
  const [targetAmount, setTargetAmount] = useState<number>(60000);
  const [goalName, setGoalName] = useState('Emergency Stash 2026');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [targetMonths, setTargetMonths] = useState(24);
  const [selectedFunding, setSelectedFunding] = useState(accounts[0]?.name || 'Cash Wallet');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showDateMonthsPicker, setShowDateMonthsPicker] = useState(false);

  const selectedCategory = GOAL_CATEGORIES[categoryIndex] || GOAL_CATEGORIES[0];

  const formatMoney = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const monthlyEst = useMemo(() => {
    if (targetAmount <= 0) return 0;
    return Math.max(100, Math.round(targetAmount / targetMonths));
  }, [targetAmount, targetMonths]);

  // Target date label
  const completionDateLabel = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + targetMonths);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }, [targetMonths]);

  const completionFullDateLabel = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + targetMonths);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }, [targetMonths]);

  const handleAdjustAmount = (delta: number) => {
    setTargetAmount((prev) => Math.max(0, prev + delta));
  };

  const handleResetAmount = () => {
    setTargetAmount(0);
  };

  const handleCreate = () => {
    if (targetAmount <= 0 || !goalName.trim()) {
      return;
    }

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      name: goalName.trim(),
      category: selectedCategory.name,
      icon: selectedCategory.icon,
      currentAmount: 0,
      targetAmount: targetAmount,
      targetDate: completionDateLabel,
      status: 'On Track',
      monthlyContribution: monthlyEst,
      estimatedCompletion: completionDateLabel,
      fundingAccount: selectedFunding,
      colorType: 'primary',
    };

    onCreateGoal(newGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06160f] overflow-y-auto flex flex-col justify-between">
      {/* Header Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#06160f]/90 backdrop-blur-xl border-b border-[#1d2d25] pt-safe">
        <div className="h-16 px-5 flex items-center justify-between max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2">
            <button
              aria-label="Go back"
              onClick={onClose}
              className="w-11 h-11 -ml-2 flex items-center justify-center rounded-full text-[#d3e7db] hover:bg-[#273830]/40 active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="BudgetTrack Leaf Emblem"
              className="h-8 w-auto object-contain"
              src={BRAND_LOGO_URL}
            />
            <h1 className="text-[18px] font-semibold text-[#d3e7db] tracking-tight">
              Create New Goal
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-20 px-5 max-w-lg mx-auto w-full pb-8 space-y-4">
        {/* Goal Target Amount Input Hero */}
        <section className="flex flex-col items-center pt-2 pb-2 text-center">
          <span className="text-[11px] uppercase tracking-wider text-[#bccbb9] font-semibold mb-2">
            SET TARGET SAVINGS AMOUNT
          </span>
          {/* Currency Display Row */}
          <div className="flex items-center justify-center space-x-1 select-none my-1">
            <span className="text-[32px] text-[#4be277] font-bold">₱</span>
            <span className="text-[36px] font-bold text-[#d3e7db] tracking-tight">
              {formatMoney(targetAmount)}
            </span>
            <span aria-hidden="true" className="w-[3px] h-8 bg-[#4be277] rounded-full animate-pulse ml-0.5"></span>
          </div>

          {/* Quick Increment Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 w-full">
            <button
              onClick={() => handleAdjustAmount(5000)}
              className="h-9 px-3.5 rounded-full bg-[#12231b] hover:bg-[#1d2d25] border border-[#1d2d25] active:scale-95 transition-all text-[#d3e7db] text-[12px] font-medium shadow-sm"
              type="button"
            >
              +₱5,000
            </button>
            <button
              onClick={() => handleAdjustAmount(10000)}
              className="h-9 px-3.5 rounded-full bg-[#12231b] hover:bg-[#1d2d25] border border-[#1d2d25] active:scale-95 transition-all text-[#d3e7db] text-[12px] font-medium shadow-sm"
              type="button"
            >
              +₱10,000
            </button>
            <button
              onClick={() => handleAdjustAmount(25000)}
              className="h-9 px-3.5 rounded-full bg-[#12231b] hover:bg-[#1d2d25] border border-[#1d2d25] active:scale-95 transition-all text-[#d3e7db] text-[12px] font-medium shadow-sm"
              type="button"
            >
              +₱25,000
            </button>
            <button
              aria-label="Clear Amount"
              onClick={handleResetAmount}
              className="w-9 h-9 rounded-full bg-[#12231b] hover:bg-[#1d2d25] border border-[#1d2d25] active:scale-95 transition-all text-[#ffb4ab] flex items-center justify-center shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">backspace</span>
            </button>
          </div>
          <p className="text-[13px] text-[#bccbb9] text-center mt-2">
            Set your target savings amount to calculate milestones
          </p>
        </section>

        {/* Visual Milestone Sparkline Preview Card */}
        <div className="bg-[#0e1f17] border border-[#1d2d25] rounded-2xl p-4 shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#273830] flex items-center justify-center text-[#4be277]">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                insights
              </span>
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-[#d3e7db]">Pacing Trajectory</h2>
              <p className="text-[12px] text-[#bccbb9]">
                Estimated completion by <span className="text-[#4be277] font-medium">{completionDateLabel}</span>
              </p>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="w-20 h-8 flex items-end">
            <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 80 32">
              <path
                className="text-[#4be277]"
                d="M2 28 C 20 25, 30 18, 50 12 C 65 8, 72 4, 78 3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <circle className="fill-[#4be277]" cx="78" cy="3" r="3.5" />
            </svg>
          </div>
        </div>

        {/* Form Configuration Stack */}
        <div className="bg-[#12231b] border border-[#1d2d25] rounded-[20px] p-4 space-y-3.5 shadow-lg">
          {/* Goal Name */}
          <div className="space-y-1">
            <label className="block text-[11px] uppercase tracking-wider text-[#bccbb9] font-semibold" htmlFor="goal-name-input">
              GOAL NAME
            </label>
            <div className="flex items-center bg-[#02110a] border border-[#1d2d25] rounded-xl px-3.5 py-2.5 shadow-sm transition-all focus-within:border-[#4be277]/60">
              <div className="w-8 h-8 rounded-lg bg-[#273830] flex items-center justify-center text-[#4be277] mr-3 shrink-0">
                <span className="material-symbols-outlined text-[18px]">flag</span>
              </div>
              <input
                className="w-full bg-transparent text-[15px] text-[#d3e7db] placeholder:text-[#869585] focus:outline-none"
                id="goal-name-input"
                placeholder="e.g., Emergency Fund, New Car, Home..."
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>
          </div>

          {/* Category & Icon Selector */}
          <div className="space-y-1 relative">
            <span className="block text-[11px] uppercase tracking-wider text-[#bccbb9] font-semibold">
              CATEGORY & ICON
            </span>
            <button
              onClick={() => setShowCategoryPicker(!showCategoryPicker)}
              className="w-full flex items-center justify-between bg-[#02110a] hover:bg-[#0e1f17] border border-[#1d2d25] active:scale-[0.99] transition-all rounded-xl p-2.5 shadow-sm text-left"
              type="button"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center text-[#4be277] shrink-0">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {selectedCategory.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[14px] font-semibold text-[#d3e7db] truncate">
                      {selectedCategory.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#273830] text-[#bccbb9] text-[10px]">
                      {selectedCategory.tag}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#bccbb9]">{selectedCategory.desc}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#bccbb9] text-[20px] ml-2">
                {showCategoryPicker ? 'expand_less' : 'chevron_right'}
              </span>
            </button>

            {/* Category Dropdown */}
            {showCategoryPicker && (
              <div className="mt-2 p-2 rounded-xl bg-[#0e1f17] border border-[#273830] shadow-xl space-y-1">
                {GOAL_CATEGORIES.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setCategoryIndex(i);
                      setShowCategoryPicker(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between ${
                      categoryIndex === i ? 'bg-[#22c55e]/20 text-[#4be277]' : 'hover:bg-[#1d2d25] text-[#d3e7db]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
                      <span className="text-[13px] font-medium">{c.name}</span>
                    </div>
                    <span className="text-[11px] text-[#bccbb9]">{c.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Target Date Selector */}
          <div className="space-y-1 relative">
            <span className="block text-[11px] uppercase tracking-wider text-[#bccbb9] font-semibold">
              TARGET DATE
            </span>
            <button
              onClick={() => setShowDateMonthsPicker(!showDateMonthsPicker)}
              className="w-full flex items-center justify-between bg-[#02110a] hover:bg-[#0e1f17] border border-[#1d2d25] active:scale-[0.99] transition-all rounded-xl p-2.5 shadow-sm text-left"
              type="button"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#273830] flex items-center justify-center text-[#d3e7db] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[14px] font-semibold text-[#d3e7db] block truncate">
                    {completionFullDateLabel}
                  </span>
                  <p className="text-[12px] text-[#bccbb9]">{targetMonths} months remaining</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 shrink-0 ml-2">
                <span className="px-2 py-0.5 rounded-full bg-[#12231b] text-[#4be277] text-[11px] font-semibold">
                  {Math.round(targetMonths / 12 * 10) / 10} Years
                </span>
                <span className="material-symbols-outlined text-[#bccbb9] text-[20px]">
                  {showDateMonthsPicker ? 'expand_less' : 'chevron_right'}
                </span>
              </div>
            </button>

            {/* Months Selector */}
            {showDateMonthsPicker && (
              <div className="mt-2 p-3 rounded-xl bg-[#0e1f17] border border-[#273830] shadow-xl">
                <span className="text-[11px] text-[#bccbb9] block mb-2 font-medium">Select Timeline:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 12, 18, 24, 36, 48, 60].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setTargetMonths(m);
                        setShowDateMonthsPicker(false);
                      }}
                      className={`py-2 rounded-lg text-[12px] font-semibold border ${
                        targetMonths === m
                          ? 'bg-[#22c55e] text-[#004b1e] border-[#22c55e]'
                          : 'bg-[#12231b] text-[#d3e7db] border-[#1d2d25] hover:bg-[#1d2d25]'
                      }`}
                    >
                      {m} mos ({Math.round(m / 12 * 10) / 10}y)
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Estimated Monthly Contribution */}
          <div className="space-y-1">
            <span className="block text-[11px] uppercase tracking-wider text-[#bccbb9] font-semibold">
              ESTIMATED MONTHLY CONTRIBUTION
            </span>
            <div className="w-full flex items-center justify-between bg-[#02110a] border border-[#1d2d25] rounded-xl p-2.5 shadow-sm text-left">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#273830] flex items-center justify-center text-[#d3e7db] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">sync</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[14px] font-semibold text-[#d3e7db] block truncate">
                    ₱ {formatMoney(monthlyEst)} / month
                  </span>
                  <p className="text-[12px] text-[#4be277]">
                    Achievable in {targetMonths} installments
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#bccbb9] text-[20px] ml-2">
                chevron_right
              </span>
            </div>
          </div>

          {/* Funding Account */}
          <div className="space-y-1">
            <span className="block text-[11px] uppercase tracking-wider text-[#bccbb9] font-semibold">
              FUNDING ACCOUNT
            </span>
            <div className="w-full flex items-center justify-between bg-[#02110a] border border-[#1d2d25] rounded-xl p-2.5 shadow-sm text-left">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#ffb5a0]/15 flex items-center justify-center text-[#ffb5a0] shrink-0">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    account_balance_wallet
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-[14px] font-semibold text-[#d3e7db] block truncate">
                    {selectedFunding}
                  </span>
                  <p className="text-[12px] text-[#bccbb9] truncate">Available: ₱14,850.00</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#bccbb9] text-[20px] ml-2">
                chevron_right
              </span>
            </div>
          </div>
        </div>

        {/* Micro Visual Delight: Motivation Banner */}
        <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#02110a] border border-[#1d2d25] shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#4be277]/10 flex items-center justify-center text-[#4be277] shrink-0">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#d3e7db]">Automated micro-deposits</p>
            <p className="text-[11px] text-[#bccbb9]">
              BudgetTrack automatically allocates rounding spare change towards this goal.
            </p>
          </div>
        </div>

        {/* Pinned Action Controls */}
        <div className="flex flex-col items-center space-y-2 pt-2 pb-6">
          <button
            onClick={handleCreate}
            className="w-full h-[52px] bg-[#22c55e] hover:bg-[#4be277] text-[#004b1e] font-bold text-[18px] rounded-full flex items-center justify-center space-x-2 shadow-[0px_8px_24px_-4px_rgba(34,197,94,0.35)] active:scale-[0.98] transition-all"
            type="button"
          >
            <span>Create Goal</span>
            <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
          </button>
          <button
            onClick={onClose}
            className="text-[14px] text-[#bccbb9] hover:text-[#d3e7db] py-2 transition-colors"
            type="button"
          >
            Cancel & Discard
          </button>
        </div>
      </main>
    </div>
  );
};
