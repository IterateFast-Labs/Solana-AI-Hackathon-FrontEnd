import { useMutation, useQuery } from '@tanstack/react-query';

import { useTokenStore } from '@/states/token-store';

import { client } from './config/axios-instance';

export async function getPlayableDataset() {
  const { data } = await client.get<{ id: string }[]>('/dataset/playable');

  return data.map((d) => Object.freeze(d));
}

export function usePlayableDataset() {
  const accessToken = useTokenStore((state) => state.accessToken);
  const query = useQuery({
    queryKey: ['dataset', accessToken],
    queryFn: getPlayableDataset,
    enabled: Boolean(accessToken),
  });

  return Object.freeze(query);
}

export interface DatasetDetail {
  id: string;
  title: string;
  type: string;
  text: string | null;
  expectation: boolean;
  url: string;
  source: string;
  datasetTrackId: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  dataSetTrack: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  };
  dataSetOption: {
    id: string;
    dataSetId: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getDatasetDetail(datasetId: string) {
  const { data } = await client.get<DatasetDetail>(`/dataset/${datasetId}`);

  return Object.freeze(data);
}

export function useDatasetDetail(datasetId: string) {
  const accessToken = useTokenStore((state) => state.accessToken);
  const query = useQuery({
    queryKey: ['dataset', datasetId, accessToken],
    queryFn: () => getDatasetDetail(datasetId),
    enabled: Boolean(accessToken && datasetId),
  });

  return Object.freeze(query);
}

export enum InputOption {
  OPTION1 = 'OPTION1',
  OPTION2 = 'OPTION2',
  OPTION3 = 'OPTION3',
  OPTION4 = 'OPTION4',
}

export async function determineDatasetOption({
  dataSetId,
  option,
}: {
  dataSetId: string;
  option: InputOption;
}) {
  const { data } = await client.post<{ point: number }>(`/dataLabeling`, {
    dataSetId,
    inputOption: option,
  });

  return data;
}

export function useDetermineDatasetOption() {
  return useMutation({
    mutationFn: determineDatasetOption,
    mutationKey: ['dataset', 'determine'],
  });
}
