import { useState } from "react";

interface CasinoSectionProps {
  gameState: {
    totalKush: number;
  };
}

export default function CasinoSection({ gameState }: CasinoSectionProps) {
  const [activeTab, setActiveTab] = useState('trading');

  const maxBet = Math.floor(gameState.totalKush * 0.25); // 25% of total KUSH

  const casinoGames = [
    { name: 'Blackjack', icon: 'fas fa-spade-suit', color: 'bg-purple-600 hover:bg-purple-700', odds: '25%' },
    { name: 'Roulette', icon: 'fas fa-circle', color: 'bg-red-600 hover:bg-red-700', odds: '20%' },
    { name: 'Coinflip', icon: 'fas fa-coins', color: 'bg-blue-600 hover:bg-blue-700', odds: '50%' },
    { name: 'Dice', icon: 'fas fa-dice', color: 'bg-gray-600 hover:bg-gray-700', odds: '50%' },
    { name: 'Hi/Lo', icon: 'fas fa-chart-bar', color: 'bg-indigo-600 hover:bg-indigo-700', odds: '46%' },
  ];

  const tabs = [
    { id: 'trading', label: 'Trading', icon: 'fas fa-exchange-alt' },
    { id: 'staking', label: 'Staking', icon: 'fas fa-chart-line' },
    { id: 'compete', label: 'Compete', icon: 'fas fa-trophy' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-dice text-accent text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-casino-title">Multiplayer Hub</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`casino-tab flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'active' : ''
            }`}
            data-testid={`tab-${tab.id}`}
          >
            <i className={`${tab.icon} mr-2`}></i>{tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'trading' && (
        <div className="bg-card rounded-xl p-8 text-center border border-border" data-testid="content-trading">
          <i className="fas fa-shopping-cart text-4xl text-blue-400 mb-4"></i>
          <h3 className="text-xl font-bold text-blue-400 mb-2">Trading System</h3>
          <p className="text-muted-foreground mb-4">Coming Soon! Trade KUSH with other players</p>
        </div>
      )}

      {activeTab === 'staking' && (
        <div className="bg-card rounded-xl p-8 text-center border border-border" data-testid="content-staking">
          <i className="fas fa-chart-line text-4xl text-green-400 mb-4"></i>
          <h3 className="text-xl font-bold text-green-400 mb-2">Staking Pool</h3>
          <p className="text-muted-foreground mb-4">Stake your KUSH to earn passive rewards</p>
        </div>
      )}

      {activeTab === 'compete' && (
        <div data-testid="content-compete">
          {/* Casino Games Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {casinoGames.map((game) => (
              <button
                key={game.name}
                className={`${game.color} rounded-lg p-4 text-center transition-colors text-white`}
                data-testid={`game-${game.name.toLowerCase()}`}
              >
                <i className={`${game.icon} text-2xl mb-2`}></i>
                <div className="font-bold">{game.name}</div>
                <div className="text-sm opacity-80">{game.odds}</div>
              </button>
            ))}
          </div>

          {/* Betting Interface */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-center">
              <div className="text-muted-foreground text-sm mb-3" data-testid="text-betting-info">
                Max: {maxBet} Kush | Available: {gameState.totalKush} Kush
              </div>
              
              <div className="flex justify-center space-x-2 mb-4">
                <button className="bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-2 rounded-lg text-sm" data-testid="button-bet-low">
                  —
                </button>
                <button className="bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-2 rounded-lg text-sm" data-testid="button-bet-medium">
                  —
                </button>
                <button className="bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-2 rounded-lg text-sm" data-testid="button-bet-high">
                  —
                </button>
                <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-3 py-2 rounded-lg text-sm font-bold" data-testid="button-bet-max">
                  MAX
                </button>
              </div>

              <input
                type="text"
                placeholder="Custom amount"
                className="w-full bg-input border border-border rounded-lg px-4 py-2 mb-4 text-foreground text-center"
                data-testid="input-custom-bet"
              />
              
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-bold mb-4 transition-colors" data-testid="button-play-blackjack">
                <i className="fas fa-play-circle mr-2"></i>PLAY BLACKJACK
              </button>

              <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-3 mb-4">
                <i className="fas fa-exclamation-triangle text-destructive mr-2"></i>
                <span className="text-destructive text-sm">Warning: House has advantage. Gamble responsibly!</span>
              </div>

              <div className="text-xs text-muted-foreground" data-testid="text-max-bet-info">
                Max bet: {maxBet} Kush (25% of total)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
