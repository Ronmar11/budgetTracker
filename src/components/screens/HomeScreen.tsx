import React from 'react';
import { Transaction, UserProfile, ScreenTab } from '../../types';

interface HomeScreenProps {
  user: UserProfile;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
  isBalanceHidden: boolean;
  onToggleBalanceHidden: () => void;
  onNavigateTab: (tab: ScreenTab) => void;
  onSelectTransaction: (tx: Transaction) => void;
  onOpenAddTransaction: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  totalBalance,
  totalIncome,
  totalExpenses,
  transactions,
  isBalanceHidden,
  onToggleBalanceHidden,
  onNavigateTab,
  onSelectTransaction,
  onOpenAddTransaction,
}) => {
  // Format currency
  const formatMoney = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Spending categories calculations
  const categories = [
    { name: 'Food & Drinks', percent: 42, color: '#ffb5a0' },
    { name: 'Transport', percent: 19, color: '#d73b00' },
    { name: 'Bills & Util', percent: 15, color: '#4dd8f7' },
    { name: 'Shopping', percent: 12, color: '#4be277' },
    { name: 'Others', percent: 12, color: '#869585' },
  ];

  // Recent transactions to show
  const recentList = transactions.slice(0, 3);

  // Remaining budget
  const budgetRemaining = Math.max(0, user.monthlyBudget - totalExpenses);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Greeting Section */}
      <section className="mt-2 px-1 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] leading-[28px] font-bold text-[#d3e7db] tracking-tight">
            Good morning, {user.name.split(' ')[0]} <span className="inline-block animate-pulse">👋</span>
          </h1>
          <p className="text-[14px] leading-[20px] text-[#bccbb9] mt-0.5">
            Here's your financial overview for this month.
          </p>
        </div>
      </section>

      {/* Total Balance Card */}
      <section className="mt-4 relative overflow-hidden rounded-[24px] bg-[#12231b] p-5 shadow-xl border border-[#1d2d25]">
        {/* Ambient Radial Glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#4be277]/10 blur-3xl"></div>
        <div className="pointer-events-none absolute right-4 -bottom-8 h-36 w-36 rounded-full bg-[#22c55e]/15 blur-2xl"></div>

        {/* Header Row */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] leading-[14px] text-[#bccbb9] uppercase tracking-wider font-semibold">
              Total Balance
            </span>
            <button
              onClick={onToggleBalanceHidden}
              aria-label="Toggle balance visibility"
              className="text-[#bccbb9] hover:text-[#d3e7db] transition-colors flex items-center p-0.5"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isBalanceHidden ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
          <button
            onClick={onOpenAddTransaction}
            title="Add transaction"
            className="w-10 h-10 rounded-full bg-[#1d2d25] hover:bg-[#273830] flex items-center justify-center text-[#4be277] shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance_wallet
            </span>
          </button>
        </div>

        {/* Balance Amount */}
        <div className="relative z-10 mt-2">
          {isBalanceHidden ? (
            <span className="text-[36px] leading-[44px] font-extrabold text-[#d3e7db] tracking-tight block">
              ₱ ••••••••
            </span>
          ) : (
            <span className="text-[36px] leading-[44px] font-extrabold text-[#d3e7db] tracking-tight block">
              ₱ {formatMoney(totalBalance)}
            </span>
          )}
        </div>

        {/* Indicator Badge */}
        <div className="relative z-10 mt-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4be277]/15 text-[#4be277] text-[12px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            <span>12% vs last month</span>
          </div>
          <span className="text-[11px] text-[#bccbb9]">Updated 2m ago</span>
        </div>

        {/* Decorative SVG Wave / Sparkline */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 opacity-75 overflow-hidden">
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="balanceGlowGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#4be277" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#4be277" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="balanceStrokeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#4be277" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#4be277" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M0 64 C40 60 70 68 110 52 C150 36 185 48 230 30 C275 12 315 28 360 8 L360 80 L0 80 Z"
              fill="url(#balanceGlowGradient)"
            />
            <path
              d="M0 64 C40 60 70 68 110 52 C150 36 185 48 230 30 C275 12 315 28 360 8"
              stroke="url(#balanceStrokeGradient)"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </section>

      {/* Cash Flow Summary (2-Column Grid) */}
      <section className="grid grid-cols-2 gap-3.5 mt-4">
        {/* Total Income Card */}
        <div className="relative overflow-hidden rounded-[20px] bg-[#12231b] p-4 shadow-sm border border-[#1d2d25]">
          <div className="w-9 h-9 rounded-full bg-[#4be277]/15 flex items-center justify-center text-[#4be277] font-bold mb-2.5">
            <span className="material-symbols-outlined text-[18px]">south</span>
          </div>
          <p className="text-[12px] text-[#bccbb9] font-medium">Total Income</p>
          <p className="text-[18px] leading-[24px] font-bold text-[#d3e7db] mt-1 tracking-tight">
            ₱ {formatMoney(totalIncome)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[#4be277] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[12px]">trending_up</span>
            <span>+8.4%</span>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="relative overflow-hidden rounded-[20px] bg-[#12231b] p-4 shadow-sm border border-[#1d2d25]">
          <div className="w-9 h-9 rounded-full bg-[#d73b00]/20 flex items-center justify-center text-[#ffb5a0] font-bold mb-2.5">
            <span className="material-symbols-outlined text-[18px]">north</span>
          </div>
          <p className="text-[12px] text-[#bccbb9] font-medium">Total Expenses</p>
          <p className="text-[18px] leading-[24px] font-bold text-[#d3e7db] mt-1 tracking-tight">
            ₱ {formatMoney(totalExpenses)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[#ffb5a0] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[12px]">trending_down</span>
            <span>-3.1%</span>
          </div>
        </div>
      </section>

      {/* Spending Breakdown Section */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-1 mb-3">
          <h2 className="text-[16px] leading-[22px] font-bold text-[#d3e7db] tracking-tight">
            Spending Breakdown
          </h2>
          <button
            onClick={() => onNavigateTab('transactions')}
            className="text-[#4be277] hover:text-[#6bff8f] transition-colors text-[12px] font-semibold flex items-center gap-0.5"
            type="button"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Donut Chart Card */}
        <div className="rounded-[20px] bg-[#12231b] p-4 shadow-sm border border-[#1d2d25]">
          <div className="grid grid-cols-12 gap-3 items-center">
            {/* Donut Chart Canvas Area */}
            <div className="col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg
                  aria-label="Spending breakdown pie chart"
                  className="w-full h-full -rotate-90 transform"
                  role="img"
                  viewBox="0 0 120 120"
                >
                  {/* Background ring */}
                  <circle cx="60" cy="60" fill="transparent" r="46" stroke="#1d2d25" strokeWidth="14" />
                  {/* Food & Drinks 42% (circumference = 289.02) */}
                  <circle
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="46"
                    stroke="#ffb5a0"
                    strokeDasharray="121.4 289.02"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeWidth="14"
                  />
                  {/* Transportation 19% */}
                  <circle
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="46"
                    stroke="#d73b00"
                    strokeDasharray="54.9 289.02"
                    strokeDashoffset="-121.4"
                    strokeLinecap="round"
                    strokeWidth="14"
                  />
                  {/* Bills & Utilities 15% */}
                  <circle
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="46"
                    stroke="#4dd8f7"
                    strokeDasharray="43.4 289.02"
                    strokeDashoffset="-176.3"
                    strokeLinecap="round"
                    strokeWidth="14"
                  />
                  {/* Shopping 12% */}
                  <circle
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="46"
                    stroke="#4be277"
                    strokeDasharray="34.7 289.02"
                    strokeDashoffset="-219.7"
                    strokeLinecap="round"
                    strokeWidth="14"
                  />
                  {/* Others 12% */}
                  <circle
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r="46"
                    stroke="#869585"
                    strokeDasharray="34.6 289.02"
                    strokeDashoffset="-254.4"
                    strokeLinecap="round"
                    strokeWidth="14"
                  />
                </svg>

                {/* Center Cutout Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-[16px] font-extrabold text-[#d3e7db] leading-none">
                    ₱{Math.round(totalExpenses).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#bccbb9] uppercase tracking-wider font-semibold mt-1">
                    spent
                  </span>
                </div>
              </div>
            </div>

            {/* Legend Items */}
            <div className="col-span-7 flex flex-col justify-center space-y-2.5 pl-1">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-[#d3e7db]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-[13px] font-medium text-[#d3e7db] truncate">{cat.name}</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#d3e7db] pl-1">{cat.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Goal Banner Card */}
      <section
        onClick={() => onNavigateTab('goals')}
        className="mt-4 rounded-[20px] bg-[#1d2d25] hover:bg-[#273830] p-4 flex items-center justify-between shadow-sm cursor-pointer transition-colors border border-[#273830]"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#4be277]/20 flex items-center justify-center text-[#4be277] shrink-0">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              lightbulb
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-[#d3e7db] truncate">Keep it going!</h3>
            <p className="text-[13px] text-[#bccbb9] truncate mt-0.5">
              You're <span className="text-[#4be277] font-semibold">₱ {formatMoney(budgetRemaining)}</span> under your monthly budget limit.
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#12231b] flex items-center justify-center text-[#4be277] shrink-0 ml-2">
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </div>
      </section>

      {/* Recent Activity Teaser */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-1 mb-3">
          <h2 className="text-[16px] font-bold text-[#d3e7db] tracking-tight">Recent Transactions</h2>
          <button
            onClick={() => onNavigateTab('transactions')}
            className="text-[#4be277] hover:text-[#6bff8f] transition-colors text-[12px] font-semibold"
            type="button"
          >
            See History
          </button>
        </div>

        <div className="rounded-[20px] bg-[#12231b] border border-[#1d2d25] overflow-hidden shadow-sm divide-y divide-[#1d2d25]">
          {recentList.map((tx) => {
            const isExp = tx.type === 'expense';
            return (
              <div
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="p-3.5 flex items-center justify-between hover:bg-[#1d2d25]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isExp ? 'bg-[#d73b00]/20 text-[#ffb5a0]' : 'bg-[#4be277]/20 text-[#4be277]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {tx.categoryIcon || (isExp ? 'restaurant' : 'payments')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-[#d3e7db] truncate">{tx.name}</p>
                    <p className="text-[11px] text-[#bccbb9]">
                      {tx.date}{tx.time ? `, ${tx.time}` : ''} • {tx.paymentMethod.replace(' Wallet', '').replace(' Account', '')}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <p className={`text-[14px] font-semibold ${isExp ? 'text-[#d3e7db]' : 'text-[#4be277]'}`}>
                    {isExp ? '-' : '+'}₱ {formatMoney(tx.amount)}
                  </p>
                  <span className={`text-[11px] ${isExp ? 'text-[#ffb5a0]' : 'text-[#4be277]'}`}>
                    {tx.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
