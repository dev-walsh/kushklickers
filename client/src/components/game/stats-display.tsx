import { formatNumber } from "@/lib/game-utils";

interface StatsDisplayProps {
  gameState: {
    totalKush: number;
    perClickMultiplier: number;
    autoIncomePerHour: number;
  };
}

export default function StatsDisplay({ gameState }: StatsDisplayProps) {
  const perHourDisplay = Math.floor(gameState.autoIncomePerHour);
  const autoIncomeDisplay = gameState.autoIncomePerHour > 0 ? `${formatNumber(perHourDisplay)}/hr` : '0/hr';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-total-kush">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className="fas fa-cannabis text-primary"></i>
          <span className="text-primary font-medium text-sm">Total Kush</span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-total-kush">
          {formatNumber(gameState.totalKush)}
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-per-click">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className="fas fa-hand-pointer text-accent"></i>
          <span className="text-accent font-medium text-sm">Per Click</span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-per-click">
          {formatNumber(gameState.perClickMultiplier)}
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-per-hour">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className="fas fa-clock text-yellow-500"></i>
          <span className="text-yellow-500 font-medium text-sm">Per Hour</span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-per-hour">
          {formatNumber(perHourDisplay)}
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-4 text-center border border-border" data-testid="stat-auto-income">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <i className="fas fa-robot text-blue-500"></i>
          <span className="text-blue-500 font-medium text-sm">Auto Income</span>
        </div>
        <div className="text-2xl font-bold text-foreground" data-testid="text-auto-income">
          {autoIncomeDisplay}
        </div>
      </div>
    </div>
  );
}
