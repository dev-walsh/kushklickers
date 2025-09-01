import { useState } from "react";
import { formatNumber } from "@/lib/game-utils";

interface WalletSectionProps {
  gameState: {
    totalKush: number;
    claimableTokens: number;
  };
}

export default function WalletSection({ gameState }: WalletSectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate Solana wallet connection
    // TODO: Implement actual Solana wallet integration
    setTimeout(() => {
      setWalletConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const conversionRate = 1000; // 1,000 KUSH = 1 SOL Token
  const usdValue = 0.0000; // Mock USD value

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-wallet text-blue-400 text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-wallet-title">Solana Wallet</h2>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-500/30 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground mb-2" data-testid="text-claimable-tokens">
            {formatNumber(gameState.claimableTokens)} KUSH
          </div>
          <div className="text-blue-400 text-sm mb-4">
            Claimable Tokens (${usdValue.toFixed(4)} USD)
          </div>
          
          <div className="bg-blue-600/20 rounded-lg p-3 mb-4 border border-blue-500/30">
            <i className="fas fa-info-circle text-blue-400 mr-2"></i>
            <span className="text-blue-400 text-sm">
              Conversion Rate: {formatNumber(conversionRate)} KUSH = 1 Real SOL Token
            </span>
            <div className="text-xs text-muted-foreground mt-1">
              Current game balance: {formatNumber(gameState.totalKush)} KUSH
            </div>
          </div>

          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className={`w-full py-3 rounded-lg font-bold mb-4 transition-all duration-200 ${
              walletConnected 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
            }`}
            data-testid="button-connect-solana-wallet"
          >
            {isConnecting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Connecting to Solana...
              </>
            ) : walletConnected ? (
              <>
                <i className="fas fa-check mr-2"></i>
                Wallet Connected
              </>
            ) : (
              'Connect Solana Wallet'
            )}
          </button>

          <p className="text-muted-foreground text-sm">
            Connect your wallet to prepare for token withdrawal
          </p>
        </div>
      </div>

      {/* Game Launch Status */}
      <div className="bg-accent/20 border border-accent/50 rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-3">
          <i className="fas fa-rocket text-accent text-lg mt-0.5"></i>
          <div>
            <h4 className="font-semibold text-accent mb-1">Game Launch Status</h4>
            <p className="text-sm text-foreground">
              Real Solana token integration is coming soon! Your claimable tokens will be converted to real SOL when the game officially launches.
            </p>
          </div>
        </div>
      </div>

      {/* Network Warning */}
      <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="fas fa-exclamation-triangle text-destructive text-lg mt-0.5"></i>
          <div>
            <h4 className="font-semibold text-destructive mb-2">⚠️ IMPORTANT: Solana Network Only</h4>
            <ul className="text-sm text-foreground space-y-1">
              <li>• Only send tokens on the <strong>Solana</strong> network</li>
              <li>• Do NOT send tokens from other networks (Ethereum, BSC, etc.)</li>
              <li>• Sending from wrong networks will result in permanent loss</li>
              <li>• Always verify the network before making any transactions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button 
          className="bg-muted hover:bg-muted/80 text-muted-foreground px-6 py-2 rounded-lg transition-colors"
          data-testid="button-refresh-balance"
        >
          Refresh Balance
        </button>
      </div>
    </div>
  );
}
