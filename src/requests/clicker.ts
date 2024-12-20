import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useTokenStore } from '@/states/token-store';

import { client } from './config/axios-instance';

export interface ClickerStage {
  id: string;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export async function getAllClickerStages() {
  const { data } = await client.get<ClickerStage[]>('/clicker');

  return data;
}

export function useClickerStages() {
  const accessToken = useTokenStore((s) => s.accessToken);
  return useQuery({
    queryKey: ['clicker'],
    queryFn: getAllClickerStages,
    enabled: Boolean(accessToken),
  });
}

export async function getClickerStageById(id?: string) {
  if (!id) {
    return null;
  }
  const { data } = await client.get(`/clicker/${id}`);

  return data;
}

export function useClickerStageById(id?: string) {
  const accessToken = useTokenStore((s) => s.accessToken);
  return useQuery({
    queryKey: ['clicker', id],
    queryFn: () => getClickerStageById(id),
    enabled: Boolean(id) && Boolean(accessToken),
  });
}

export interface ClickerHistory {
  id: string;
  clickerStageId: string;
  userId: string;
  point: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function startClicker({
  clickerStageId,
}: {
  clickerStageId: string;
}) {
  const { data } = await client.post<{
    clickerHistory: ClickerHistory;
  }>('/clicker/start', {
    clickerStageId,
  });

  return data;
}

export async function endClicker({
  userClickerHistoryId,
  point,
}: {
  userClickerHistoryId: string;
  point: number;
}) {
  const { data } = await client.post('/clicker/end', {
    userClickerHistoryId,
    point,
  });

  return data;
}

export function useStartClicker() {
  return useMutation({
    mutationKey: ['startClicker'],
    mutationFn: startClicker,
  });
}

export function useEndClicker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['endClicker'],
    mutationFn: endClicker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
