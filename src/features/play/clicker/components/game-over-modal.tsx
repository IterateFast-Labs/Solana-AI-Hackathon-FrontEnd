import { Stack } from '@/components/layout/utilities';
import { WindowModal } from '@/components/modal/window-modal';
import { Button } from '@/components/react-95';

interface GameOverModalProps {
  score: number;
  isOpen: boolean;
  isButtonDisabled: boolean;
  onComplete: () => void;
}

const GameOverModal = ({
  score,
  isOpen,
  isButtonDisabled,
  onComplete,
}: GameOverModalProps) => (
  <WindowModal open={isOpen}>
    <Stack>
      <p>You&apos;ve got {score} point(s)</p>
      <Button onClick={onComplete} disabled={isButtonDisabled}>
        Complete
      </Button>
    </Stack>
  </WindowModal>
);

export default GameOverModal;
