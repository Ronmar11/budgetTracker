
import { Backspace, Fingerprint, PieChart, TabGoals, TabHome, TabTransactions, User, Wallet } from './icons';
import { SpendifyMark, SpendifyWordmark } from './Brand';

/*
 * Illustrative recreations of real Spendify screens (sample data), built
 * from the app's design tokens so they follow the site's light/dark theme.
 */

export function Phone({ children, label, className = '' }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative w-[272px] shrink-0 rounded-[46px] border border-surface-container-highest bg-surface-container-highest p-2.5 shadow-phone ${className}`}>
      <div className="relative h-[560px] overflow-hidden rounded-[38px] bg-surface">
        {/* Dynamic-island style notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black/85" aria-hidden="true" />
        <div className="h-full pt-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </figure>
  );
}

function StatusPill({ offline = false }: { offline?: boolean }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-surface-container-high px-2 py-0.5 text-[8px] font-semibold">
      <span className={`h-1.5 w-1.5 rounded-full ${offline ? 'bg-outline' : 'bg-primary'}`} />
      <span className={offline ? 'text-on-surface-variant' : 'text-primary'}>{offline ? 'Offline' : 'Online'}</span>
    </span>
  );
}

function AppBar({ offline }: { offline?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 pb-2">
      <span className="flex items-center gap-1 text-[var(--brand-ink)]">
        <SpendifyMark className="h-5" />
        <SpendifyWordmark className="h-[11px]" />
      </span>
      <StatusPill offline={offline} />
    </div>
  );
}

function TabBar() {
  const tabs = [
    { icon: TabHome, label: 'Home', active: true },
    { icon: TabTransactions, label: 'Transactions' },
    { icon: TabGoals, label: 'Goals' },
    { icon: User, label: 'Profile' },
  ];
  return (
    <div className="absolute inset-x-3 bottom-3 flex h-12 items-center justify-around rounded-full border border-surface-container-highest bg-surface-container shadow-card">
      {tabs.map(({ icon: Icon, label, active }) => (
        <span key={label} className={`flex flex-col items-center gap-0.5 ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
          <Icon className="h-3.5 w-3.5" />
          <span className="text-[7px] font-semibold">{label}</span>
        </span>
      ))}
    </div>
  );
}

const DONUT = [
  { name: 'Food & Drinks', pct: 38, color: 'var(--secondary)' },
  { name: 'Bills', pct: 24, color: 'var(--secondary-container)' },
  { name: 'Transport', pct: 18, color: 'var(--tertiary)' },
  { name: 'Groceries', pct: 20, color: 'var(--primary)' },
];

function Donut({ size = 64 }: { size?: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="-rotate-90">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--surface-container-high)" strokeWidth="14" />
      {DONUT.map((s) => {
        const len = (s.pct / 100) * c;
        const el = <circle key={s.name} cx="60" cy="60" r={r} fill="none" stroke={s.color} strokeWidth="14" strokeDasharray={`${len - 3} ${c}`} strokeDashoffset={-offset} strokeLinecap="round" />;
        offset += len;
        return el;
      })}
    </svg>
  );
}

