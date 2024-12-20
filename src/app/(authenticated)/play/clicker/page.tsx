'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import GameBoard from '@/features/play/clicker/components/game-board';
import GameInfo from '@/features/play/clicker/components/game-info';
import GameOverModal from '@/features/play/clicker/components/game-over-modal';
import StartScreen from '@/features/play/clicker/components/start-screen';
import { useGame } from '@/features/play/clicker/hooks/use-game';
import { GameItem } from '@/features/play/clicker/types';

export default function Page() {
  const router = useRouter();

  const {
    layoutRef,
    gameState,
    playable,
    gameStart,
    handleItemMove,
    currentTime,
    targetBoxPosition,
    targetBoxCoordinates,
  } = useGame();

  const handleStart = () => {
    if (!playable) {
      alert('No playable items found');
      return;
    }

    gameStart();
  };

  const handleItemClick = (item: GameItem) => {
    if (item.isInBox) return;
    handleItemMove(item.id);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (!gameState.isGameOver) {
      return;
    }

    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState.isGameOver]);

  if (!gameState.isStarted) {
    return (
      <StartScreen
        ref={layoutRef}
        playable={playable ?? false}
        onStart={handleStart}
      />
    );
  }

  return (
    <>
      <GameBoard
        ref={layoutRef}
        items={gameState.items}
        boxPosition={targetBoxPosition}
        boxCoordinates={targetBoxCoordinates}
        onItemClick={handleItemClick}
      />
      <GameInfo time={currentTime} score={gameState.score} />
      <GameOverModal
        score={gameState.score}
        isOpen={gameState.isGameOver}
        isButtonDisabled={isButtonDisabled}
        onComplete={() => router.replace('/play')}
      />
    </>
  );
}
