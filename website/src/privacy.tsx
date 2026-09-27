import './styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { APP_NAME, contactEmail } from './config';

const EFFECTIVE_DATE = 'September 28, 2026';

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 text-2xl font-bold tracking-tight">{children}</h2>;
}

/**
 * Privacy policy for the mobile app and this website. It describes the app's
 * actual behaviour (offline-first, optional Supabase cloud sync) — update it
 * whenever the app's data handling changes.
 */
function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Legal</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-on-surface-variant">Effective {EFFECTIVE_DATE}</p>

        <div className="mt-10 space-y-5 text-[16px] leading-relaxed text-on-surface-variant [&_strong]:text-on-surface [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          <p>
            {APP_NAME} is a budget tracking app for iPhone and Android. It keeps your financial information on your phone
            and works fully offline. If you sign in with Google, it can also back up and sync your data through your own
            private cloud account. This policy explains what is stored, where, and the choices you have.
          </p>

          <H2>The short version</H2>
          <ul>
            <li>Your financial data is always stored <strong>on your device</strong>, and the app works without internet.</li>
            <li>
              If you sign in with Google, <strong>Cloud Sync</strong> keeps a copy in your private cloud account so you can
              use it on other phones. It’s on by default for Google accounts and you can <strong>turn it off</strong> or
              <strong> delete the cloud copy</strong> at any time.
            </li>
            <li>Local accounts (created without Google) never upload anything.</li>
            <li>We do not collect analytics, show ads, or sell or share personal information.</li>
          </ul>

          <H2>Information stored on your device</H2>
          <ul>
            <li>
              <strong>Your profile:</strong> your username, display name and (optionally) email address. For Google
              accounts, also your Google email, name, profile picture link and account identifiers.
            </li>
            <li>
              <strong>Your financial records:</strong> transactions, categories, account balances you enter, budgets,
              savings goals and app settings — kept in a database that is encrypted with a key held in your device’s secure
              keystore.
            </li>
            <li>
              <strong>Security data:</strong> your password and MPIN are never stored as text — only as salted, one-way
              hashes in your device’s secure keystore (iOS Keychain / Android Keystore). They are <strong>never uploaded</strong>.
            </li>
          </ul>

          <H2>Cloud Sync (Google accounts)</H2>
          <p>
            When you sign in with Google and Cloud Sync is on, the app uploads your <strong>financial records</strong> —
            transactions, categories, accounts, budgets, savings goals and per-account settings — to a database hosted
            by our infrastructure provider, <strong>Supabase</strong>, and downloads changes you make on your other phones.
          </p>
          <ul>
            <li>
              <strong>Who can access it:</strong> each record is tied to your account and protected by row-level security,
              so only your signed-in account can read or change it. Data is sent over encrypted (HTTPS) connections.
            </li>
            <li>
              <strong>What is not uploaded:</strong> your password, MPIN, biometric settings, the on-device database key,
              and the theme and auto-lock preferences of each phone.
            </li>
            <li>
              <strong>Your controls:</strong> turn Cloud Sync off in Account → Cloud Sync (data then stays on the phone
              only), or use <strong>Delete cloud copy</strong> to remove your synced records from the cloud. Deleting your
              local account also deletes the cloud copy unless you choose to keep it.
            </li>
            <li>
              <strong>Retention:</strong> your cloud copy is kept until you delete it. Deleting it removes your financial
              records; to also remove your sign-in record, contact us (below).
            </li>
          </ul>

          <H2>Google sign-in</H2>
          <p>
            If you choose “Continue with Google”, Google authenticates you and returns an identity token. The app sends
            that token to our sign-in service (Supabase Auth), which verifies it with Google and creates or finds your
            account using your Google email, name, profile picture and account identifier. The app requests only your
            basic profile and email, and never sends your financial data to Google. Google’s handling of the sign-in is
            covered by the{' '}
            <a className="text-primary underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
            .
          </p>

          <H2>Biometrics</H2>
          <p>
            Face ID, Touch ID and fingerprint unlock are handled entirely by your phone’s operating system. The app only
            receives a success or failure result and never has access to your biometric data.
          </p>

          <H2>Exports and backups</H2>
          <p>
            You can export transactions to a CSV file or create a backup file. These files are created only when you ask,
            and are saved or shared wherever you choose using your phone’s share sheet. They contain your financial
            records but never your password, MPIN or sign-in tokens. Please store them securely — anyone with the file can
            read its contents.
          </p>

          <H2>Network use</H2>
          <p>
            The app works fully offline. It connects to the internet only to sign in with Google, to sync (when Cloud Sync
            is on), and to display a Google profile picture. Changes made offline are queued on your phone and sync when
            you reconnect. The app also checks whether your device is online to show an online/offline indicator.
          </p>

          <H2>Deleting your data</H2>
          <ul>
            <li>
              <strong>Delete Local Account</strong> (Account screen) permanently deletes your profile and all of its records
              from the device — and, by default for synced accounts, from the cloud.
            </li>
            <li><strong>Delete cloud copy</strong> (Account → Cloud Sync) removes your synced records from the cloud and keeps them on your phone.</li>
            <li>Uninstalling the app removes all app data from your device (a cloud copy, if any, remains until you delete it).</li>
            <li>Logging out ends your session but keeps your data so you can log back in.</li>
          </ul>

          <H2>Children</H2>
          <p>{APP_NAME} is not directed at children under 13, and we do not knowingly collect information from children.</p>

          <H2>This website</H2>
          <p>
            This website does not use cookies, analytics or advertising. If you choose a light or dark theme, that choice
            is saved in your browser’s local storage. Like any website, our hosting provider may keep standard server
            logs (such as IP address and browser type) for security and reliability.
          </p>

          <H2>Changes to this policy</H2>
          <p>
            If the app’s handling of information changes, we will update this page and its effective date before the
            change takes effect.
          </p>

          <H2>Contact</H2>
          <p>
            {contactEmail ? (
              <>
                Questions about privacy, or want your cloud account removed? Email{' '}
                <a className="text-primary underline" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </>
            ) : (
              'Questions about privacy, or want your cloud account removed? Contact us through the app’s store listing.'
            )}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
);
