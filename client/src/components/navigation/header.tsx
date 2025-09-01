import { useState } from "react";

export default function Header() {
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border" data-testid="header">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-cannabis text-primary-foreground text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground" data-testid="text-game-title">Kush Klicker</h1>
              <p className="text-xs text-muted-foreground">Cannabis Mining Game</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <a href="#" className="text-primary hover:text-primary/80 transition-colors" data-testid="link-features">
                <i className="fas fa-zap mr-1"></i> Features
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" data-testid="link-leaderboard">
                <i className="fas fa-trophy mr-1"></i> Leaderboard
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-support">
                <i className="fas fa-question-circle mr-1"></i> Support
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-whitepaper">
                <i className="fas fa-file-alt mr-1"></i> Whitepaper
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-roadmap">
                <i className="fas fa-road mr-1"></i> Roadmap
              </a>
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
