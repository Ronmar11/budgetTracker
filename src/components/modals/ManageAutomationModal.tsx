import React, { useState } from 'react';
import { Goal } from '../../types';

interface ManageAutomationModalProps {
  goals: Goal[];
  onClose: () => void;
}

export const ManageAutomationModal: React.FC<ManageAutomationModalProps> = ({
  goals,
  onClose,
}) => {
  const [amount, setAmount] = useState('4500');
  const [selectedGoalId, setSelectedGoalId] = useState(goals[0]?.id || '');
  const [transferDay, setTransferDay] = useState('1');
  const [isEnabled, setIsEnabled] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md rounded-t-[28px] sm:rounded-2xl bg-[#0e1f17] border border-[#273830] p-5 shadow-2xl flex flex-col">
        <div className="w-12 h-1.5 bg-[#273830] rounded-full mx-auto mb-4 sm:hidden"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#1d2d25]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center text-[#4be277]">
              <span className="material-symbols-outlined text-[22px]">autorenew</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#d3e7db]">Automated Monthly Deposit</h3>
              <p className="text-[12px] text-[#bccbb9]">Set rules for automatic goal funding</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1d2d25] flex items-center justify-center text-[#bccbb9] hover:text-[#d3e7db]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 my-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#12231b] border border-[#1d2d25]">
            <span className="text-[14px] text-[#d3e7db] font-medium">Enable Automatic Transfer</span>
            <button
              type="button"
              onClick={() => setIsEnabled(!isEnabled)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative ${
                isEnabled ? 'bg-[#22c55e]' : 'bg-[#273830]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full shadow-md transition-transform ${
                  isEnabled ? 'bg-[#004b1e] translate-x-6' : 'bg-[#869585] translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div>
            <label className="text-[12px] text-[#bccbb9] block mb-1">Monthly Deposit Amount</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#4be277] font-bold text-[16px]">₱</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-11 pl-8 pr-3 rounded-xl bg-[#12231b] border border-[#1d2d25] text-[#d3e7db] text-[15px] font-bold focus:outline-none focus:border-[#4be277]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] text-[#bccbb9] block mb-1">Transfer Date</label>
            <select
              value={transferDay}
              onChange={(e) => setTransferDay(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#12231b] border border-[#1d2d25] text-[#d3e7db] text-[14px] focus:outline-none focus:border-[#4be277]"
            >
              <option value="1">1st of every month</option>
              <option value="15">15th of every month (Payday)</option>
              <option value="30">End of every month</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] text-[#bccbb9] block mb-1">Target Milestone</label>
            <select
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#12231b] border border-[#1d2d25] text-[#d3e7db] text-[14px] focus:outline-none focus:border-[#4be277]"
            >
              {goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} (₱ {g.currentAmount.toLocaleString()} / ₱ {g.targetAmount.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {savedNotice && (
            <div className="p-3 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#4be277] text-[13px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Automated deposit settings updated successfully!</span>
            </div>
          )}

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
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
