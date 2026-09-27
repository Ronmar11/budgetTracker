
import {
  Airplane,
  Check,
  ChevronDown,
  Close,
  CloudOff,
  Fingerprint,
  HardDrive,
  Key,
  Lock,
  ServerOff,
  User,
} from './icons';
import type { Platform } from '../config';
import { HomeScreenMock, Phone, ReportsScreenMock, UnlockScreenMock } from './PhoneMockup';
import { ApkLink, StoreButtons } from './StoreButtons';

function SectionHeading({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg text-pretty text-on-surface-variant">{intro}</p>}
    </div>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────

export function Hero({ platform }: { platform: Platform }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary-container/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
        <div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Your money, tracked privately — <span className="text-primary">even offline.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-on-surface-variant">
            Spendify keeps your transactions, budgets and savings goals on your phone and works with no internet.
            Sign in with Google to back up and sync across your phones — or use a local account that never leaves your
            device.
          </p>
          <StoreButtons platform={platform} className="mt-8" />
          <ApkLink className="mt-4" />
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-surface-variant">
            {['Works in airplane mode', 'Syncs across your phones', 'PIN & biometric lock'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto flex justify-center">
          <Phone label="Spendify dashboard showing total balance, monthly income and spending, a category breakdown and recent transactions" className="rotate-2">
            <HomeScreenMock />
          </Phone>
          <div className="absolute -left-4 bottom-16 hidden items-center gap-2 rounded-2xl border border-surface-container-highest bg-surface-container px-4 py-3 shadow-card sm:flex" aria-hidden="true">
            <Airplane className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">Airplane mode? Still works.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Screens showcase ────────────────────────────────────────────────────────

export function Showcase() {
  return (
    <section aria-labelledby="screens-title" className="overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="screens-title" eyebrow="Inside the app" title="Clear numbers, calm design" />
        <div className="mt-16 flex flex-col items-center justify-center gap-10 md:flex-row md:items-end">
          <Phone label="Unlock screen with a six-digit PIN pad, fingerprint button and an Offline indicator" className="md:-rotate-3">
            <UnlockScreenMock />
          </Phone>
          <Phone label="Dashboard with balance, monthly income and spending, and recent transactions" className="md:-translate-y-8">
            <HomeScreenMock />
          </Phone>
          <Phone label="Reports screen with monthly totals, a six-month income and spending chart, and spending by category" className="md:rotate-3">
            <ReportsScreenMock />
          </Phone>
        </div>
        <p className="mt-8 text-center text-sm text-on-surface-variant">Screens shown with sample data.</p>
      </div>
    </section>
  );
}

// ── Privacy ─────────────────────────────────────────────────────────────────

export function Privacy() {
  const stays = [
    { icon: HardDrive, text: 'Your phone always keeps the full, encrypted copy of your transactions, budgets and goals — so everything works offline' },
    { icon: Key, text: 'Your password and MPIN are never stored as text and never uploaded — only secure hashes in your phone’s keystore' },
    { icon: Lock, text: 'Automatic lock and a lockout after repeated wrong PIN attempts' },
  ];
  const never = [
    'Sell or share your financial data',
    'Ask for your online banking login',
    'Upload anything from a local account, or with Cloud Sync turned off',
    'Include ads or analytics trackers in the app',
  ];
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="border-y border-surface-container-high bg-surface-container-low py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Privacy</p>
          <h2 id="privacy-title" className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Your finances are nobody else’s business.
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant">
            Your phone is always the main copy. Sign in with Google and Cloud Sync backs your data up to your own
            private account, locked so only you can read it. Turn sync off or delete the cloud copy anytime, or use a
            local account to keep everything on your device.
          </p>
          <ul className="mt-8 space-y-4">
            {stays.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-[15px] leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-surface-container-high bg-surface-container p-8 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary-container/15 text-secondary">
              <ServerOff className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold">Spendify will never</h3>
          </div>
          <ul className="mt-6 space-y-3">
            {never.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px]">
                <Close className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <a href="/privacy" className="mt-8 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Read the privacy policy →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── How it works ────────────────────────────────────────────────────────────

export function HowItWorks() {
  const steps = [
    { icon: CloudOff, title: 'Install Spendify', body: 'Get it from the App Store or Google Play — after that, you can go offline for good.' },
    { icon: User, title: 'Sign in your way', body: 'Continue with Google to sync across your phones, or create a local account — no email or internet needed.' },
    { icon: Fingerprint, title: 'Set your PIN & start', body: 'Create a 6-digit PIN, turn on Face ID or fingerprint, and record your first expense.' },
  ];
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="how-title" eyebrow="How it works" title="Up and running in a minute" />
        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="relative rounded-3xl border border-surface-container-high bg-surface-container p-7 shadow-card">
              <span className="absolute right-6 top-5 text-5xl font-extrabold text-surface-container-highest" aria-hidden="true">
                {i + 1}
              </span>
              <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-on-surface-variant">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: 'Do I need an internet connection?', a: 'No. Every feature works offline — recording transactions, budgets, goals, reports, export and backup. You only need a connection to sign in with Google and to sync; changes you make offline upload automatically later.' },
  { q: 'Is my data uploaded anywhere?', a: 'Only if you sign in with Google and keep Cloud Sync on. Then a copy is kept in your private Spendify cloud account so you can use it on other phones — only your account can access it. Local accounts, or Google accounts with Cloud Sync off, keep everything on the phone.' },
  { q: 'Do I need a Google account?', a: 'No. Local accounts work fully offline. Signing in with Google adds automatic backup and sync across your phones, and you can turn sync off any time.' },
  { q: 'What if I use it on two phones while offline?', a: 'Both keep working. When they reconnect, their changes merge automatically; if the same item was edited on both, the most recent edit wins.' },
  { q: 'Does it connect to my bank or e-wallet?', a: 'No — and it never asks for your banking passwords. You record transactions yourself and keep separate balances for cash, e-wallets like GCash and Maya, and bank accounts.' },
  { q: 'What happens if I lose or change my phone?', a: 'With Cloud Sync, just sign in with the same Google account on your new phone and your data comes back. Without it, create a backup from Account → Data & Backup and restore it on the new phone.' },
  { q: 'I forgot my PIN. Can I get back in?', a: 'Yes. Local accounts confirm with their password; Google accounts sign in again with the same Google account. Then you choose a new PIN.' },
  { q: 'Which phones are supported?', a: 'Spendify is available for iPhone and Android phones.' },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-surface-container-high bg-surface-container-low py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-surface-container-high bg-surface-container px-6 py-1 shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-on-surface-variant transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-5 text-[15px] leading-relaxed text-on-surface-variant">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
