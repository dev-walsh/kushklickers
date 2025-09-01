import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface MainClickerProps {
  gameState: {
    id: string;
    totalKush: number;
    perClickMultiplier: number;
  };
  onClickEffect: (x: number, y: number, value: number) => void;
}

export default function MainClicker({ gameState, onClickEffect }: MainClickerProps) {
  const [isClicking, setIsClicking] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const clickMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/api/players/${gameState.id}/click`);
      return response.json();
    },
    onSuccess: (data) => {
      // Update the game state in cache
      queryClient.setQueryData(['/api/players', gameState.id], data.player);
    },
    onError: (error) => {
      console.error('Click error:', error);
      toast({
        title: "Click Error",
        description: "Failed to process click. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (clickMutation.isPending) return;

    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 300);

    // Get click position for floating text effect
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    onClickEffect(x, y, gameState.perClickMultiplier);
    
    // Process the click
    clickMutation.mutate();
  };

  return (
    <div className="text-center mb-8">
      {/* Floating Kush Counter */}
      <div className="relative inline-block mb-4">
        <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">
          +{gameState.perClickMultiplier}
        </div>
        
        {/* Main Kush Button */}
        <button
          onClick={handleClick}
          disabled={clickMutation.isPending}
          className={`kush-button w-48 h-48 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center text-white font-bold text-xl md:text-2xl shadow-2xl relative overflow-hidden ${
            isClicking ? 'click-animation' : ''
          } ${clickMutation.isPending ? 'opacity-70' : ''}`}
          data-testid="button-main-kush"
        >
          <i className="fas fa-cannabis text-4xl md:text-6xl mb-2"></i>
          <span className="text-lg md:text-xl">KUSH</span>
          <div className={`absolute inset-0 rounded-full bg-white/20 transition-transform duration-300 ${isClicking ? 'scale-100' : 'scale-0'}`}></div>
        </button>
      </div>

      <h3 className="text-xl font-semibold text-primary mb-2" data-testid="text-clicker-title">
        🌿 Kush Klicker
      </h3>
      <p className="text-muted-foreground" data-testid="text-click-reward">
        Click to earn = +{gameState.perClickMultiplier} KUSH
      </p>

      {/* Quick Stats Bar */}
      <div className="bg-card rounded-xl p-4 border border-border mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Click to earn</span>
          <span className="text-primary font-semibold" data-testid="text-click-value">+{gameState.perClickMultiplier} KUSH</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '15%' }}></div>
        </div>
      </div>
    </div>
  );
}
