'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Stack } from '@/components/layout/utilities';
import { WindowModal } from '@/components/modal/window-modal';
import { Button } from '@/components/react-95';
import {
  InputOption,
  useDatasetDetail,
  useDetermineDatasetOption,
} from '@/requests/data-labeling';
import { useTokenStore } from '@/states/token-store';

import { AsciiRenderer } from './ascii-renderer';
import { EmojiRenderer } from './emoji-renderer';
import { XPostRenderer } from './x-post-renderer';

export function Stage({
  datasetIds,
  onComplete,
}: {
  datasetIds: string[];

  onComplete: () => void;
}) {
  const {
    data: determineResult,
    mutateAsync,
    isSuccess: didDetermined,
    reset: resetDetermineResult,
  } = useDetermineDatasetOption();
  const queryClient = useQueryClient();
  const [stageIndex, setStageIndex] = useState<number>(0);

  const { data: detail } = useDatasetDetail(datasetIds[stageIndex]);
  const accessToken = useTokenStore((state) => state.accessToken);

  useEffect(() => {
    return () => {
      setStageIndex(0);
      queryClient.invalidateQueries({
        exact: true,
        queryKey: ['dataset', accessToken],
      });
      queryClient.invalidateQueries({
        exact: true,
        queryKey: ['user', 'myPoint', accessToken],
      });
    };
  }, []);

  const handleEndStage = async () => {
    if (stageIndex !== datasetIds.length) {
      return;
    }

    await queryClient.invalidateQueries({
      exact: true,
      queryKey: ['dataset', accessToken],
    });

    await queryClient.invalidateQueries({
      exact: true,
      queryKey: ['user', 'myPoint', accessToken],
    });

    onComplete();
  };

  const handleDetermine = async (option: InputOption) => {
    await mutateAsync({
      dataSetId: datasetIds[stageIndex],
      option,
    });

    setStageIndex((prev) => prev + 1);
  };

  return (
    <>
      <Stack>
        <p>
          Stage : {stageIndex + 1} / {datasetIds.length}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {detail?.type === 'ASCII' && <AsciiRenderer url={detail.url} />}
          {detail?.type === 'EMOJI' && (
            <EmojiRenderer text={detail?.text || ''} />
          )}
          {detail?.type === 'X_POST' && (
            <XPostRenderer text={detail?.text || ''} source={detail.source} />
          )}
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {detail?.title || ' '}
        </p>
        {detail?.dataSetOption && (
          <ButtonGroup>
            {detail?.dataSetOption.option1 && (
              <Button
                size="lg"
                onClick={() => handleDetermine(InputOption.OPTION1)}
              >
                {detail?.dataSetOption.option1}
              </Button>
            )}
            {detail?.dataSetOption.option2 && (
              <Button
                size="lg"
                onClick={() => handleDetermine(InputOption.OPTION2)}
              >
                {detail?.dataSetOption.option2}
              </Button>
            )}
            {detail?.dataSetOption.option3 && (
              <Button
                size="lg"
                onClick={() => handleDetermine(InputOption.OPTION3)}
              >
                {detail?.dataSetOption.option3}
              </Button>
            )}
            {detail?.dataSetOption.option4 && (
              <Button
                size="lg"
                onClick={() => handleDetermine(InputOption.OPTION4)}
              >
                {detail?.dataSetOption.option4}
              </Button>
            )}
          </ButtonGroup>
        )}
      </Stack>
      <WindowModal open={didDetermined}>
        <Stack>
          <p>
            You&apos;ve got {determineResult?.point} point(s) for this stage
          </p>
          <Button onClick={resetDetermineResult}>Next</Button>
        </Stack>
      </WindowModal>
      <WindowModal
        open={stageIndex === datasetIds.length && !didDetermined}
        showCloseButton
      >
        <Stack>
          <p>
            You&apos;ve completed all stages. <br />
            Click the button below to finish the game.
          </p>
          <Button onClick={handleEndStage}>Next</Button>
        </Stack>
      </WindowModal>
    </>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  & > button {
    flex-basis: calc(50% - 1rem);
  }
`;
