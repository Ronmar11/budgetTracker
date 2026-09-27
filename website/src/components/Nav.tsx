import { useEffect, useState } from 'react';

import { Close, Menu } from './icons';
import { Logo } from './Brand';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#privacy', label: 'Privacy' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition ${scrolled || open ? 'border-b border-surface-container-high bg-surface/90 backdrop-blur-lg' : 'border-b border-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant transition hover:text-on-surface">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href="/#download"
            className="ml-1 hidden rounded-full bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-container transition hover:brightness-105 sm:inline-flex">
            Download
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}>
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-surface-container-high px-4 pb-4 md:hidden">
          {[...LINKS, { href: '/#download', label: 'Download' }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-base font-medium">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
