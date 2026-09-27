import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

import { QrCode, Smartphone } from './icons';
import { downloads, type Platform } from '../config';
import { BRAND_SLOGAN } from '../config';
import { SpendifyMark } from './Brand';
import { ApkLink, AppStoreBadge, PlayStoreBadge } from './StoreButtons';

/** QR code pointing back at this page, so desktop visitors can continue on their phone. */
function PageQrCode() {
  const [svg, setSvg] = useState<string | null>(null);
  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}#download`;
    QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#06160f', light: '#ffffff' } })
      .then(setSvg)
      .catch(() => setSvg(null));
  }, []);
  if (!svg) return null;
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-surface-container-high bg-surface-container p-6 shadow-card">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <QrCode className="h-4 w-4 text-primary" aria-hidden="true" />
        On a computer? Scan to open on your phone
      </p>
      {/* The QR is white-backed so it stays scannable in dark mode. */}
      <div className="h-40 w-40 rounded-xl bg-white p-2" role="img" aria-label="QR code linking to this download page" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}

function PlatformCard({ title, highlighted, children }: { title: string; highlighted: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`flex flex-col rounded-3xl border bg-surface-container p-7 shadow-card ${highlighted ? 'border-primary ring-2 ring-primary/30' : 'border-surface-container-high'}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        {highlighted && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-container/20 px-2.5 py-1 text-xs font-semibold text-primary">
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" /> Your device
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function DownloadSection({ platform }: { platform: Platform }) {
  const { ios, android, version } = downloads;
  const iosPending = !ios.appStore && !ios.testFlight;
  const androidPending = !android.playStore && !android.apk;

  const iosCard = (
    <PlatformCard key="ios" title="iPhone & iPad" highlighted={platform === 'ios'}>
      <p className="mt-2 text-[15px] text-on-surface-variant">
        {ios.appStore
          ? 'Install from the App Store.'
          : ios.testFlight
            ? 'Join the public beta through Apple’s TestFlight app.'
            : 'The App Store release is on its way.'}
      </p>
      <div className="mt-6">
        <AppStoreBadge />
      </div>
      <ul className="mt-6 space-y-1.5 text-sm text-on-surface-variant">
        <li>• Face ID or Touch ID unlock</li>
        <li>• Optional sync across your phones with Google</li>
      </ul>
    </PlatformCard>
  );

  const androidCard = (
    <PlatformCard key="android" title="Android" highlighted={platform === 'android'}>
      <p className="mt-2 text-[15px] text-on-surface-variant">
        {android.playStore ? 'Install from Google Play.' : android.apk ? 'Download and install the APK directly.' : 'The Google Play release is on its way.'}
      </p>
      <div className="mt-6">
        <PlayStoreBadge />
      </div>
      {android.apk && (
        <div className="mt-5 rounded-2xl bg-surface-container-low p-4 text-sm">
          <ApkLink />
          <p className="mt-2 text-on-surface-variant">
            Installing outside Google Play? Android will ask you to allow installs from your browser the first time.
          </p>
          {android.apkSha256 && (
            <p className="mt-2 break-all font-mono text-xs text-on-surface-variant">
              SHA-256: {android.apkSha256}
            </p>
          )}
        </div>
      )}
      <ul className="mt-6 space-y-1.5 text-sm text-on-surface-variant">
        <li>• Fingerprint or face unlock</li>
        <li>• Tracks cash, e-wallets and bank accounts</li>
      </ul>
    </PlatformCard>
  );

  return (
    <section id="download" aria-labelledby="download-title" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-primary-container/10 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SpendifyMark className="mx-auto h-20" />
          <h2 id="download-title" className="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {BRAND_SLOGAN}
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant">
            Download Spendify for iPhone or Android{version ? ` · version ${version}` : ''}.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">{platform === 'android' ? [androidCard, iosCard] : [iosCard, androidCard]}</div>

        {(iosPending || androidPending) && (
          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Store listings marked “coming soon” will appear here as soon as they’re live.
          </p>
        )}

        {platform === 'desktop' && (
          <div className="mt-12 flex justify-center">
            <PageQrCode />
          </div>
        )}
      </div>
    </section>
  );
}
