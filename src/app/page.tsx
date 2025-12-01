// src/app/page.tsx
'use client';

import { useAppKit, ConnectButton } from '@reown/appkit-react';

export default function HomePage() {
  const { isConnected, address, chain } = useAppKit();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-extrabold mb-10 text-white">
        ReownQuest GameFi Portal
      </h1>
      
      <ConnectButton 
        label="Connect to Quest"
        className="px-8 py-3 text-lg font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 transition"
      />
      
      {isConnected ? (
        <div className="mt-12 p-6 max-w-lg bg-gray-800 rounded-xl shadow-2xl border border-green-500">
          <p className="font-bold text-green-400 text-xl mb-3">
            ✅ Connected! Gasless Adventure Awaits
          </p>
          <p className="text-sm break-all">
            **Your Account:** {address}
          </p>
          <p className="text-sm">
            **Current Chain:** {chain?.name || 'Unknown'}
          </p>
          <p className="mt-4 text-xs text-gray-400">
            *Try logging in with Email/Social to see the Smart Account feature.*
          </p>
        </div>
      ) : (
        <p className="mt-12 text-gray-400 text-lg">
          Connect your wallet or use Email Login to begin your gasless quest!
        </p>
      )}
      
    </main>
  );
}
