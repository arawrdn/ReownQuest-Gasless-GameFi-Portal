'use client';

import { useAppKit } from '@reown/appkit-react';
import { encodeFunctionData, formatUnits } from 'viem';
import { useCallback, useState, useEffect } from 'react';
import { RQT_CLAIM_CONTRACT_ADDRESS, RQT_CLAIM_ABI } from '@/lib/constants';
import { polygon } from 'wagmi/chains'; // Contoh, asumsikan deployment di Polygon/Base Testnet

export function DailyClaimButton() {
  const { sendTransaction, isConnected, address, readContract } = useAppKit();
  
  const [loading, setLoading] = useState(false);
  const [canClaimStatus, setCanClaimStatus] = useState(false);
  const [rqtBalance, setRqtBalance] = useState("0");

  // Fetch status and balance upon connection or transaction
  const fetchStatus = useCallback(async () => {
    if (!address || !isConnected) return;
    
    try {
      // 1. Check claim status (Gasless view call)
      const canClaimResult = await readContract({
        address: RQT_CLAIM_CONTRACT_ADDRESS,
        abi: RQT_CLAIM_ABI,
        functionName: 'canClaim',
        args: [address],
        chainId: polygon.id, // Sesuaikan dengan chain deployment
      });
      setCanClaimStatus(canClaimResult as boolean);

      // 2. Fetch RQT balance
      const balanceBigInt = await readContract({
        address: RQT_CLAIM_CONTRACT_ADDRESS,
        abi: RQT_CLAIM_ABI,
        functionName: 'balanceOf',
        args: [address],
        chainId: polygon.id,
      });
      setRqtBalance(formatUnits(balanceBigInt as bigint, 18));
      
    } catch (error) {
      console.error("Error fetching claim status or balance:", error);
      setCanClaimStatus(false);
      setRqtBalance("Error");
    }
  }, [address, isConnected, readContract]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleClaim = useCallback(async () => {
    if (!isConnected || !canClaimStatus) {
      alert(canClaimStatus ? "Please connect your wallet first." : "You must wait 24 hours to claim again.");
      return;
    }

    setLoading(true);
    try {
      // Use AppKit to send the GASLESS transaction
      const tx = await sendTransaction({
        to: RQT_CLAIM_CONTRACT_ADDRESS, 
        data: encodeFunctionData({ 
          abi: RQT_CLAIM_ABI,
          functionName: 'claimDailyReward',
          args: [],
        }),
        chainId: polygon.id, // Pastikan chain yang benar
      });

      console.log('Transaction Hash:', tx.hash);
      alert('SUCCESS! You claimed 0.2 RQT. Gas was sponsored by ReownQuest.');
      
      // Update status and balance after transaction completes
      await fetchStatus(); 

    } catch (error) {
      console.error('Claim failed:', error);
      alert('Claim failed. Check the console for details or try reconnecting.');
    } finally {
      setLoading(false);
    }
  }, [isConnected, canClaimStatus, sendTransaction, fetchStatus]);

  const buttonText = loading 
    ? 'Claiming...' 
    : canClaimStatus 
      ? 'Claim Daily 0.2 RQT (Gasless)' 
      : 'Wait for Cooldown...';

  return (
    <div className="text-center">
      <p className="mb-2 text-lg font-semibold">Your RQT Balance: {rqtBalance}</p>
      <button 
        onClick={handleClaim} 
        disabled={loading || !isConnected || !canClaimStatus}
        className="mt-2 px-6 py-3 bg-purple-600 text-white rounded-lg disabled:bg-gray-500 hover:bg-purple-700 transition"
      >
        {buttonText}
      </button>
      {!isConnected && (
         <p className="mt-2 text-red-400">Please connect to interact with the contract.</p>
      )}
    </div>
  );
}
