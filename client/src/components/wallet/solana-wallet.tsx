// Solana Wallet Integration for KushKlicker
// This component handles Solana wallet connection and token rewards

// Note: Install these packages first:
// npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-phantom @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, ExternalLink, AlertCircle } from "lucide-react";

// Mock wallet state for now
const useMockWallet = () => {
  return {
    connected: false,
    publicKey: null,
    connect: () => alert('Solana wallet integration coming soon! Install required packages first.'),
    disconnect: () => {},
    balance: 0
  };
};

interface SolanaWalletProps {
  gameState: {
    totalKush: number;
    claimableTokens: number;
  };
}

export function SolanaWallet({ gameState }: SolanaWalletProps) {
  const wallet = useMockWallet();
  
  const handleClaimRewards = () => {
    if (!wallet.connected) {
      alert('Please connect your Solana wallet first!');
      return;
    }
    
    // Here you would implement the actual token claim logic
    alert('Token claiming feature coming soon!');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-purple-500" />
          Solana Wallet
        </CardTitle>
        <CardDescription>
          Connect your wallet to earn real KUSH tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={wallet.connected ? "default" : "secondary"}>
            {wallet.connected ? "Connected" : "Not Connected"}
          </Badge>
        </div>

        {/* Wallet Address */}
        {wallet.connected && wallet.publicKey && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Wallet Address:</p>
            <p className="font-mono text-sm truncate">
              {wallet.publicKey.toString()}
            </p>
          </div>
        )}

        {/* SOL Balance */}
        {wallet.connected && (
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">SOL Balance:</span>
            <span className="font-bold">{wallet.balance.toFixed(4)} SOL</span>
          </div>
        )}

        {/* Claimable Tokens */}
        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            Claimable KUSH:
          </span>
          <span className="font-bold text-green-800 dark:text-green-200">
            {gameState.claimableTokens.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {!wallet.connected ? (
            <Button 
              onClick={wallet.connect} 
              className="w-full"
              variant="default"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Phantom Wallet
            </Button>
          ) : (
            <div className="space-y-2">
              <Button 
                onClick={handleClaimRewards}
                className="w-full"
                disabled={gameState.claimableTokens === 0}
                variant="default"
              >
                Claim {gameState.claimableTokens.toLocaleString()} KUSH Tokens
              </Button>
              <Button 
                onClick={wallet.disconnect}
                variant="outline"
                className="w-full"
              >
                Disconnect Wallet
              </Button>
            </div>
          )}
        </div>

        {/* Token Exchange Rate */}
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Exchange Rate</p>
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
            1,000 Game KUSH = 1 KUSH Token
          </p>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-yellow-700 dark:text-yellow-300">
            <p className="font-medium mb-1">Testnet Only</p>
            <p>Currently running on Solana devnet. Real tokens coming soon!</p>
          </div>
        </div>

        {/* External Links */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              Get Phantom
            </a>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href="https://solana.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              About Solana
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}