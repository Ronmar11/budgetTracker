import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { APP_NAME, GOVERNING_LAW, contactEmail } from '../config';

const EFFECTIVE_DATE = 'September 28, 2026';

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 text-2xl font-bold tracking-tight">
      {children}
    </h2>
  );
}

/**
 * Terms of Service for the mobile app and this website. Like the privacy policy,
 * it describes the app's real behaviour (offline-first, local accounts that
 * can't be recovered, optional cloud sync) — keep the two in step.
 */
export function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Legal</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-on-surface-variant">Effective {EFFECTIVE_DATE}</p>

        <div className="mt-10 space-y-5 text-[16px] leading-relaxed text-on-surface-variant [&_strong]:text-on-surface [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          <p>
            These Terms of Service (“Terms”) govern your use of the {APP_NAME} mobile app for iPhone and Android (the
            “App”) and this website (together, the “Service”). By downloading, installing or using the Service, you
            agree to these Terms. If you don’t agree, please don’t use the Service.
          </p>

          <H2>The short version</H2>
          <ul>
            <li>{APP_NAME} is free to use. Your financial data is <strong>yours</strong>.</li>
            <li>
              Your data lives on your phone. <strong>Keep your password and MPIN safe</strong> — for local accounts we
              can’t reset them, and a forgotten password can mean losing access to that account’s data.
            </li>
            <li>Cloud Sync is optional and provided “as is”. Keep backups of anything you can’t afford to lose.</li>
            <li>{APP_NAME} is a tracking tool, <strong>not financial advice</strong>.</li>
          </ul>

          <H2>1. Who can use {APP_NAME}</H2>
          <p>
            You must be at least 13 years old to use the Service. If you are under the age of majority where you live,
            you may use it only with the involvement of a parent or guardian who agrees to these Terms.
          </p>

          <H2>2. Your account and security</H2>
          <ul>
            <li>
              <strong>Local accounts</strong> are created and stored only on your device. Your password and MPIN are kept
              as one-way hashes on the device, so <strong>we cannot see, recover or reset them</strong>. If you forget
              them, you may permanently lose access to that account’s data unless you have a backup file or have linked
              the account to Google with Cloud Sync on.
            </li>
            <li>
              <strong>Google accounts</strong> use Google to sign in. You are responsible for keeping your Google account
              secure.
            </li>
            <li>
              You are responsible for activity on your device and accounts, and for keeping your device, MPIN and any
              exported files secure. Tell us promptly if you believe your cloud account has been accessed without your
              permission.
            </li>
          </ul>

          <H2>3. Your data</H2>
          <p>
            You own the information you enter into {APP_NAME}. We don’t claim any ownership of it. If you turn on Cloud
            Sync, you give us permission to store, copy and transmit your data <strong>only as needed to provide sync and
            backup to you</strong>. We don’t sell it, use it for advertising, or share it except with the infrastructure
            providers that run the Service. How we handle information is described in our{' '}
            <a className="text-primary underline" href="/privacy">
              Privacy Policy
            </a>
            , which is part of these Terms.
          </p>

          <H2>4. Cloud Sync and availability</H2>
          <ul>
            <li>
              Cloud Sync is an optional feature for Google accounts. You can turn it off or delete your cloud copy at any
              time from the App.
            </li>
            <li>
              We work to keep the Service reliable, but we don’t guarantee that it will be uninterrupted, error-free, or
              that sync will never lose or duplicate data. Where two phones change the same record, the most recent change
              wins. <strong>Export a backup regularly</strong> if your records matter to you.
            </li>
            <li>
              We may change, suspend or discontinue features, including Cloud Sync. If we discontinue Cloud Sync, we will
              give reasonable notice where possible so you can keep your data on your device or export it.
            </li>
          </ul>

          <H2>5. Not financial advice</H2>
          <p>
            {APP_NAME} helps you record and understand your own spending. Balances, budgets, reports and goal progress are
            calculated from the information you enter and may be incomplete or inaccurate. Nothing in the Service is
            financial, investment, tax or legal advice, and {APP_NAME} is not a bank or payment service — it does not
            connect to, move or hold your money.
          </p>

          <H2>6. Acceptable use</H2>
          <p>You agree not to:</p>
          <ul>
            <li>use the Service for anything unlawful, or to store content you don’t have the right to store;</li>
            <li>
              try to access another person’s data or account, or probe, disrupt or overload our systems or the cloud
              service;
            </li>
            <li>
              reverse engineer, copy, resell or redistribute the App, except where the law allows it despite this
              restriction;
            </li>
            <li>use automated means to access the cloud service other than through the App.</li>
          </ul>

          <H2>7. Third-party services</H2>
          <p>
            The Service relies on third parties, including Google (sign-in), Supabase (cloud sync and authentication),
            and Apple and Google (app distribution). Your use of their services is also subject to their own terms. We are
            not responsible for third-party services we don’t control.
          </p>

          <H2>8. App store terms</H2>
          <p>
            If you downloaded the App from the Apple App Store or Google Play, these Terms are between you and us, not
            Apple or Google, and we — not Apple or Google — are responsible for the App and its content. Your use of the
            App must also comply with the store’s terms of use. For the iOS App, Apple and its subsidiaries are
            third-party beneficiaries of these Terms and may enforce them against you. Apple has no obligation to provide
            maintenance or support for the App, and is not responsible for any claims relating to it, including product
            liability, legal or regulatory compliance, or intellectual-property claims.
          </p>

          <H2>9. Our intellectual property</H2>
          <p>
            The App, this website, the {APP_NAME} name, logo and design are owned by us and protected by law. We grant you
            a personal, non-exclusive, non-transferable, revocable licence to install and use the App on devices you own
            or control, for your own non-commercial use, under these Terms.
          </p>

          <H2>10. Ending your use</H2>
          <p>
            You can stop using the Service at any time. Deleting your local account removes its data from your device and,
            by default for synced accounts, from the cloud. We may suspend or end access to Cloud Sync if you seriously or
            repeatedly break these Terms, or if required by law. Data on your device remains yours to keep or export.
          </p>

          <H2>11. Disclaimer</H2>
          <p>
            The Service is provided <strong>“as is” and “as available”</strong>, without warranties of any kind, whether
            express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy and
            non-infringement, to the fullest extent permitted by law.
          </p>

          <H2>12. Limitation of liability</H2>
          <p>
            To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special,
            consequential or punitive damages, or for any loss of data, profits or savings, arising from your use of or
            inability to use the Service — including lost access to a local account whose password or MPIN you forgot.
            Because the Service is free, our total liability for any claim relating to it is limited to the amount you
            paid us for the Service in the 12 months before the claim (if any). Nothing in these Terms limits liability
            that cannot be limited under applicable law, or your rights as a consumer.
          </p>

          <H2>13. Changes to these Terms</H2>
          <p>
            We may update these Terms as the Service changes. We will post the new version on this page with a new
            effective date and, for significant changes, give notice in the App before they take effect. If you keep using
            the Service after the changes take effect, you accept the updated Terms.
          </p>

          <H2>14. Governing law</H2>
          <p>
            These Terms are governed by the laws of {GOVERNING_LAW}, without regard to conflict-of-law rules. This does not
            take away any protection you have under the mandatory consumer laws of the country where you live.
          </p>

          <H2>15. Contact</H2>
          <p>
            {contactEmail ? (
              <>
                Questions about these Terms? Email{' '}
                <a className="text-primary underline" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </>
            ) : (
              'Questions about these Terms? Contact us through the app’s store listing.'
            )}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
