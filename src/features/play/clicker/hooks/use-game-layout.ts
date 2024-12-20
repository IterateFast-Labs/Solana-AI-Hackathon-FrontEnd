import { useCallback, useEffect, useRef, useState } from 'react';

import { BoxPosition, GameDimensions, Position } from '../types';

export const useGameLayout = () => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<GameDimensions>({
    width: 0,
    height: 0,
  });
  const [targetBoxPosition, setTargetBoxPosition] =
    useState<BoxPosition | null>(null);
  const [targetBoxCoordinates, setTargetBoxCoordinates] = useState<Position>({
    left: 0,
    top: 0,
  });

  const calculateBoxPosition = useCallback(
    (width: number, height: number, position: BoxPosition) => {
      const top = position === 'top' ? 0 : height / 2;

      return { left: 0, top };
    },
    [],
  );

  const updateDimensions = useCallback(() => {
    if (!layoutRef.current) return;

    const { width, height } = layoutRef.current.getBoundingClientRect();
    setDimensions({ width, height });

    if (targetBoxPosition) {
      const coordinates = calculateBoxPosition(
        width,
        height,
        targetBoxPosition,
      );
      setTargetBoxCoordinates(coordinates);
    }
  }, [targetBoxPosition, calculateBoxPosition]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  return {
    layoutRef,
    dimensions,
    targetBoxCoordinates,
    targetBoxPosition,
    setTargetBoxPosition,
  };
};
