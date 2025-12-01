// src/lib/appkitConfig.ts
import { AppKitConfig } from '@reown/appkit-core';
import { mainnet, polygon, solana, bsc } from 'wagmi/chains';

if (!process.env.NEXT_PUBLIC_REOWN_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_REOWN_PROJECT_ID is not set in environment variables.');
}

export const appkitConfig: AppKitConfig = {
  // Using your Project ID: a5f9260bc9bca570190d3b01f477fc45
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID, 
  
  chains: [mainnet, polygon, bsc, solana], 
  
  options: {
    smartAccounts: {
      enabled: true,
      sponsorGas: true, // Gas Sponsorship enabled (Gasless)
    },
    auth: {
      email: true,
      social: true, // Email and Social Login enabled
    },
    ui: {
      theme: 'dark',
      accentColor: '#4F46E5', 
      logo: '/reownquest_logo.svg', 
    },
    swaps: {
      enabled: true,
    }
  }
};
