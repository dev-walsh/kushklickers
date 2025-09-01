import { useState } from "react";
import logoUrl from "@/assets/logo.png";

type GameSection = 'game' | 'upgrades' | 'achievements' | 'leaderboard' | 'wallet' | 'referral';

interface HeaderProps {
  currentSection?: GameSection;
  onSectionChange?: (section: GameSection) => void;
}

export default function Header({ currentSection, onSectionChange }: HeaderProps = {}) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection process
    setTimeout(() => {
      setWalletConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border" data-testid="header">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img src={logoUrl} alt="KushKlicker Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground" data-testid="text-game-title">Kush Klicker</h1>
              <p className="text-xs text-muted-foreground">Cannabis Mining Game</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <button 
                onClick={() => onSectionChange?.('upgrades')}
                className={`transition-colors ${currentSection === 'upgrades' ? 'text-primary' : 'text-primary hover:text-primary/80'}`} 
                data-testid="link-features"
              >
                <i className="fas fa-zap mr-1"></i> Upgrades
              </button>
              <button 
                onClick={() => onSectionChange?.('leaderboard')}
                className={`transition-colors ${currentSection === 'leaderboard' ? 'text-primary' : 'text-foreground hover:text-primary'}`} 
                data-testid="link-leaderboard"
              >
                <i className="fas fa-trophy mr-1"></i> Leaderboard
              </button>
              <button 
                onClick={() => onSectionChange?.('achievements')}
                className={`transition-colors ${currentSection === 'achievements' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`} 
                data-testid="link-achievements"
              >
                <i className="fas fa-trophy mr-1"></i> Goals
              </button>
              <button 
                onClick={() => onSectionChange?.('wallet')}
                className={`transition-colors ${currentSection === 'wallet' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`} 
                data-testid="link-wallet"
              >
                <i className="fas fa-wallet mr-1"></i> Wallet
              </button>
            </div>
            
            <button 
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                walletConnected 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
              data-testid="button-connect-wallet"
            >
              {isConnecting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Connecting...</span>
                </>
              ) : walletConnected ? (
                <>
                  <i className="fas fa-check"></i>
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <i className="fas fa-wallet"></i>
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
