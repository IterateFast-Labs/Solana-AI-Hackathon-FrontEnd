import { ITEM_COUNT, ITEM_HEIGHT, ITEM_WIDTH } from '../config';
import { BoxPosition, GameDimensions, GameItem, Position } from '../types';

interface UseGameItemsProps {
  dimensions: GameDimensions;
}

export const useGameItems = ({ dimensions }: UseGameItemsProps) => {
  let nextItemId = 0;

  const getBoxBoundaries = ({
    targetBoxPosition,
  }: {
    targetBoxPosition: BoxPosition;
  }) => {
    return {
      left: 0,
      right: dimensions.width,
      top: targetBoxPosition === 'top' ? 0 : dimensions.height / 2,
      bottom:
        targetBoxPosition === 'top' ? dimensions.height / 2 : dimensions.height,
    };
  };

  const generateRandomPosition = () => ({
    left: Math.max(
      0,
      Math.floor(Math.random() * (dimensions.width - ITEM_WIDTH)),
    ),
    top: Math.max(
      0,
      Math.floor(Math.random() * (dimensions.height - ITEM_HEIGHT)),
    ),
  });

  const isCompletelyInBox = ({
    position,
    targetBoxPosition,
  }: {
    position: Position;
    targetBoxPosition: BoxPosition;
  }) => {
    const box = getBoxBoundaries({ targetBoxPosition });
    const itemRight = position.left + ITEM_WIDTH;
    const itemBottom = position.top + ITEM_HEIGHT;

    return (
      position.left >= box.left &&
      itemRight <= box.right &&
      position.top >= box.top &&
      itemBottom <= box.bottom
    );
  };

  const isWithinBounds = ({ position }: { position: Position }) => {
    return (
      position.left >= 0 &&
      position.left + ITEM_WIDTH <= dimensions.width &&
      position.top >= 0 &&
      position.top + ITEM_HEIGHT <= dimensions.height
    );
  };

  const generateRandomSafePosition = ({
    targetBoxPosition,
  }: {
    targetBoxPosition: BoxPosition;
  }): Position => {
    const MAX_ATTEMPTS = 100;
    const box = getBoxBoundaries({ targetBoxPosition });

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const position = generateRandomPosition();
      const itemRight = position.left + ITEM_WIDTH;
      const itemBottom = position.top + ITEM_HEIGHT;

      if (
        isWithinBounds({ position }) &&
        !(
          position.left < box.right &&
          itemRight > box.left &&
          position.top < box.bottom &&
          itemBottom > box.top
        )
      ) {
        return position;
      }
    }

    // Fallback position
    return {
      left: Math.max(
        0,
        Math.floor(Math.random() * (dimensions.width - ITEM_WIDTH)),
      ),
      top:
        targetBoxPosition === 'top' ? dimensions.height - ITEM_HEIGHT - 40 : 40,
    };
  };

  const createItems = ({
    targetBoxPosition,
  }: {
    targetBoxPosition: BoxPosition;
  }): GameItem[] =>
    Array.from({ length: ITEM_COUNT }, () => ({
      id: nextItemId++,
      position: generateRandomSafePosition({ targetBoxPosition }),
      isInBox: false,
    }));

  const moveItemToNewPosition = ({
    items,
    itemId,
    targetBoxPosition,
  }: {
    items: GameItem[];
    itemId: number;
    targetBoxPosition: BoxPosition | null;
  }): GameItem[] =>
    items.map((item) => {
      if (item.id !== itemId) return item;

      const newPosition = generateRandomPosition();
      return {
        ...item,
        position: newPosition,
        isInBox: targetBoxPosition
          ? isCompletelyInBox({
              position: newPosition,
              targetBoxPosition,
            })
          : false,
      };
    });

  return {
    createItems,
    moveItemToNewPosition,
  };
};
