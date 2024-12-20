import { useEffect } from 'react';

import { useTimer } from '@/hooks/use-timer';
import {
  useClickerStages,
  useEndClicker,
  useStartClicker,
} from '@/requests/clicker';
import { useInventory } from '@/requests/inventory';

import { LIMIT_TIME } from '../config';
import { BoxPosition } from '../types';
import { useGameItems } from './use-game-items';
import { useGameLayout } from './use-game-layout';
import { useGameState } from './use-game-state';

export const useGame = () => {
  const { gameState, updateGameState, updateScore } = useGameState();
  const {
    time: currentTime,
    start: startTimer,
    stop: stopTimer,
  } = useTimer(LIMIT_TIME);
  const {
    layoutRef,
    dimensions,
    targetBoxCoordinates,
    targetBoxPosition,
    setTargetBoxPosition,
  } = useGameLayout();
  const { createItems, moveItemToNewPosition } = useGameItems({
    dimensions,
  });

  const { data: inventoryData } = useInventory();
  const { data: stagesData } = useClickerStages();
  const { mutate: startClickerMutate } = useStartClicker();
  const { mutate: endClickerMutate } = useEndClicker();

  const handleGameStart = async () => {
    startClickerMutate(
      { clickerStageId: stagesData?.[0].id ?? '' },
      {
        onSuccess: ({ clickerHistory }) => {
          const randomPosition: BoxPosition =
            Math.random() < 0.5 ? 'top' : 'bottom';
          setTargetBoxPosition(randomPosition);

          updateGameState({
            isStarted: true,
            clickerHistoryId: clickerHistory.id,
            items: createItems({ targetBoxPosition: randomPosition }),
          });

          startTimer();
        },
      },
    );
  };

  const handleItemMove = (id: number) => {
    updateGameState({
      score: gameState.score + 10,
      items: moveItemToNewPosition({
        items: gameState.items,
        itemId: id,
        targetBoxPosition,
      }),
    });
  };

  const handleGameClear = async () => {
    stopTimer();
    const finalScore = gameState.score + 1000;
    updateScore({ points: finalScore });

    handleGameEnd({ score: finalScore });
  };

  const handleGameEnd = ({ score }: { score: number }) => {
    stopTimer();
    endClickerMutate(
      {
        userClickerHistoryId: gameState.clickerHistoryId,
        point: score,
      },
      {
        onSuccess: () => updateGameState({ isGameOver: true }),
      },
    );
  };

  useEffect(() => {
    if (currentTime === 0) {
      handleGameEnd({ score: gameState.score });
    }
  }, [currentTime]);

  useEffect(() => {
    if (gameState.items.length === 0) return;

    if (gameState.items.every((item) => item.isInBox)) {
      handleGameClear();
    }
  }, [gameState.items]);

  return {
    layoutRef,
    gameState,
    currentTime,
    targetBoxPosition,
    targetBoxCoordinates,
    gameStart: handleGameStart,
    updateScore,
    handleItemMove,
    playable: inventoryData && inventoryData.clickerTicket > 0,
  };
};
