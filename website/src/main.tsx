import './styles.css';

import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { Features } from './components/Features';
import { Faq, Hero, HowItWorks, Privacy, Showcase } from './components/Sections';
import { detectPlatform } from './config';

function LandingPage() {
  const [platform] = useState(detectPlatform);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface-container focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero platform={platform} />
        <Features />
        <Showcase />
        <Privacy />
        <HowItWorks />
        <Faq />
        <DownloadSection platform={platform} />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
);
