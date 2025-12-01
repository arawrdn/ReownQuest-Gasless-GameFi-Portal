// src/app/layout.tsx
import './globals.css';
import { GameKitProvider } from '../AppKitProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ReownQuest | Gasless GameFi Portal',
  description: 'A GameFi portal with universal login and gasless transactions using Reown AppKit.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GameKitProvider>
          {children}
        </GameKitProvider>
      </body>
    </html>
  );
}
