import React, { useState } from 'react';
import { UserProfile, LinkedAccount } from '../../types';

interface AccountScreenProps {
  user: UserProfile;
  accounts: LinkedAccount[];
  totalBalance: number;
  isBalanceHidden: boolean;
  onToggleBalanceHidden: () => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onOpenAddAccount: () => void;
  onOpenFaq: () => void;
  onExportData: () => void;
  onLogout: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  user,
  accounts,
  totalBalance,
  isBalanceHidden,
  onToggleBalanceHidden,
  onUpdateUser,
  onOpenAddAccount,
  onOpenFaq,
  onExportData,
  onLogout,
}) => {
  const [budgetLimitWarnings, setBudgetLimitWarnings] = useState(user.budgetLimitWarnings);
  const [biometricLock, setBiometricLock] = useState(user.biometricLock);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetValue, setBudgetValue] = useState(user.monthlyBudget.toString());

  const formatMoney = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Calculate micro-stats from accounts
  const cashAmount = 2200;
  const eWalletsAmount = accounts
    .filter((a) => a.type === 'e-wallet')
    .reduce((s, a) => s + a.balance, 0) || 8250;
  const banksAmount = accounts
    .filter((a) => a.type === 'bank')
    .reduce((s, a) => s + a.balance, 0) || 2000;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name: editName, email: editEmail });
    setShowEditProfileModal(false);
  };

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(budgetValue);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateUser({ monthlyBudget: parsed });
    }
    setShowBudgetModal(false);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Top App Bar & Profile Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[28px] leading-[34px] font-bold text-[#d3e7db] tracking-tight">
          Account
        </h1>
        <button
          onClick={onOpenFaq}
          aria-label="Settings"
          className="w-10 h-10 rounded-xl bg-[#12231b] hover:bg-[#1d2d25] border border-[#1d2d25] flex items-center justify-center text-[#bccbb9] hover:text-[#d3e7db] transition-colors shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>

      {/* User Profile Card */}
      <section className="bg-[#12231b] border border-[#1d2d25] rounded-2xl p-4 mb-5 shadow-sm flex items-center justify-between relative overflow-hidden">
        {/* Subtle top specular gleam */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#4be277]/20 to-transparent"></div>

        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative shrink-0">
            <img
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover shadow-[0px_8px_24px_-4px_rgba(34,197,94,0.25)] border border-[#22c55e]/30"
              src={user.avatarUrl}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#22c55e] text-[#004b1e] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[12px]">photo_camera</span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-[18px] font-bold text-[#d3e7db] truncate">{user.name}</h2>
            <p className="text-[12px] text-[#869585] truncate mb-1">{user.email}</p>
            <div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#273830] text-[#4be277] text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px] text-[#4be277]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                Pro Member
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowEditProfileModal(true)}
          aria-label="Edit Profile"
          className="w-10 h-10 rounded-xl bg-[#1d2d25] hover:bg-[#273830] text-[#bccbb9] hover:text-[#d3e7db] flex items-center justify-center transition-all shrink-0 active:scale-95 ml-2 border border-[#273830]"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
        </button>
      </section>

      {/* Net Worth & Linked Accounts Summary Card */}
      <section className="bg-[#12231b] border border-[#1d2d25] rounded-2xl p-4 mb-5 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#869585] uppercase tracking-wider font-semibold">
              Total Net Worth
            </span>
            <button
              onClick={onToggleBalanceHidden}
              aria-label="Toggle Net Worth Visibility"
              className="text-[#869585] hover:text-[#d3e7db] transition-colors flex items-center p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isBalanceHidden ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
          <span className="inline-flex items-center gap-0.5 text-[#4be277] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +4.8%
          </span>
        </div>

        <div className="my-1">
          {isBalanceHidden ? (
            <span className="text-[32px] leading-[38px] font-bold text-[#d3e7db] tracking-tight block">
              ₱ ••••••••
            </span>
          ) : (
            <span className="text-[32px] leading-[38px] font-bold text-[#d3e7db] tracking-tight block">
              ₱ {formatMoney(totalBalance)}
            </span>
          )}
        </div>

        {/* Micro-stats Row */}
        <div className="grid grid-cols-3 gap-1 bg-[#02110a] rounded-xl p-2 mt-3 border border-[#1d2d25]/50">
          <div className="flex flex-col items-center justify-center p-1 text-center">
            <span className="text-[11px] text-[#869585]">Cash</span>
            <span className="text-[13px] text-[#d3e7db] font-semibold mt-0.5">
              ₱ {cashAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-1 text-center bg-[#0e1f17] rounded-lg border border-[#1d2d25]/40">
            <span className="text-[11px] text-[#869585]">E-Wallets</span>
            <span className="text-[13px] text-[#4be277] font-semibold mt-0.5">
              ₱ {eWalletsAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-1 text-center">
            <span className="text-[11px] text-[#869585]">Banks</span>
            <span className="text-[13px] text-[#d3e7db] font-semibold mt-0.5">
              ₱ {banksAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Section 1: Linked Wallets & Accounts */}
      <section className="mb-5">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-[18px] font-semibold text-[#d3e7db]">Linked Accounts</h3>
          <button
            onClick={onOpenAddAccount}
            className="text-[12px] text-[#4be277] hover:text-[#6bff8f] flex items-center gap-0.5 font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Account
          </button>
        </div>

        <div className="bg-[#12231b] border border-[#1d2d25] rounded-2xl flex flex-col shadow-sm divide-y divide-[#1d2d25] overflow-hidden">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="flex items-center justify-between p-4 hover:bg-[#1d2d25]/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${acc.iconBgClass} ${acc.iconColorClass}`}
                >
                  <span className="material-symbols-outlined text-[20px]">{acc.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[15px] font-medium text-[#d3e7db] truncate">{acc.name}</span>
                  <span className="text-[11px] text-[#869585] truncate">{acc.numberMasked}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[15px] text-[#d3e7db] font-semibold">
                  ₱ {formatMoney(acc.balance)}
                </span>
                <span className="material-symbols-outlined text-[#869585] text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Financial Preferences */}
      <section className="mb-5">
        <h3 className="text-[11px] uppercase tracking-wider text-[#869585] font-semibold mb-2 px-1">
          Preferences
        </h3>
        <div className="bg-[#12231b] border border-[#1d2d25] rounded-2xl flex flex-col shadow-sm divide-y divide-[#1d2d25] overflow-hidden">
          {/* Monthly Budget */}
          <div
            onClick={() => setShowBudgetModal(true)}
            className="flex items-center justify-between p-4 hover:bg-[#1d2d25]/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1d2d25] text-[#4be277] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">adjust</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-[#d3e7db] font-medium truncate">
                  Monthly Budget
                </span>
                <span className="text-[11px] text-[#869585]">
                  ₱ {formatMoney(user.monthlyBudget)} set
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#869585] text-[18px]">
              chevron_right
            </span>
          </div>

          {/* Primary Currency */}
          <div className="flex items-center justify-between p-4 hover:bg-[#1d2d25]/60 transition-colors cursor-pointer">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1d2d25] text-[#4dd8f7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">language</span>
              </div>
              <span className="text-[14px] text-[#d3e7db] font-medium truncate">
                Primary Currency
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1d2d25] text-[#bccbb9] text-[11px] font-semibold">
                {user.currency}
              </span>
              <span className="material-symbols-outlined text-[#869585] text-[18px]">
                chevron_right
              </span>
            </div>
          </div>

          {/* Limit Warnings */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1d2d25] text-[#ffb5a0] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <span className="text-[14px] text-[#d3e7db] font-medium truncate">
                Budget Limit Warnings
              </span>
            </div>
            <button
              aria-checked={budgetLimitWarnings}
              onClick={() => {
                const next = !budgetLimitWarnings;
                setBudgetLimitWarnings(next);
                onUpdateUser({ budgetLimitWarnings: next });
              }}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none ${
                budgetLimitWarnings ? 'bg-[#22c55e]' : 'bg-[#273830]'
              }`}
              role="switch"
              type="button"
            >
              <div
                className={`w-5 h-5 rounded-full shadow-md transition-transform ${
                  budgetLimitWarnings
                    ? 'bg-[#004b1e] translate-x-6'
                    : 'bg-[#869585] translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Security & Support */}
      <section className="mb-5">
        <h3 className="text-[11px] uppercase tracking-wider text-[#869585] font-semibold mb-2 px-1">
          Security & Support
        </h3>
        <div className="bg-[#12231b] border border-[#1d2d25] rounded-2xl flex flex-col shadow-sm divide-y divide-[#1d2d25] overflow-hidden">
          {/* Biometric Lock */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1d2d25] text-[#4be277] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
              </div>
              <span className="text-[14px] text-[#d3e7db] font-medium truncate">
                Biometric Lock (Face ID)
              </span>
            </div>
            <button
              aria-checked={biometricLock}
              onClick={() => {
                const next = !biometricLock;
                setBiometricLock(next);
                onUpdateUser({ biometricLock: next });
              }}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none ${
                biometricLock ? 'bg-[#22c55e]' : 'bg-[#273830]'
              }`}
              role="switch"
              type="button"
            >
              <div
                className={`w-5 h-5 rounded-full shadow-md transition-transform ${
                  biometricLock
                    ? 'bg-[#004b1e] translate-x-6'
                    : 'bg-[#869585] translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Export Data */}
          <div
            onClick={onExportData}
            className="flex items-center justify-between p-4 hover:bg-[#1d2d25]/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1d2d25] text-[#4dd8f7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">ios_share</span>
              </div>
              <span className="text-[14px] text-[#d3e7db] font-medium truncate">
                Export Data (CSV / PDF)
              </span>
            </div>
            <span className="material-symbols-outlined text-[#869585] text-[18px]">
              chevron_right
            </span>
          </div>

          {/* Help Center */}
          <div
            onClick={onOpenFaq}
            className="flex items-center justify-between p-4 hover:bg-[#1d2d25]/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1d2d25] text-[#bccbb9] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">help_center</span>
              </div>
              <span className="text-[14px] text-[#d3e7db] font-medium truncate">
                Help Center & FAQs
              </span>
            </div>
            <span className="material-symbols-outlined text-[#869585] text-[18px]">
              chevron_right
            </span>
          </div>
        </div>
      </section>

      {/* Danger Zone & Logout Action */}
      <div className="flex flex-col gap-4 mb-6">
        <button
          onClick={onLogout}
          className="w-full py-3.5 px-4 rounded-xl bg-[#d73b00]/15 hover:bg-[#d73b00]/25 text-[#ffb5a0] flex items-center justify-center gap-2 text-[15px] font-semibold transition-all active:scale-[0.99] shadow-sm border border-[#d73b00]/30"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Log Out of Account
        </button>
        <div className="text-center">
          <p className="text-[11px] text-[#869585]">BudgetTrack v2.4.0 (Build 302)</p>
          <p className="text-[11px] text-[#869585]/60 mt-0.5">Encrypted with 256-bit AES</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#12231b] border border-[#273830] p-5 shadow-2xl">
            <h3 className="text-[18px] font-bold text-[#d3e7db] mb-3">Edit Profile</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-[12px] text-[#bccbb9] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-[#1d2d25] border border-[#273830] text-[#d3e7db] text-[14px] focus:outline-none focus:border-[#4be277]"
                  required
                />
              </div>
              <div>
                <label className="text-[12px] text-[#bccbb9] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-[#1d2d25] border border-[#273830] text-[#d3e7db] text-[14px] focus:outline-none focus:border-[#4be277]"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#1d2d25] text-[#bccbb9] text-[13px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#22c55e] text-[#004b1e] text-[13px] font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#12231b] border border-[#273830] p-5 shadow-2xl">
            <h3 className="text-[18px] font-bold text-[#d3e7db] mb-2">Set Monthly Budget</h3>
            <p className="text-[12px] text-[#bccbb9] mb-4">
              Enter your monthly spending allowance to track limit warnings and remaining safe discretionary spend.
            </p>
            <form onSubmit={handleSaveBudget} className="space-y-4">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#4be277] font-bold text-[18px]">₱</span>
                <input
                  type="number"
                  value={budgetValue}
                  onChange={(e) => setBudgetValue(e.target.value)}
                  className="w-full h-12 pl-8 pr-3 rounded-xl bg-[#1d2d25] border border-[#273830] text-[#d3e7db] text-[16px] font-bold focus:outline-none focus:border-[#4be277]"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBudgetModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#1d2d25] text-[#bccbb9] text-[13px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#22c55e] text-[#004b1e] text-[13px] font-bold"
                >
                  Update Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
