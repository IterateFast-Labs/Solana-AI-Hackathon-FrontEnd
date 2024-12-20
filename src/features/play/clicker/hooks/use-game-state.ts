import { useState } from 'react';

import { GameState } from '../types';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    items: [],
    isStarted: false,
    isGameOver: false,
    clickerHistoryId: '',
  });

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const updateScore = ({ points }: { points: number }) => {
    setGameState((prev) => ({
      ...prev,
      score: points,
    }));
  };

  return {
    gameState,
    updateGameState,
    updateScore,
  };
};
