import { StrictMode, type ComponentType } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

/**
 * Attach a page to #root. Production pages arrive pre-rendered (scripts/prerender.mjs),
 * so React hydrates the existing HTML; in dev the root is empty and renders fresh.
 */
export function mount(Page: ComponentType) {
  const root = document.getElementById('root')!;
  const app = (
    <StrictMode>
      <Page />
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
