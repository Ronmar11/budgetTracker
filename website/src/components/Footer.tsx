import { APP_NAME } from '../config';
import { Logo } from './Brand';

export function Footer() {
  return (
    <footer className="border-t border-surface-container-high py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-sm text-on-surface-variant">Private, offline-first money tracking.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-on-surface-variant">
          <a href="/#features" className="hover:text-on-surface">Features</a>
          <a href="/#faq" className="hover:text-on-surface">FAQ</a>
          <a href="/#download" className="hover:text-on-surface">Download</a>
          <a href="/privacy" className="hover:text-on-surface">Privacy Policy</a>
          <a href="/terms" className="hover:text-on-surface">Terms of Service</a>
        </nav>
      </div>
      <p className="mt-8 text-center text-xs text-on-surface-variant">
        © {new Date().getFullYear()} {APP_NAME}. Apple, the Apple logo and App Store are trademarks of Apple Inc. Google Play
        and the Google Play logo are trademarks of Google LLC.
      </p>
    </footer>
  );
}
