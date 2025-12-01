// src/lib/constants.ts
import { parseAbi } from 'viem';

// RQT_DailyClaim Smart Contract Details
export const RQT_CLAIM_CONTRACT_ADDRESS = "0x77adE4eD4c4463E9d0dD401Daa8b31A2c1a5A291";

// Minimal ABI for the claimDailyReward function
export const RQT_CLAIM_ABI = parseAbi([
  'function claimDailyReward() external',
  'function canClaim(address player) external view returns (bool)',
  'function balanceOf(address account) external view returns (uint256)',
  // Tambahkan fungsi lain yang ingin Anda panggil di frontend
]);
