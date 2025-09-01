import { useState, useEffect } from "react";
import Header from "@/components/navigation/header";
import MobileNav from "@/components/navigation/mobile-nav";
import DesktopNav from "@/components/navigation/desktop-nav";
import MainClicker from "@/components/game/main-clicker";
import StatsDisplay from "@/components/game/stats-display";
import UpgradeList from "@/components/upgrades/upgrade-list";
import AchievementList from "@/components/achievements/achievement-list";
import Leaderboard from "@/components/leaderboard/leaderboard";
import WalletSection from "@/components/wallet/wallet-section";
import ReferralSection from "@/components/referral/referral-section";
import CasinoSection from "@/components/casino/casino-section";
import { useGameState } from "@/hooks/use-game-state";

type GameSection = 'game' | 'upgrades' | 'casino' | 'achievements' | 'leaderboard' | 'wallet' | 'referral';

export default function Game() {
  const [currentSection, setCurrentSection] = useState<GameSection>('game');
  const { gameState, isLoading } = useGameState();

  // Floating click effects container
  const [clickEffects, setClickEffects] = useState<Array<{ id: number; x: number; y: number; value: number }>>([]);

  const addClickEffect = (x: number, y: number, value: number) => {
    const id = Date.now();
    setClickEffects(prev => [...prev, { id, x, y, value }]);
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== id));
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Kush Klicker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex flex-col overflow-hidden" data-testid="game-container">
      <Header currentSection={currentSection} onSectionChange={setCurrentSection} />
      <MobileNav currentSection={currentSection} onSectionChange={setCurrentSection} />
      <DesktopNav currentSection={currentSection} onSectionChange={setCurrentSection} />

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-16 md:pb-4 md:pl-16 overflow-y-auto game-container">
        
        {/* Game Section */}
        {currentSection === 'game' && (
          <section className="game-section h-full" data-testid="section-game">
            <div className="container mx-auto px-2 md:px-4 py-2 md:py-6 max-w-4xl h-full flex flex-col">
              
              {/* Compact Mobile Banner */}
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-2 md:p-4 mb-3 md:mb-6 text-center border border-primary/30 mobile-compact">
                <div className="inline-flex items-center space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium mb-1">
                  <i className="fas fa-broadcast-tower text-xs"></i>
                  <span className="mobile-text">Live on Telegram</span>
                </div>
                <h2 className="text-lg md:text-3xl font-bold text-foreground mb-1 md:mb-2">
                  <span className="text-primary">KUSH Klicker</span>
                </h2>
                <p className="text-muted-foreground text-xs md:text-base max-w-2xl mx-auto mb-2 md:mb-4 mobile-text">
                  Click to mine cannabis and earn crypto tokens
                </p>
              </div>

              <StatsDisplay gameState={gameState} />
              <MainClicker gameState={gameState} onClickEffect={addClickEffect} />
            </div>
          </section>
        )}

        {/* Upgrades Section */}
        {currentSection === 'upgrades' && (
          <section className="game-section" data-testid="section-upgrades">
            <UpgradeList gameState={gameState} />
          </section>
        )}

        {/* Casino Section */}
        {currentSection === 'casino' && (
          <section className="game-section" data-testid="section-casino">
            <CasinoSection gameState={gameState} />
          </section>
        )}

        {/* Achievements Section */}
        {currentSection === 'achievements' && (
          <section className="game-section" data-testid="section-achievements">
            <AchievementList gameState={gameState} />
          </section>
        )}

        {/* Leaderboard Section */}
        {currentSection === 'leaderboard' && (
          <section className="game-section" data-testid="section-leaderboard">
            <Leaderboard />
          </section>
        )}

        {/* Wallet Section */}
        {currentSection === 'wallet' && (
          <section className="game-section" data-testid="section-wallet">
            <WalletSection gameState={gameState} />
          </section>
        )}

        {/* Referral Section */}
        {currentSection === 'referral' && (
          <section className="game-section" data-testid="section-referral">
            <ReferralSection gameState={gameState} />
          </section>
        )}

      </main>

      {/* Floating Click Effects */}
      <div className="fixed inset-0 pointer-events-none z-30" data-testid="click-effects">
        {clickEffects.map(effect => (
          <div
            key={effect.id}
            className="floating-text absolute text-primary font-bold text-xl"
            style={{
              left: effect.x - 15,
              top: effect.y - 10,
            }}
          >
            +{effect.value}
          </div>
        ))}
      </div>
    </div>
  );
}
