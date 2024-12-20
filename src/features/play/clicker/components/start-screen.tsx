import { PageLayout } from '@/app/(authenticated)/play/clicker/styled';
import { Button } from '@/components/react-95';

import Guide from './guide';
import { ClickerPoint } from './point';

interface StartScreenProps {
  ref: React.RefObject<HTMLDivElement | null>;
  playable: boolean;
  onStart: () => void;
}

const StartScreen = ({ ref, playable, onStart }: StartScreenProps) => (
  <PageLayout ref={ref}>
    <Guide />
    <ClickerPoint />
    <Button fullWidth size="lg" onClick={onStart} disabled={!playable}>
      {playable ? 'Start' : 'No playable items'}
    </Button>
    {!playable && (
      <p className="text-center text-sm">
        Sorry, no playable items found. <br />
        Please try again later.
      </p>
    )}
  </PageLayout>
);

export default StartScreen;
