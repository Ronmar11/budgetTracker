import React from 'react';
import { BRAND_LOGO_URL } from '../data/initialData';
import { ScreenTab } from '../types';

interface HeaderProps {
  currentTab: ScreenTab;
  onOpenNewGoal?: () => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenNewGoal,
  onOpenSettings,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#06160f]/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.4)] pt-safe">
      <div className="h-16 px-5 flex items-center justify-between max-w-lg mx-auto w-full">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <img
            alt="BudgetTrack Leaf Emblem"
            className="h-8 w-auto object-contain"
            src={BRAND_LOGO_URL}
            onError={(e) => {
              // Fallback to SVG leaf if network image fails
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
              if (fallback) (fallback as HTMLElement).style.display = 'flex';
            }}
          />
          <div className="logo-fallback hidden w-8 h-8 rounded-lg bg-[#22c55e]/20 items-center justify-center text-[#4be277]">
            <span className="material-symbols-outlined text-[20px]">eco</span>
          </div>
          <div className="flex items-baseline tracking-tight">
            <span className="text-[18px] font-bold text-[#d3e7db]">Budget</span>
            <span className="text-[18px] font-bold text-[#4be277]">Track</span>
          </div>
        </div>

        {/* Right Action based on screen */}
        <div className="flex items-center gap-2">
          {currentTab === 'goals' && onOpenNewGoal && (
            <button
              onClick={onOpenNewGoal}
              className="flex items-center gap-1.5 h-10 px-3.5 rounded-full bg-[#1d2d25] hover:bg-[#273830] text-[#d3e7db] text-[12px] font-semibold tracking-wide shadow-sm active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[#4be277] text-[18px]">add</span>
              <span>New Goal</span>
            </button>
          )}

          {currentTab === 'profile' && onOpenSettings && (
            <button
              onClick={onOpenSettings}
              aria-label="Settings"
              className="w-10 h-10 rounded-xl bg-[#12231b] hover:bg-[#1d2d25] flex items-center justify-center text-[#bccbb9] hover:text-[#d3e7db] transition-colors shadow-sm active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </button>
          )}

          {currentTab === 'transactions' && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1d2d25]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4be277] animate-pulse"></span>
              <span className="text-[11px] text-[#4be277] font-semibold">Live Sync</span>
            </div>
          )}

          {currentTab === 'home' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] bg-[#1d2d25] text-[#4be277] font-medium">
              Nov 2024
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
