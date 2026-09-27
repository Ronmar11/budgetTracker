# Spendify website

Marketing site for the Spendify mobile app (`../mobile`), with iOS and Android download links and the privacy policy the app stores require.

It's a static site built with Vite, React and Tailwind CSS 4: no server, no cookies, no analytics. It uses the app's own brand palette in light and dark themes.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ locally
```

## Download links

Download links are set at **build time** with environment variables. Copy `.env.example` to `.env`, or set the variables in your hosting provider's build settings.

| Variable | Used for |
| --- | --- |
| `VITE_IOS_APP_STORE_URL` | "Download on the App Store" button |
| `VITE_IOS_TESTFLIGHT_URL` | Public TestFlight beta (shown until the App Store link exists) |
| `VITE_ANDROID_PLAY_STORE_URL` | "Get it on Google Play" button |
| `VITE_ANDROID_APK_URL` | Direct APK download (optional) |
| `VITE_ANDROID_APK_SHA256` | Checksum shown next to the APK (optional) |
| `VITE_APP_VERSION` | Version label (optional) |
| `VITE_CONTACT_EMAIL` | Contact address in the privacy policy (**set this before submitting to the stores**) |

A button without a link shows **"Coming soon"** instead of a dead link, so the site can go live before the store listings do. Visitors on iPhone or Android see their own store first; desktop visitors get a QR code that opens the page on their phone.

### Getting the links (from `../mobile`)

- **Android APK (quickest):** `npx eas-cli@latest build --platform android --profile preview` produces an installable APK. Host it (for example as a GitHub release asset) and set `VITE_ANDROID_APK_URL`.
- **Google Play:** `npx eas-cli@latest build --platform android --profile production`, then `npx eas-cli@latest submit --platform android`. The listing URL is `https://play.google.com/store/apps/details?id=com.spendify.app`.
- **iOS:** needs an Apple Developer account. Run `npx eas-cli@latest build --platform ios --profile production`, then `npx eas-cli@latest submit --platform ios`. Use the public TestFlight link while in beta, then the App Store link.
- Both stores ask for a **privacy policy URL**: use `https://<your-domain>/privacy`.

## Deploy

### Vercel (configured)

`vercel.json` sets the build, clean URLs (`/privacy`), long-lived caching for hashed assets, and basic security headers.

```bash
npx vercel login          # once
npx vercel                # from this folder: link the project + preview deploy
npx vercel --prod         # production deploy
```

When linking, set the project's **Root Directory** to `website` if you deploy from the repo root or through Git. Add the `VITE_*` variables under *Project → Settings → Environment Variables*, then redeploy (they're read at build time).

### Other hosts

`dist/` is plain static files, so any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages):

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variables:** the table above

## Before launch

- **Store badges:** Apple and Google publish official badge artwork with usage rules. The buttons here are faithful stand-ins; for a public launch, swap in the official badge SVGs from Apple's "App Store Marketing Guidelines" and Google's "Google Play badges" pages.
- **Privacy policy:** `src/privacy.tsx` describes what the app does today: data stays on the device, Google is used only for sign-in, and there are no ads or analytics. Update it, and its effective date, if the app ever adds network features, analytics or ads.
- **Screens on the site:** the phone mockups are HTML recreations of real app screens using sample data (`src/components/PhoneMockup.tsx`). Keep them in step with the app's design.
