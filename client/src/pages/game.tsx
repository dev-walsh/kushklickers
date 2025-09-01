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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900" data-testid="game-container">
      <Header />
      <MobileNav currentSection={currentSection} onSectionChange={setCurrentSection} />
      <DesktopNav currentSection={currentSection} onSectionChange={setCurrentSection} />

      {/* Main Content */}
      <main className="pt-20 pb-20 md:pb-4 md:pl-16 min-h-screen">
        
        {/* Game Section */}
        {currentSection === 'game' && (
          <section className="game-section" data-testid="section-game">
            <div className="container mx-auto px-4 py-6 max-w-4xl">
              
              {/* Hero Banner */}
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-4 mb-6 text-center border border-primary/30">
                <div className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-2">
                  <i className="fas fa-broadcast-tower"></i>
                  <span>Now Live on Telegram</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Mine Cannabis<br />
                  <span className="text-primary">Earn Real Crypto</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-4">
                  The ultimate incremental clicker game where every click grows your virtual cannabis empire and earns you real KUSH tokens on the Solana blockchain.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2" data-testid="button-play">
                    <i className="fas fa-play"></i>
                    <span>Play Kush Klicker</span>
                  </button>
                  <button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2" data-testid="button-whitepaper">
                    <i className="fas fa-file-alt"></i>
                    <span>Read Whitepaper</span>
                  </button>
                </div>
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
