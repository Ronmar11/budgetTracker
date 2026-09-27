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

/** Id of the section currently in view (home page only), so its link lights up like the app's active tab. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.split('#')[1])).filter((s): s is HTMLElement => !!s);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        }
      },
      // A thin band just under the nav: whichever section crosses it is "current".
      { rootMargin: '-96px 0px -70% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

/** Floating glass pill — the web twin of the app's blurred bottom tab bar. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => active !== null && href.endsWith(`#${active}`);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className={`glass-nav pointer-events-auto mx-auto max-w-5xl rounded-[28px] transition-[background-color,box-shadow] duration-300 ${scrolled || open ? 'is-raised' : ''}`}>
        <nav className="flex h-14 items-center justify-between pr-2 pl-4 sm:pl-5" aria-label="Main">
          <Logo />
          <div className="hidden items-center gap-0.5 rounded-full p-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'location' : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                  isActive(l.href)
                    ? 'bg-primary/12 font-semibold text-primary'
                    : 'font-medium text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface'
                }`}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href="/#download"
              className="ml-1 hidden rounded-full bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-container shadow-sm transition hover:brightness-110 sm:inline-flex">
              Download
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-on-surface/5 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}>
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {open && (
          <div id="mobile-menu" className="border-t border-[var(--glass-border)] px-2 pt-1 pb-2 md:hidden">
            {[...LINKS, { href: '/#download', label: 'Download' }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-3 py-3 text-base transition ${
                  isActive(l.href) ? 'bg-primary/12 font-semibold text-primary' : 'font-medium hover:bg-on-surface/5'
                }`}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
