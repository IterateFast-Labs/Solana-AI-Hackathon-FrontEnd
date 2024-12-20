'use client';

import { useState } from 'react';

import { Button } from '@/components/react-95';
import Guide from '@/features/play/data-label/components/guide';
import { LabellingPoint } from '@/features/play/data-label/components/point';
import { Stage } from '@/features/play/data-label/components/stage';
import { usePlayableDataset } from '@/requests/data-labeling';

import { PageLayout } from './styled';

export default function PlayPage() {
  const [started, setStarted] = useState<boolean>(false);

  const { data: playable } = usePlayableDataset();

  const handleStart = () => {
    if (playable?.length === 0) {
      alert('No playable items found');
      return;
    }

    setStarted(true);
  };

  if (!started) {
    return (
      <PageLayout>
        <Guide />
        <LabellingPoint />
        <Button
          fullWidth
          size="lg"
          onClick={handleStart}
          disabled={!playable?.length}
        >
          {playable?.length ? 'Start' : 'No playable items'}
        </Button>
        {playable?.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '0.875rem' }}>
            Sorry, no playable items found. <br />
            Please try again later.
          </p>
        )}
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Stage
        datasetIds={playable?.map(({ id }) => id) as string[]}
        onComplete={() => setStarted(false)}
      />
    </PageLayout>
  );
}
