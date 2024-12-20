export interface Position {
  left: number;
  top: number;
}

export interface GameItem {
  id: number;
  position: Position;
  isInBox: boolean;
}

export type BoxPosition = 'top' | 'bottom';

export interface GameState {
  score: number;
  items: GameItem[];
  isStarted: boolean;
  isGameOver: boolean;
  clickerHistoryId: string;
}

export interface GameDimensions {
  width: number;
  height: number;
}
