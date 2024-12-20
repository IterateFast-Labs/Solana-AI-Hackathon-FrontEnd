import {
  InfoFrame,
  ScoreCounter,
} from '@/app/(authenticated)/play/clicker/styled';
import { Counter } from '@/components/react-95';

interface GameInfoProps {
  time: number;
  score: number;
}

const GameInfo = ({ time, score }: GameInfoProps) => (
  <InfoFrame>
    <Counter minLength={3} value={time} />
    <ScoreCounter minLength={6} value={score} />
  </InfoFrame>
);

export default GameInfo;
