type GameSection = 'game' | 'upgrades' | 'casino' | 'achievements' | 'leaderboard' | 'wallet' | 'referral';

interface MobileNavProps {
  currentSection: GameSection;
  onSectionChange: (section: GameSection) => void;
}

export default function MobileNav({ currentSection, onSectionChange }: MobileNavProps) {
  const navItems = [
    { id: 'game', icon: 'fas fa-cannabis', label: 'Mine' },
    { id: 'upgrades', icon: 'fas fa-bolt', label: 'Upgrades' },
    { id: 'casino', icon: 'fas fa-dice', label: 'Casino' },
    { id: 'achievements', icon: 'fas fa-trophy', label: 'Goals' },
    { id: 'leaderboard', icon: 'fas fa-crown', label: 'Leaders' },
    { id: 'wallet', icon: 'fas fa-coins', label: 'Wallet' },
    { id: 'referral', icon: 'fas fa-users', label: 'Referral' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border md:hidden" data-testid="mobile-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id as GameSection)}
            className={`nav-btn ${currentSection === item.id ? 'active' : ''}`}
            data-testid={`nav-${item.id}`}
          >
            <i className={`${item.icon} text-xl`}></i>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