export function HomeScreenMock() {
  const recent = [
    { name: 'Lunch', meta: 'Today · Cash', amount: '-₱ 185.00', expense: true },
    { name: 'Electric bill', meta: 'Yesterday · Bank', amount: '-₱ 1,420.00', expense: true },
    { name: 'Salary', meta: 'Sep 15 · Bank', amount: '+₱ 18,000.00', expense: false },
  ];
  return (
    <div className="relative h-full">
      <AppBar />
      <div className="space-y-2.5 px-3.5">
        <p className="px-0.5 text-[13px] font-bold tracking-tight">Good morning, Ron 👋</p>

        <div className="relative overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container p-3 shadow-card">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl" />
          <p className="text-[7px] font-semibold uppercase tracking-wider text-on-surface-variant">Total Balance</p>
          <p className="mt-0.5 text-[20px] font-extrabold tracking-tight">₱ 48,250.00</p>
          <span className="mt-1.5 inline-flex rounded-full bg-primary/15 px-2 py-0.5 text-[8px] font-semibold text-primary">↑ +₱ 6,420 this month</span>
          <svg viewBox="0 0 360 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-8 w-full opacity-70">
            <path d="M0 50 C60 44 90 52 140 36 C190 20 230 34 280 18 C310 10 335 14 360 4" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Income', value: '₱ 26,000', tone: 'text-primary', bg: 'bg-primary/15', trend: '+8.4%' },
            { label: 'Spent', value: '₱ 9,580', tone: 'text-secondary', bg: 'bg-secondary-container/20', trend: '-3.1%' },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-surface-container-high bg-surface-container p-2.5">
              <span className={`mb-1 flex h-5 w-5 items-center justify-center rounded-full ${c.bg}`}>
                <Wallet className={`h-2.5 w-2.5 ${c.tone}`} />
              </span>
              <p className="text-[7px] text-on-surface-variant">{c.label} this month</p>
              <p className="text-[11px] font-bold">{c.value}</p>
              <p className={`text-[7px] font-semibold ${c.tone}`}>{c.trend} vs last month</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-surface-container-high bg-surface-container p-2.5">
          <Donut />
          <div className="flex-1 space-y-1">
            {DONUT.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[8px]">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
                <span className="font-bold">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y divide-surface-container-high overflow-hidden rounded-xl border border-surface-container-high bg-surface-container">
          {recent.map((t) => (
            <div key={t.name} className="flex items-center justify-between px-2.5 py-2">
              <div>
                <p className="text-[9px] font-medium">{t.name}</p>
                <p className="text-[7px] text-on-surface-variant">{t.meta}</p>
              </div>
              <p className={`text-[9px] font-semibold ${t.expense ? '' : 'text-primary'}`}>{t.amount}</p>
            </div>
          ))}
        </div>
      </div>
      <TabBar />
    </div>
  );
}

export function UnlockScreenMock() {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <div className="flex h-full flex-col">
      <AppBar offline />
      <div className="px-5 pt-6">
        <p className="text-[17px] font-bold tracking-tight">Welcome back, Ron</p>
        <p className="mt-1 text-[10px] text-on-surface-variant">Enter your MPIN to unlock Spendify.</p>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={`h-2.5 w-2.5 rounded-full border-2 ${i < 4 ? 'border-primary bg-primary' : 'border-outline'}`} />
        ))}
      </div>
      <div className="mx-auto mt-8 grid w-[200px] grid-cols-3 gap-y-3 text-center">
        {keys.map((k) => (
          <span key={k} className="mx-auto flex h-11 w-11 items-center justify-center rounded-full text-[17px] font-medium">
            {k}
          </span>
        ))}
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full text-primary">
          <Fingerprint className="h-5 w-5" />
        </span>
        <span className="mx-auto flex h-11 w-11 items-center justify-center text-[17px] font-medium">0</span>
        <span className="mx-auto flex h-11 w-11 items-center justify-center text-on-surface-variant">
          <Backspace className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-auto mb-6 flex justify-between px-7 text-[9px]">
        <span className="font-semibold text-primary">Forgot PIN?</span>
        <span className="text-on-surface-variant">Switch account</span>
      </div>
    </div>
  );
}

export function ReportsScreenMock() {
  const bars = [
    { m: 'Apr', i: 60, e: 45 },
    { m: 'May', i: 62, e: 58 },
    { m: 'Jun', i: 70, e: 52 },
    { m: 'Jul', i: 66, e: 61 },
    { m: 'Aug', i: 74, e: 49 },
    { m: 'Sep', i: 80, e: 42, now: true },
  ];
  return (
    <div className="h-full">
      <AppBar />
      <div className="space-y-2.5 px-3.5">
        <p className="px-0.5 text-[15px] font-bold tracking-tight">Reports</p>
        <div className="flex items-center justify-between rounded-xl border border-surface-container-high bg-surface-container px-3 py-2 text-[10px] font-bold">
          <span className="text-on-surface-variant">‹</span>September 2026<span className="text-on-surface-variant">›</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { l: 'Income', v: '₱26,000', t: 'text-primary' },
            { l: 'Spent', v: '₱9,580', t: 'text-secondary' },
            { l: 'Net', v: '₱16,420', t: 'text-primary' },
          ].map((s) => (
            <div key={s.l} className="rounded-lg border border-surface-container-high bg-surface-container p-2">
              <p className="text-[6.5px] font-medium uppercase text-on-surface-variant">{s.l}</p>
              <p className={`text-[9.5px] font-bold ${s.t}`}>{s.v}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-surface-container-high bg-surface-container p-3">
          <p className="mb-2 text-[9px] font-bold">Last 6 months</p>
          <div className="flex h-24 items-end justify-between">
            {bars.map((b) => (
              <div key={b.m} className={`flex flex-col items-center gap-1 ${b.now ? '' : 'opacity-50'}`}>
                <div className="flex h-20 items-end gap-0.5">
                  <span className="w-2 rounded-sm bg-primary" style={{ height: `${b.i}%` }} />
                  <span className="w-2 rounded-sm bg-secondary" style={{ height: `${b.e}%` }} />
                </div>
                <span className="text-[7px]">{b.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-surface-container-high bg-surface-container p-3">
          <p className="mb-2 flex items-center gap-1 text-[9px] font-bold">
            <PieChart className="h-3 w-3 text-primary" /> Spending by category
          </p>
          {DONUT.map((s) => (
            <div key={s.name} className="mb-1.5 flex items-center gap-1.5 text-[8px]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
              <span className="flex-1">{s.name}</span>
              <span className="text-on-surface-variant">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
