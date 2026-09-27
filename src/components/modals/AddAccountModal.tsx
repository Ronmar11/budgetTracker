import React, { useState } from 'react';
import { LinkedAccount } from '../../types';

interface AddAccountModalProps {
  onClose: () => void;
  onAddAccount: (acc: LinkedAccount) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({ onClose, onAddAccount }) => {
  const [name, setName] = useState('BPI Express Online');
  const [accountNumber, setAccountNumber] = useState('5521');
  const [type, setType] = useState<'bank' | 'e-wallet' | 'cash'>('bank');
  const [initialBalance, setInitialBalance] = useState('5000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bal = parseFloat(initialBalance) || 0;
    const newAcc: LinkedAccount = {
      id: `acc-${Date.now()}`,
      name: name.trim(),
      numberMasked: `•••• ${accountNumber.slice(-4)}`,
      type: type,
      balance: bal,
      icon: type === 'bank' ? 'account_balance' : type === 'e-wallet' ? 'credit_card' : 'account_balance_wallet',
      iconBgClass: type === 'bank' ? 'bg-[#273830]' : 'bg-[#1dbcda]/20',
      iconColorClass: type === 'bank' ? 'text-[#bccbb9]' : 'text-[#4dd8f7]',
    };

    onAddAccount(newAcc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md rounded-t-[28px] sm:rounded-2xl bg-[#0e1f17] border border-[#273830] p-5 shadow-2xl flex flex-col">
        <div className="w-12 h-1.5 bg-[#273830] rounded-full mx-auto mb-4 sm:hidden"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#1d2d25]">
          <h3 className="text-[17px] font-bold text-[#d3e7db]">Link New Account</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1d2d25] flex items-center justify-center text-[#bccbb9] hover:text-[#d3e7db]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 my-4">
          <div>
            <label className="text-[12px] text-[#bccbb9] block mb-1">Account Provider / Bank</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#12231b] border border-[#1d2d25] text-[#d3e7db] text-[14px] focus:outline-none focus:border-[#4be277]"
              placeholder="e.g. BPI, UnionBank, GrabPay, SeaBank"
              required
            />
          </div>

          <div>
            <label className="text-[12px] text-[#bccbb9] block mb-1">Account Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['bank', 'e-wallet', 'cash'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`py-2 rounded-xl text-[12px] font-semibold border ${
                    type === t
                      ? 'bg-[#22c55e] text-[#004b1e] border-[#22c55e]'
                      : 'bg-[#12231b] text-[#bccbb9] border-[#1d2d25]'
                  }`}
                >
                  {t === 'bank' ? 'Bank' : t === 'e-wallet' ? 'E-Wallet' : 'Cash'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] text-[#bccbb9] block mb-1">Account Number (Last 4 digits)</label>
            <input
              type="text"
              maxLength={4}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#12231b] border border-[#1d2d25] text-[#d3e7db] text-[14px] focus:outline-none focus:border-[#4be277]"
              placeholder="5521"
              required
            />
          </div>

          <div>
            <label className="text-[12px] text-[#bccbb9] block mb-1">Current Balance</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#4be277] font-bold text-[16px]">₱</span>
              <input
                type="number"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                className="w-full h-11 pl-8 pr-3 rounded-xl bg-[#12231b] border border-[#1d2d25] text-[#d3e7db] text-[15px] font-bold focus:outline-none focus:border-[#4be277]"
                required
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#1d2d25] text-[#bccbb9] text-[14px] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#22c55e] hover:bg-[#4be277] text-[#004b1e] text-[14px] font-bold shadow-lg"
            >
              Link Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
