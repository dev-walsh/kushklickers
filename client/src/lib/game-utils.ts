export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
}

export function calculateUpgradeCost(baseCost: number, currentQuantity: number, costMultiplier: number): number {
  const multiplier = Math.pow(costMultiplier / 100, currentQuantity);
  return Math.floor(baseCost * multiplier);
}

export function generateRandomUsername(): string {
  const adjectives = ['Green', 'High', 'Chill', 'Blazed', 'Mellow', 'Cosmic', 'Zen', 'Fresh'];
  const nouns = ['Grower', 'Smoker', 'Farmer', 'Master', 'King', 'Queen', 'Legend', 'Pro'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  
  return `${adjective}${noun}${number}`;
}

export function getAchievementProgress(player: any, achievement: any): number {
  switch (achievement.requirementType) {
    case 'total_kush':
      return player.totalKush;
    case 'total_clicks':
      return player.totalClicks;
    case 'upgrades_bought':
      // This would need to be calculated based on player upgrades
      return 0;
    default:
      return 0;
  }
}

export function playClickSound(): void {
  // Web Audio API implementation for click sound
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    // Silent fail if audio context is not available
  }
}
