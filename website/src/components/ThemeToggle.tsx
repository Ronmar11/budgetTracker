import { useEffect, useState } from 'react';

import { ThemeDark, ThemeLight, ThemeSystem } from './icons';

type Theme = 'system' | 'light' | 'dark';
const KEY = 'bt-theme';
const ORDER: Theme[] = ['system', 'light', 'dark'];

const read = (): Theme => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
};

/** Cycles System → Light → Dark. The inline script in index.html applies the saved choice before first paint. */
export function ThemeToggle() {
  // Pre-rendered as 'system'; the saved choice is read once the page loads (the inline script in the HTML already applied it).
  const [theme, setTheme] = useState<Theme>('system');
  useEffect(() => setTheme(read()), []);

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    setTheme(next);
    if (next === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', next);
    try {
      if (next === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this visit only.
    }
  };

  const Icon = theme === 'light' ? ThemeLight : theme === 'dark' ? ThemeDark : ThemeSystem;
  const label = theme === 'system' ? 'Theme: match system' : `Theme: ${theme}`;
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${label}. Change theme`}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface">
      <Icon className="h-5 w-5" />
    </button>
  );
}
