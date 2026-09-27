import React, { useState, useMemo } from 'react';
import { Transaction } from '../../types';

interface TransactionsScreenProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
  onOpenAddTransaction: () => void;
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  transactions,
  onSelectTransaction,
  onOpenAddTransaction,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const formatMoney = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Compute Net Monthly Flow
  const netMonthlyFlow = useMemo(() => {
    const inc = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const exp = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return inc - exp;
  }, [transactions]);

  // Unique categories for the tune filter
  const categories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category));
    return ['all', ...Array.from(set)];
  }, [transactions]);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = filterType === 'all' || tx.type === filterType;
      const matchesCategory = selectedCategory === 'all' || tx.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        tx.name.toLowerCase().includes(query) ||
        tx.category.toLowerCase().includes(query) ||
        (tx.note && tx.note.toLowerCase().includes(query));

      return matchesType && matchesCategory && matchesQuery;
    });
  }, [transactions, filterType, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Header Section */}
      <section className="mt-2 mb-4 flex flex-col">
        <h1 className="text-[28px] leading-[34px] font-bold text-[#d3e7db] tracking-tight">
          Transactions
        </h1>
        <p className="text-[14px] leading-[20px] text-[#bccbb9] mt-0.5">
          Track your spending and stay in control.
        </p>
      </section>

      {/* Financial Momentum Snapshot */}
      <section className="mb-4 p-4 rounded-2xl bg-[#12231b] border border-[#1d2d25] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1d2d25] flex items-center justify-center text-[#4be277]">
            <span className="material-symbols-outlined text-[22px]">trending_up</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#bccbb9] uppercase font-medium">Net Monthly Flow</span>
            <span className="text-[16px] font-bold text-[#4be277] tracking-tight">
              {netMonthlyFlow >= 0 ? '+' : '-'} ₱ {formatMoney(Math.abs(netMonthlyFlow))}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-[#bccbb9] uppercase font-medium">Discretionary</span>
          <p className="text-[14px] font-semibold text-[#d3e7db]">68% safe</p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="flex items-center gap-2 mb-4 relative">
        <label className="flex-1 relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#bccbb9] text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-12 pl-10 pr-9 rounded-xl bg-[#12231b] border border-[#1d2d25] text-[#d3e7db] placeholder:text-[#869585] text-[14px] focus:outline-none focus:bg-[#1d2d25] focus:border-[#4be277]/50 transition-colors"
            placeholder="Search transactions..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#bccbb9] hover:text-[#d3e7db] p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </label>
        <button
          aria-label="Open filter options"
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${
            selectedCategory !== 'all' || showCategoryMenu
              ? 'bg-[#4be277]/20 border-[#4be277] text-[#4be277]'
              : 'bg-[#12231b] border-[#1d2d25] text-[#d3e7db] hover:bg-[#1d2d25]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>

        {/* Category Dropdown Modal */}
        {showCategoryMenu && (
          <div className="absolute right-0 top-14 z-30 w-56 rounded-2xl bg-[#12231b] border border-[#273830] p-2 shadow-2xl">
            <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-[#1d2d25]">
              <span className="text-[11px] font-semibold uppercase text-[#bccbb9]">Filter Category</span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-[11px] text-[#4be277] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="max-h-56 overflow-y-auto space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCategoryMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#4be277]/15 text-[#4be277] font-semibold'
                      : 'text-[#d3e7db] hover:bg-[#1d2d25]'
                  }`}
                >
                  <span>{cat === 'all' ? 'All Categories' : cat}</span>
                  {selectedCategory === cat && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Segmented Filter Tabs */}
      <section aria-label="Transaction Categories" className="mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilterType('all')}
          className={`text-[12px] px-4 py-2 rounded-full transition-all duration-150 font-medium ${
            filterType === 'all'
              ? 'bg-[#4be277] text-[#003915] font-bold shadow-[0px_4px_16px_rgba(75,226,119,0.25)]'
              : 'bg-[#12231b] text-[#bccbb9] hover:text-[#d3e7db] border border-[#1d2d25]'
          }`}
          type="button"
        >
          All ({transactions.length})
        </button>
        <button
          onClick={() => setFilterType('income')}
          className={`text-[12px] px-4 py-2 rounded-full transition-all duration-150 font-medium ${
            filterType === 'income'
              ? 'bg-[#4be277] text-[#003915] font-bold shadow-[0px_4px_16px_rgba(75,226,119,0.25)]'
              : 'bg-[#12231b] text-[#bccbb9] hover:text-[#d3e7db] border border-[#1d2d25]'
          }`}
          type="button"
        >
          Income
        </button>
        <button
          onClick={() => setFilterType('expense')}
          className={`text-[12px] px-4 py-2 rounded-full transition-all duration-150 font-medium ${
            filterType === 'expense'
              ? 'bg-[#d73b00] text-[#fffbff] font-bold shadow-[0px_4px_16px_rgba(215,59,0,0.3)]'
              : 'bg-[#12231b] text-[#bccbb9] hover:text-[#d3e7db] border border-[#1d2d25]'
          }`}
          type="button"
        >
          Expenses
        </button>
      </section>

      {/* Transaction List */}
      <section aria-label="Transaction History" className="flex flex-col gap-2.5">
        {filteredTransactions.map((tx) => {
          const isExp = tx.type === 'expense';
          return (
            <article
              key={tx.id}
              onClick={() => onSelectTransaction(tx)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#12231b] border border-[#1d2d25] hover:bg-[#1d2d25] transition-colors cursor-pointer active:scale-[0.99] group shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${
                    isExp ? 'bg-[#d73b00]/20 text-[#ffb5a0]' : 'bg-[#4be277]/20 text-[#4be277]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={!isExp ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {tx.categoryIcon || (isExp ? 'restaurant' : 'account_balance_wallet')}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[15px] font-semibold text-[#d3e7db] truncate">{tx.name}</span>
                  <span className="text-[11px] text-[#bccbb9] truncate">
                    {tx.category} • {tx.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 pl-2">
                <span
                  className={`text-[15px] font-semibold tabular-nums ${
                    isExp ? 'text-[#ffb5a0]' : 'text-[#4be277]'
                  }`}
                >
                  {isExp ? '-' : '+'} ₱ {formatMoney(tx.amount)}
                </span>
                <span className="material-symbols-outlined text-[#869585] text-[18px] group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </div>
            </article>
          );
        })}

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl bg-[#12231b] border border-[#1d2d25]">
            <div className="w-12 h-12 rounded-full bg-[#1d2d25] flex items-center justify-center text-[#bccbb9] mb-2">
              <span className="material-symbols-outlined text-[24px]">search_off</span>
            </div>
            <h3 className="text-[16px] font-semibold text-[#d3e7db]">No matching records</h3>
            <p className="text-[13px] text-[#bccbb9] max-w-xs mt-1">
              Try another search keyword or switch between income and expense filters.
            </p>
          </div>
        )}
      </section>

      {/* Add Quick Transaction Card */}
      <button
        onClick={onOpenAddTransaction}
        className="w-full mt-4 p-4 rounded-2xl bg-[#1d2d25] hover:bg-[#273830] border border-[#273830] flex items-center justify-between text-left transition-all active:scale-[0.99] group shadow-[0px_8px_24px_-4px_rgba(34,197,94,0.12)]"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#4be277]/20 flex items-center justify-center text-[#4be277] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">add</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-[#d3e7db]">Add a transaction</span>
            <span className="text-[11px] text-[#bccbb9]">Keep your records up to date.</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#12231b] flex items-center justify-center text-[#4be277]">
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </div>
      </button>
    </div>
  );
};
