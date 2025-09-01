import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useGameState() {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Initialize or get player
  useEffect(() => {
    const initializePlayer = async () => {
      const savedPlayerId = localStorage.getItem('kushKlickerPlayerId');
      
      if (savedPlayerId) {
        // Verify player exists in database
        try {
          const response = await apiRequest('GET', `/api/players/${savedPlayerId}`);
          if (response.ok) {
            setPlayerId(savedPlayerId);
            return;
          }
        } catch (error) {
          // Player doesn't exist, create new one
        }
      }
      
      // Get Telegram user data if available
      const tgData = (window as any).Telegram?.WebApp?.initDataUnsafe;
      const telegramUserId = tgData?.user?.id?.toString();
      const telegramUsername = tgData?.user?.username ? `@${tgData.user.username}` : null;
      
      // Create new player with Telegram data or fallback to random username
      const username = telegramUsername || `player_${Math.random().toString(36).substr(2, 9)}`;
      try {
        const response = await apiRequest('POST', '/api/players', {
          telegramUserId: telegramUserId || null,
          username,
          totalKush: 0,
          totalClicks: 0,
          perClickMultiplier: 1,
          autoIncomePerHour: 0,
          claimableTokens: 0
        });
        const newPlayer = await response.json();
        setPlayerId(newPlayer.id);
        localStorage.setItem('kushKlickerPlayerId', newPlayer.id);
      } catch (error) {
        console.error('Failed to create player:', error);
      }
    };

    initializePlayer();
  }, []);

  // Get player data
  const { data: gameState, isLoading, error } = useQuery({
    queryKey: ['/api/players', playerId],
    enabled: !!playerId,
    retry: (failureCount, error: any) => {
      // If player not found, clear localStorage and trigger re-initialization
      if (error?.status === 404 && playerId) {
        localStorage.removeItem('kushKlickerPlayerId');
        setPlayerId(null);
        window.location.reload(); // Force refresh to create new player
        return false;
      }
      return failureCount < 3;
    }
  });

  // Auto-income simulation
  useEffect(() => {
    if (!gameState || typeof gameState !== 'object' || !('autoIncomePerHour' in gameState) || !gameState.autoIncomePerHour || gameState.autoIncomePerHour === 0) return;

    const interval = setInterval(() => {
      const incomePerSecond = ((gameState as any)?.autoIncomePerHour || 0) / 3600;
      
      queryClient.setQueryData(['/api/players', playerId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          totalKush: Math.floor(oldData.totalKush + incomePerSecond)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, playerId, queryClient]);

  const defaultGameState = {
    id: playerId || '',
    telegramUserId: null,
    username: 'player',
    totalKush: 0,
    totalClicks: 0,
    perClickMultiplier: 1,
    autoIncomePerHour: 0,
    claimableTokens: 0,
    walletAddress: null,
    referredBy: null,
    createdAt: new Date(),
    lastActive: new Date()
  };

  return {
    gameState: gameState || defaultGameState,
    isLoading: isLoading && !gameState,
    error
  };
}
