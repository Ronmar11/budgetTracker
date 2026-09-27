import React from 'react';

interface FaqModalProps {
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ onClose }) => {
  const faqs = [
    {
      q: 'How does BudgetTrack safeguard my financial records?',
      a: 'All data is client-encrypted using 256-bit AES standards with zero cloud tracking of raw credentials. Biometric lock (Face ID) adds hardware-level protection on supported devices.',
    },
    {
      q: 'How do automated micro-deposits work?',
      a: 'BudgetTrack rounds up purchases to the nearest hundred pesos and automatically credits the spare change towards your highest priority financial goal.',
    },
    {
      q: 'Can I export my transactions for tax or Excel tracking?',
      a: 'Yes, you can export your records directly to CSV or print a formatted PDF summary at any time from the Account screen.',
    },
    {
      q: 'How is Net Worth calculated?',
      a: 'Net Worth is the aggregated sum of all linked Cash, E-Wallets (GCash, Maya), and Bank Accounts minus any recorded liabilities.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md rounded-t-[28px] sm:rounded-2xl bg-[#0e1f17] border border-[#273830] p-5 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-[#273830] rounded-full mx-auto mb-4 sm:hidden"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#1d2d25]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#273830] flex items-center justify-center text-[#bccbb9]">
              <span className="material-symbols-outlined text-[22px]">help_center</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#d3e7db]">Help Center & FAQs</h3>
              <p className="text-[12px] text-[#bccbb9]">Knowledge base & app guidance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1d2d25] flex items-center justify-center text-[#bccbb9] hover:text-[#d3e7db]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="my-4 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#12231b] border border-[#1d2d25]">
              <h4 className="text-[14px] font-semibold text-[#d3e7db] mb-1">{f.q}</h4>
              <p className="text-[12px] leading-[18px] text-[#bccbb9]">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#1d2d25] text-center">
          <p className="text-[11px] text-[#869585]">BudgetTrack v2.4.0 (Build 302)</p>
          <p className="text-[11px] text-[#869585]/60 mt-0.5">Encrypted with 256-bit AES</p>
        </div>
      </div>
    </div>
  );
};
