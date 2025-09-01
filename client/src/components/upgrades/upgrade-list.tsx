import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatNumber } from "@/lib/game-utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Upgrade, PlayerUpgrade } from "@shared/schema";

interface UpgradeListProps {
  gameState: {
    id: string;
    totalKush: number;
  };
}

export default function UpgradeList({ gameState }: UpgradeListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: upgrades = [] } = useQuery<Upgrade[]>({
    queryKey: ['/api/upgrades'],
  });

  const { data: playerUpgrades = [] } = useQuery<PlayerUpgrade[]>({
    queryKey: ['/api/players', gameState.id, 'upgrades'],
  });

  const buyUpgradeMutation = useMutation({
    mutationFn: async ({ upgradeId }: { upgradeId: string }) => {
      const response = await apiRequest('POST', `/api/players/${gameState.id}/upgrades`, {
        upgradeId,
        quantity: 1
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/players', gameState.id], data.player);
      queryClient.invalidateQueries({ queryKey: ['/api/players', gameState.id, 'upgrades'] });
      toast({
        title: "Upgrade Purchased!",
        description: `Spent ${formatNumber(data.cost)} KUSH on upgrade.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Purchase Failed",
        description: error.message || "Not enough KUSH to buy this upgrade.",
        variant: "destructive",
      });
    }
  });

  const getUpgradeCost = (upgrade: Upgrade) => {
    const playerUpgrade = playerUpgrades.find(pu => pu.upgradeId === upgrade.id);
    const currentQuantity = playerUpgrade?.quantity || 0;
    const multiplier = Math.pow(upgrade.costMultiplier / 100, currentQuantity);
    return Math.floor(upgrade.baseCost * multiplier);
  };

  const canAfford = (upgrade: Upgrade) => {
    return gameState.totalKush >= getUpgradeCost(upgrade);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-seedling text-primary text-2xl"></i>
        <h2 className="text-2xl font-bold text-foreground" data-testid="text-upgrades-title">Grow Your Operation</h2>
      </div>

      <div className="grid gap-4">
        {upgrades.map((upgrade: Upgrade) => {
          const cost = getUpgradeCost(upgrade);
          const affordable = canAfford(upgrade);
          const playerUpgrade = playerUpgrades.find(pu => pu.upgradeId === upgrade.id);
          const quantity = playerUpgrade?.quantity || 0;

          return (
            <div key={upgrade.id} className="gradient-border" data-testid={`upgrade-${upgrade.id}`}>
              <div className="gradient-border-inner p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <i className={upgrade.icon + " text-primary"}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground" data-testid={`text-upgrade-name-${upgrade.id}`}>
                        {upgrade.name}
                        {quantity > 0 && (
                          <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                            {quantity}
                          </span>
                        )}
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid={`text-upgrade-description-${upgrade.id}`}>
                        {upgrade.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-accent font-bold" data-testid={`text-upgrade-cost-${upgrade.id}`}>
                      {formatNumber(cost)}
                    </div>
                    <button
                      onClick={() => buyUpgradeMutation.mutate({ upgradeId: upgrade.id })}
                      disabled={!affordable || buyUpgradeMutation.isPending}
                      className={`px-3 py-1 rounded text-sm mt-1 transition-colors ${
                        affordable 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                      data-testid={`button-buy-upgrade-${upgrade.id}`}
                    >
                      {affordable ? 'BUY' : 'TOO EXPENSIVE'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
