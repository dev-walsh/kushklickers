import { SolanaWallet } from './solana-wallet';

interface WalletSectionProps {
  gameState: {
    totalKush: number;
    claimableTokens: number;
  };
}

export default function WalletSection({ gameState }: WalletSectionProps) {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-wallet text-blue-400 text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-wallet-title">Solana Wallet</h2>
      </div>

      <SolanaWallet gameState={gameState} />

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
