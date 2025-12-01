// src/AppKitProvider.tsx
'use client';

import { AppKitProvider } from '@reown/appkit-react';
import { appkitConfig } from './lib/appkitConfig';
import { ReactNode } from 'react';

export function GameKitProvider({ children }: { children: ReactNode }) {
  if (!appkitConfig.projectId) {
    return <div>Error: AppKit Project ID is missing.</div>;
  }
  
  return (
    <AppKitProvider config={appkitConfig}>
      {children}
    </AppKitProvider>
  );
}
