import React, { useState } from 'react';
import { Transaction, LinkedAccount } from '../../types';
import { BRAND_LOGO_URL } from '../../data/initialData';

interface AddTransactionModalProps {
  accounts: LinkedAccount[];
  onClose: () => void;
  onAddTransaction: (newTx: Omit<Transaction, 'id'>) => void;
}

const CATEGORY_OPTIONS = [
  { icon: 'restaurant', title: 'Food & Drinks', sub: 'Daily living • 42% monthly cap' },
  { icon: 'directions_car', title: 'Transportation', sub: 'Commute & ride sharing' },
  { icon: 'bolt', title: 'Bills & Utilities', sub: 'Monthly recurring liabilities' },
  { icon: 'shopping_bag', title: 'Shopping', sub: 'Retail & Personal goods' },
  { icon: 'coffee', title: 'Coffee & Snacks', sub: 'Discretionary comfort' },
  { icon: 'medication', title: 'Healthcare', sub: 'Medical & pharmacy' },
  { icon: 'payments', title: 'Salary / Client', sub: 'Primary treasury inflow' },
];

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  accounts,
  onClose,
  onAddTransaction,
}) => {
  const [txType, setTxType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState<number>(0);
  const [catIndex, setCatIndex] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState<string>(accounts[0]?.name || 'Cash Wallet');
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);

  const currentCat = CATEGORY_OPTIONS[catIndex] || CATEGORY_OPTIONS[0];

  const formatAmountString = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleAddAmount = (addVal: number) => {
    setAmount((prev) => prev + addVal);
  };

  const handleClearAmount = () => {
    setAmount(0);
  };

  const handleCycleCategory = () => {
    setCatIndex((prev) => (prev + 1) % CATEGORY_OPTIONS.length);
  };

  const handleAddNoteTag = (tag: string) => {
    if (!note.includes(tag)) {
      setNote((prev) => (prev ? `${prev} ${tag}` : tag));
    }
  };

  const handleSubmit = () => {
    if (amount <= 0) {
      // Gentle feedback
      const inputEl = document.getElementById('amount-input-box');
      if (inputEl) {
        inputEl.classList.add('shake-error');
        setTimeout(() => inputEl.classList.remove('shake-error'), 500);
      }
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      onAddTransaction({
        name: currentCat.title,
        category: currentCat.title,
        categoryIcon: currentCat.icon,
        type: txType,
        amount: amount,
        date: 'Today',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        paymentMethod: selectedAccount,
        note: note.trim() || undefined,
      });

      setIsSaving(false);
      setSaveSuccess(true);

      setTimeout(() => {
        onClose();
      }, 700);
    }, 450);
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
              Add Transaction
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-20 px-5 max-w-lg mx-auto w-full pb-8">
        {/* Glowing Subtle Ambient Backlight */}
        <div className="relative w-full">
          <div
            className={`absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-36 rounded-full blur-[72px] pointer-events-none transition-all duration-500 ${
              txType === 'expense' ? 'bg-[#d73b00]/25' : 'bg-[#22c55e]/25'
            }`}
          ></div>
        </div>

        {/* Segmented Type Selector */}
        <div className="relative z-10 w-full mt-2 mb-5">
          <div className="w-full bg-[#02110a] p-1 rounded-full flex items-center border border-[#1d2d25] shadow-inner">
            <button
              onClick={() => setTxType('expense')}
              className={`flex-1 py-2.5 rounded-full text-[12px] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                txType === 'expense'
                  ? 'bg-[#d73b00] text-[#fffbff] shadow-[0_4px_16px_rgba(215,59,0,0.35)]'
                  : 'text-[#bccbb9] hover:text-[#d3e7db]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">trending_down</span>
              <span>Expense</span>
            </button>
            <button
              onClick={() => setTxType('income')}
              className={`flex-1 py-2.5 rounded-full text-[12px] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                txType === 'income'
                  ? 'bg-[#22c55e] text-[#004b1e] shadow-[0_4px_16px_rgba(34,197,94,0.35)]'
                  : 'text-[#bccbb9] hover:text-[#d3e7db]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>Income</span>
            </button>
          </div>
        </div>

        {/* Hero Amount Input Display */}
        <div className="flex flex-col items-center justify-center py-2 mb-5 relative z-10">
          <span className="text-[11px] text-[#bccbb9] tracking-wider uppercase mb-1 font-semibold">
            Enter Amount
          </span>
          <div
            id="amount-input-box"
            className="inline-flex items-baseline justify-center max-w-full transition-transform"
          >
            <span
              className={`text-[36px] font-bold select-none mr-1.5 transition-colors duration-300 ${
                txType === 'expense' ? 'text-[#ffb5a0]' : 'text-[#4be277]'
              }`}
            >
              ₱
            </span>
            <div className="relative flex items-center">
              <input
                className="bg-transparent text-[36px] font-bold text-[#d3e7db] text-center focus:outline-none w-56 max-w-[65vw] tracking-tight"
                inputMode="decimal"
                value={formatAmountString(amount)}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^0-9.]/g, '');
                  const num = parseFloat(cleaned) || 0;
                  setAmount(num);
                }}
                placeholder="0.00"
                type="text"
              />
              <span className="inline-block w-[2.5px] h-7 bg-[#4be277] ml-0.5 rounded-full animate-pulse pointer-events-none"></span>
            </div>
          </div>

          {/* Quick Increment Presets */}
          <div className="flex items-center justify-center gap-2 mt-4 w-full overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => handleAddAmount(100)}
              className="px-3.5 py-1.5 rounded-full bg-[#1d2d25] hover:bg-[#273830] text-[#bccbb9] text-[12px] font-medium active:scale-95 transition-all border border-[#273830]"
              type="button"
            >
              +₱100
            </button>
            <button
              onClick={() => handleAddAmount(500)}
              className="px-3.5 py-1.5 rounded-full bg-[#1d2d25] hover:bg-[#273830] text-[#bccbb9] text-[12px] font-medium active:scale-95 transition-all border border-[#273830]"
              type="button"
            >
              +₱500
            </button>
            <button
              onClick={() => handleAddAmount(1000)}
              className="px-3.5 py-1.5 rounded-full bg-[#1d2d25] hover:bg-[#273830] text-[#bccbb9] text-[12px] font-medium active:scale-95 transition-all border border-[#273830]"
              type="button"
            >
              +₱1,000
            </button>
            <button
              aria-label="Clear Amount"
              onClick={handleClearAmount}
              className="px-3 py-1.5 rounded-full bg-[#12231b] hover:bg-[#1d2d25] text-[#ffb4ab] text-[12px] active:scale-95 transition-all flex items-center justify-center border border-[#1d2d25]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">backspace</span>
            </button>
          </div>
        </div>

        {/* Interactive Form Cards Stack */}
        <div className="flex flex-col gap-3 w-full relative z-10 mb-6">
          {/* Category Selector Card */}
          <div className="flex flex-col relative">
            <span className="text-[11px] text-[#bccbb9] uppercase tracking-wider pl-1 mb-1 font-semibold">
              Category
            </span>
            <button
              onClick={() => setShowCategoryPicker(!showCategoryPicker)}
              className="w-full bg-[#12231b] hover:bg-[#1d2d25] border border-[#1d2d25] active:scale-[0.99] transition-all p-3.5 rounded-2xl flex items-center justify-between text-left group shadow-sm"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    txType === 'expense'
                      ? 'bg-[#d73b00]/20 text-[#ffb5a0]'
                      : 'bg-[#22c55e]/20 text-[#4be277]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{currentCat.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[15px] font-semibold text-[#d3e7db] truncate">
                    {currentCat.title}
                  </span>
                  <span className="text-[12px] text-[#bccbb9] truncate">{currentCat.sub}</span>
                </div>
              </div>
              <div className="flex items-center text-[#bccbb9] pl-2">
                <span className="material-symbols-outlined text-[20px]">
                  {showCategoryPicker ? 'expand_less' : 'chevron_right'}
                </span>
              </div>
            </button>

            {/* Category Dropdown Picker */}
            {showCategoryPicker && (
              <div className="mt-2 p-2 rounded-2xl bg-[#12231b] border border-[#273830] shadow-xl space-y-1 z-20">
                {CATEGORY_OPTIONS.map((c, i) => (
                  <button
                    key={c.title}
                    type="button"
                    onClick={() => {
                      setCatIndex(i);
                      setShowCategoryPicker(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                      catIndex === i ? 'bg-[#22c55e]/20 text-[#4be277]' : 'hover:bg-[#1d2d25] text-[#d3e7db]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
                    <span className="text-[13px] font-medium">{c.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Selector Card */}
          <div className="flex flex-col">
            <span className="text-[11px] text-[#bccbb9] uppercase tracking-wider pl-1 mb-1 font-semibold">
              Date & Schedule
            </span>
            <div className="w-full bg-[#12231b] border border-[#1d2d25] p-3.5 rounded-2xl flex items-center justify-between text-left shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#273830] flex items-center justify-center text-[#4be277] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#d3e7db]">Today</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#4be277]/10 text-[#4be277] text-[11px] font-semibold">
                      Live
                    </span>
                  </div>
                  <span className="text-[12px] text-[#bccbb9] truncate">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#869585] text-[20px]">
                chevron_right
              </span>
            </div>
          </div>

          {/* Payment Method Selector Card */}
          <div className="flex flex-col relative">
            <span className="text-[11px] text-[#bccbb9] uppercase tracking-wider pl-1 mb-1 font-semibold">
              Payment Method
            </span>
            <button
              onClick={() => setShowAccountPicker(!showAccountPicker)}
              className="w-full bg-[#12231b] hover:bg-[#1d2d25] border border-[#1d2d25] active:scale-[0.99] transition-all p-3.5 rounded-2xl flex items-center justify-between text-left group shadow-sm"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#273830] flex items-center justify-center text-[#4dd8f7] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#d3e7db] truncate">
                      {selectedAccount}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#1d2d25] text-[#bccbb9] text-[11px]">
                      Primary
                    </span>
                  </div>
                  <span className="text-[12px] text-[#bccbb9] truncate">
                    Available: ₱14,850.00
                  </span>
                </div>
              </div>
              <div className="flex items-center text-[#bccbb9] pl-2">
                <span className="material-symbols-outlined text-[20px]">
                  {showAccountPicker ? 'expand_less' : 'chevron_right'}
                </span>
              </div>
            </button>

            {/* Account Dropdown Picker */}
            {showAccountPicker && (
              <div className="mt-2 p-2 rounded-2xl bg-[#12231b] border border-[#273830] shadow-xl space-y-1 z-20">
                {['Cash Wallet', ...accounts.map((a) => a.name)].map((acc) => (
                  <button
                    key={acc}
                    type="button"
                    onClick={() => {
                      setSelectedAccount(acc);
                      setShowAccountPicker(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-colors ${
                      selectedAccount === acc
                        ? 'bg-[#4dd8f7]/20 text-[#4dd8f7] font-semibold'
                        : 'hover:bg-[#1d2d25] text-[#d3e7db]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                    <span className="text-[13px]">{acc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Note Input Field Card */}
          <div className="flex flex-col">
            <span className="text-[11px] text-[#bccbb9] uppercase tracking-wider pl-1 mb-1 font-semibold">
              Note (Optional)
            </span>
            <div className="w-full bg-[#12231b] border border-[#1d2d25] rounded-2xl p-3.5 flex items-start gap-3 shadow-sm focus-within:bg-[#1d2d25] transition-colors">
              <div className="w-11 h-11 rounded-xl bg-[#273830] flex items-center justify-center text-[#bccbb9] shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">edit_note</span>
              </div>
              <div className="flex-1 min-w-0">
                <input
                  className="w-full bg-transparent text-[14px] text-[#d3e7db] placeholder:text-[#869585] focus:outline-none py-1"
                  placeholder="Add note, receipt tag or merchant..."
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                {/* Quick Suggestion Tags */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {['#Dinner', '#CoffeeBreak', '#Groceries', '#Taxi'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddNoteTag(tag)}
                      className="px-2.5 py-0.5 rounded-full bg-[#1d2d25] text-[#bccbb9] text-[11px] hover:text-[#d3e7db] border border-[#273830] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="w-full mt-auto pt-2 flex flex-col items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={isSaving || saveSuccess}
            className={`w-full h-[52px] rounded-2xl font-bold text-[18px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg ${
              txType === 'expense'
                ? 'bg-[#d73b00] hover:bg-[#ff5722] text-[#fffbff] shadow-[0_8px_24px_rgba(215,59,0,0.35)]'
                : 'bg-[#22c55e] hover:bg-[#4be277] text-[#004b1e] shadow-[0_8px_24px_rgba(34,197,94,0.35)]'
            }`}
            type="button"
          >
            {isSaving ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[22px]">progress_activity</span>
                <span>Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <span className="material-symbols-outlined text-[22px]">check_circle</span>
                <span>Recorded!</span>
              </>
            ) : (
              <>
                <span>Save Transaction</span>
                <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setAmount(0);
              setNote('');
              setCatIndex(0);
            }}
            className="py-2 text-[#bccbb9] hover:text-[#d3e7db] text-[13px] transition-colors"
            type="button"
          >
            Clear All Fields
          </button>
        </div>
      </main>
    </div>
  );
};
