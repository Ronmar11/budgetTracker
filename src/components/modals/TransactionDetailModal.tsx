import React from 'react';
import { Transaction } from '../../types';

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
  onDeleteTransaction: (id: string) => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  onDeleteTransaction,
}) => {
  const isExp = transaction.type === 'expense';

  const formatMoney = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md rounded-t-[28px] sm:rounded-2xl bg-[#0e1f17] border border-[#273830] p-5 shadow-2xl flex flex-col">
        <div className="w-12 h-1.5 bg-[#273830] rounded-full mx-auto mb-4 sm:hidden"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1d2d25]">
          <h3 className="text-[17px] font-bold text-[#d3e7db]">Transaction Receipt</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1d2d25] flex items-center justify-center text-[#bccbb9] hover:text-[#d3e7db]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Hero Amount */}
        <div className="flex flex-col items-center justify-center py-5">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 ${
              isExp ? 'bg-[#d73b00]/20 text-[#ffb5a0]' : 'bg-[#4be277]/20 text-[#4be277]'
            }`}
          >
            <span className="material-symbols-outlined text-[32px]">
              {transaction.categoryIcon || (isExp ? 'restaurant' : 'payments')}
            </span>
          </div>
          <span className="text-[18px] font-bold text-[#d3e7db]">{transaction.name}</span>
          <span
            className={`text-[28px] font-extrabold tracking-tight mt-1 ${
              isExp ? 'text-[#ffb5a0]' : 'text-[#4be277]'
            }`}
          >
            {isExp ? '-' : '+'} ₱ {formatMoney(transaction.amount)}
          </span>
          <span className="text-[12px] text-[#bccbb9] mt-0.5">
            {transaction.type === 'expense' ? 'Debit payment' : 'Credit deposit'}
          </span>
        </div>

        {/* Details List */}
        <div className="rounded-2xl bg-[#12231b] border border-[#1d2d25] p-3.5 space-y-3 mb-4 text-[13px]">
          <div className="flex justify-between items-center">
            <span className="text-[#bccbb9]">Category</span>
            <span className="text-[#d3e7db] font-medium">{transaction.category}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#bccbb9]">Date & Time</span>
            <span className="text-[#d3e7db] font-medium">
              {transaction.date} {transaction.time ? `• ${transaction.time}` : ''}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#bccbb9]">Payment Source</span>
            <span className="text-[#4dd8f7] font-medium">{transaction.paymentMethod}</span>
          </div>
          {transaction.note && (
            <div className="flex justify-between items-center pt-2 border-t border-[#1d2d25]">
              <span className="text-[#bccbb9]">Note</span>
              <span className="text-[#d3e7db] font-medium italic">{transaction.note}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-[#1d2d25]">
            <span className="text-[#bccbb9]">Reference ID</span>
            <span className="text-[#869585] font-mono text-[11px]">{transaction.id}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              onDeleteTransaction(transaction.id);
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-[#d73b00]/15 hover:bg-[#d73b00]/25 text-[#ffb4ab] text-[13px] font-semibold border border-[#d73b00]/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            Delete Entry
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#1d2d25] hover:bg-[#273830] text-[#d3e7db] text-[13px] font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
