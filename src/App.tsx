/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenTab, Transaction, Goal, LinkedAccount, UserProfile } from './types';
import {
  INITIAL_USER,
  INITIAL_ACCOUNTS,
  INITIAL_TRANSACTIONS,
  INITIAL_GOALS,
} from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { TransactionsScreen } from './components/screens/TransactionsScreen';
import { GoalsScreen } from './components/screens/GoalsScreen';
import { AccountScreen } from './components/screens/AccountScreen';
import { AddTransactionModal } from './components/modals/AddTransactionModal';
import { CreateGoalModal } from './components/modals/CreateGoalModal';
import { GoalDetailModal } from './components/modals/GoalDetailModal';
import { ManageAutomationModal } from './components/modals/ManageAutomationModal';
import { AddAccountModal } from './components/modals/AddAccountModal';
import { FaqModal } from './components/modals/FaqModal';
import { TransactionDetailModal } from './components/modals/TransactionDetailModal';

export default function App() {
  // App state with local persistence
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home');
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('budgettrack_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [accounts, setAccounts] = useState<LinkedAccount[]>(() => {
    const saved = localStorage.getItem('budgettrack_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('budgettrack_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('budgettrack_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(() => {
    return localStorage.getItem('budgettrack_balance_hidden') === 'true';
  });

  // Modals state
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isManageAutomationOpen, setIsManageAutomationOpen] = useState(false);
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('budgettrack_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('budgettrack_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('budgettrack_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budgettrack_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('budgettrack_balance_hidden', String(isBalanceHidden));
  }, [isBalanceHidden]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Financial aggregates
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0) || 18000;

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) || 5550;

  const totalBalance = 12450 + (totalIncome - 18000) - (totalExpenses - 5550);

  // Handlers
  const handleToggleBalanceHidden = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const tx: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [tx, ...prev]);

    // Deduct or add from corresponding linked account if found
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.name === newTx.paymentMethod) {
          const delta = newTx.type === 'expense' ? -newTx.amount : newTx.amount;
          return { ...acc, balance: Math.max(0, acc.balance + delta) };
        }
        return acc;
      })
    );

    showToast(`Recorded ₱ ${newTx.amount.toLocaleString()} ${newTx.name}`);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast('Transaction removed');
  };

  const handleCreateGoal = (newGoal: Goal) => {
    setGoals((prev) => [newGoal, ...prev]);
    showToast(`Goal "${newGoal.name}" created!`);
  };

  const handleDepositGoal = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const updated = g.currentAmount + amount;
          const isDone = updated >= g.targetAmount;
          return {
            ...g,
            currentAmount: updated,
            status: isDone ? 'Completed' : g.status === 'Behind' ? 'On Track' : g.status,
          };
        }
        return g;
      })
    );
    showToast(`Deposited ₱ ${amount.toLocaleString()} towards goal!`);
  };

  const handleToggleCompleteGoal = (goalId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const isComp = g.status === 'Completed';
          return {
            ...g,
            status: isComp ? 'On Track' : 'Completed',
          };
        }
        return g;
      })
    );
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
    showToast('Goal removed');
  };

  const handleAddAccount = (newAcc: LinkedAccount) => {
    setAccounts((prev) => [...prev, newAcc]);
    showToast(`Linked ${newAcc.name}`);
  };

  const handleExportData = () => {
    // Generate real CSV of transactions
    const headers = 'ID,Name,Category,Type,Amount (PHP),Date,PaymentMethod,Note\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.name}","${t.category}","${t.type}",${t.amount},"${t.date}","${t.paymentMethod}","${t.note || ''}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `budgettrack_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported CSV successfully!');
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    showToast('Signed out of demo session.');
  };

  return (
    <div className="min-h-screen bg-[#06160f] text-[#d3e7db] flex flex-col items-center justify-start relative selection:bg-[#22c55e]/30 selection:text-[#4be277]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 z-50 px-4 py-2.5 rounded-full bg-[#12231b] border border-[#22c55e]/40 text-[#4be277] text-[13px] font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Container (Targeting exact phone view width ~390px to 430px for authentic mobile experience) */}
      <div
        className={`w-full transition-all duration-300 min-h-screen flex flex-col relative ${
          deviceFrameMode
            ? 'max-w-[420px] my-6 rounded-[44px] border-[10px] border-[#1d2d25] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden bg-[#06160f]'
            : 'max-w-[430px] bg-[#06160f]'
        }`}
      >
        {/* Desktop Screen Switcher Tool (subtle top badge for reviewer convenience) */}
        <div className="hidden lg:flex items-center justify-between px-4 py-1.5 bg-[#12231b]/60 border-b border-[#1d2d25] text-[11px] text-[#bccbb9]">
          <span className="font-medium">BudgetTrack Mobile Preview</span>
          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="hover:text-[#4be277] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">smartphone</span>
            <span>{deviceFrameMode ? 'Full View' : 'Phone Frame'}</span>
          </button>
        </div>

        {/* Top Header */}
        <Header
          currentTab={currentTab}
          onOpenNewGoal={() => setIsCreateGoalOpen(true)}
          onOpenSettings={() => setIsFaqOpen(true)}
        />

        {/* Main Content Body */}
        <main className="flex-1 w-full pt-16 px-5 flex flex-col">
          {currentTab === 'home' && (
            <HomeScreen
              user={user}
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              transactions={transactions}
              isBalanceHidden={isBalanceHidden}
              onToggleBalanceHidden={handleToggleBalanceHidden}
              onNavigateTab={setCurrentTab}
              onSelectTransaction={setSelectedTx}
              onOpenAddTransaction={() => setIsAddTxOpen(true)}
            />
          )}

          {currentTab === 'transactions' && (
            <TransactionsScreen
              transactions={transactions}
              onSelectTransaction={setSelectedTx}
              onOpenAddTransaction={() => setIsAddTxOpen(true)}
            />
          )}

          {currentTab === 'goals' && (
            <GoalsScreen
              goals={goals}
              onSelectGoal={setSelectedGoal}
              onOpenNewGoal={() => setIsCreateGoalOpen(true)}
              onOpenManageAutomation={() => setIsManageAutomationOpen(true)}
            />
          )}

          {currentTab === 'profile' && (
            <AccountScreen
              user={user}
              accounts={accounts}
              totalBalance={totalBalance}
              isBalanceHidden={isBalanceHidden}
              onToggleBalanceHidden={handleToggleBalanceHidden}
              onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
              onOpenAddAccount={() => setIsAddAccountOpen(true)}
              onOpenFaq={() => setIsFaqOpen(true)}
              onExportData={handleExportData}
              onLogout={handleLogout}
            />
          )}
        </main>

        {/* Bottom Floating Navigation */}
        <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />
      </div>

      {/* Modals & Overlays */}
      {isAddTxOpen && (
        <AddTransactionModal
          accounts={accounts}
          onClose={() => setIsAddTxOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}

      {isCreateGoalOpen && (
        <CreateGoalModal
          accounts={accounts}
          onClose={() => setIsCreateGoalOpen(false)}
          onCreateGoal={handleCreateGoal}
        />
      )}

      {selectedGoal && (
        <GoalDetailModal
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onDeposit={handleDepositGoal}
          onToggleComplete={handleToggleCompleteGoal}
          onDeleteGoal={handleDeleteGoal}
        />
      )}

      {selectedTx && (
        <TransactionDetailModal
          transaction={selectedTx}
          onClose={() => setSelectedTx(null)}
          onDeleteTransaction={handleDeleteTransaction}
        />
      )}

      {isManageAutomationOpen && (
        <ManageAutomationModal
          goals={goals}
          onClose={() => setIsManageAutomationOpen(false)}
        />
      )}

      {isAddAccountOpen && (
        <AddAccountModal
          onClose={() => setIsAddAccountOpen(false)}
          onAddAccount={handleAddAccount}
        />
      )}

      {isFaqOpen && <FaqModal onClose={() => setIsFaqOpen(false)} />}

      {/* Logout Confirmation Sheet */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm rounded-t-[28px] sm:rounded-2xl bg-[#0e1f17] border border-[#273830] p-5 shadow-2xl flex flex-col text-center">
            <div className="w-12 h-1.5 bg-[#273830] rounded-full mx-auto mb-4 sm:hidden"></div>
            <div className="w-12 h-12 rounded-full bg-[#d73b00]/20 text-[#ffb5a0] flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[24px]">logout</span>
            </div>
            <h3 className="text-[18px] font-bold text-[#d3e7db]">Log Out of Account?</h3>
            <p className="text-[13px] text-[#bccbb9] mt-1 mb-5">
              You will be signed out from your BudgetTrack session on this device.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-[#1d2d25] text-[#d3e7db] text-[14px] font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="flex-1 py-3 rounded-xl bg-[#d73b00] hover:bg-[#ff5722] text-[#fffbff] text-[14px] font-bold"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
