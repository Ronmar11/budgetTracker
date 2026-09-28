/**
 * Download links come from build-time environment variables (see .env.example),
 * so the site can go live before the store listings exist: any missing link
 * renders as a “Coming soon” button instead of a dead link.
 */
const env = (value: string | undefined) => {
  const v = value?.trim();
  return v ? v : null;
};

export const downloads = {
  ios: {
    appStore: env(import.meta.env.VITE_IOS_APP_STORE_URL),
    testFlight: env(import.meta.env.VITE_IOS_TESTFLIGHT_URL),
  },
  android: {
    playStore: env(import.meta.env.VITE_ANDROID_PLAY_STORE_URL),
    apk: env(import.meta.env.VITE_ANDROID_APK_URL),
    apkSha256: env(import.meta.env.VITE_ANDROID_APK_SHA256),
  },
  version: env(import.meta.env.VITE_APP_VERSION),
} as const;

export const contactEmail = env(import.meta.env.VITE_CONTACT_EMAIL);

/** Jurisdiction named in the Terms of Service (“governed by the laws of …”). */
export const GOVERNING_LAW = env(import.meta.env.VITE_GOVERNING_LAW) ?? 'the Republic of the Philippines';

export const APP_NAME = 'Spendify';
export const BRAND_TAGLINE = 'Track · Save · Grow';
export const BRAND_SLOGAN = 'Small steps. Bigger tomorrow.';
export const PACKAGE_ID = 'com.spendify.app';

export type Platform = 'ios' | 'android' | 'desktop';

/** Best-effort platform guess, used only to put the visitor's store first. */
export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  // iPadOS 13+ reports itself as a Mac; touch support gives it away.
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
  return 'desktop';
}
