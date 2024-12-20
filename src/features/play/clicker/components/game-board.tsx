import {
  ClickableItem,
  PageLayout,
  TargetBox,
} from '@/app/(authenticated)/play/clicker/styled';

import {
  ITEM_HEIGHT,
  ITEM_WIDTH,
  TARGET_BOX_HEIGHT_PERCENT,
  TARGET_BOX_WIDTH_PERCENT,
} from '../config';
import { BoxPosition, GameItem, Position } from '../types';

interface GameBoardProps {
  ref: React.RefObject<HTMLDivElement | null>;
  items: GameItem[];
  boxPosition: BoxPosition | null;
  boxCoordinates: Position;
  onItemClick: (item: GameItem) => void;
}

const GameBoard = ({
  ref,
  items,
  boxPosition,
  boxCoordinates,
  onItemClick,
}: GameBoardProps) => (
  <PageLayout ref={ref}>
    {boxPosition && (
      <TargetBox
        style={{
          left: `${boxCoordinates.left}px`,
          top: `${boxCoordinates.top}px`,
          width: `${TARGET_BOX_WIDTH_PERCENT}%`,
          height: `${TARGET_BOX_HEIGHT_PERCENT}%`,
        }}
      />
    )}
    {items.map((item) => (
      <ClickableItem
        key={item.id}
        src="/sprite/error-alert.png"
        alt={`item-${item.id}`}
        width={ITEM_WIDTH}
        height={ITEM_HEIGHT}
        style={{
          left: `${item.position.left}px`,
          top: `${item.position.top}px`,
        }}
        onClick={() => {
          onItemClick(item);
        }}
        $isInBox={item.isInBox}
      />
    ))}
  </PageLayout>
);

export default GameBoard;
