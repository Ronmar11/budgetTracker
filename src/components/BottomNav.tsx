import React from 'react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: ScreenTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'grid_view' },
    { id: 'transactions', label: 'Transactions', icon: 'receipt_long' },
    { id: 'goals', label: 'Goals', icon: 'ads_click' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe pointer-events-none flex justify-center">
      <div className="px-5 pb-3 pt-1 w-full max-w-sm">
        <div className="pointer-events-auto w-full h-16 px-2 rounded-full bg-[#12231b]/95 backdrop-blur-xl border border-[#273830]/60 shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center min-w-[56px] h-12 rounded-full transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-[#4be277] font-semibold'
                    : 'text-[#bccbb9] hover:text-[#d3e7db]'
                }`}
                type="button"
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className="material-symbols-outlined text-[22px] transition-transform duration-200"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                <span className="text-[11px] leading-[14px] mt-0.5 tracking-wide">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
