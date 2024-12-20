import { useMutation, useQuery } from '@tanstack/react-query';

import { client } from './config/axios-instance';

export interface CheckInInfo {
  checkInHistory: {
    id: string;
    day: number;
    checkInEventId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  currentCheckIn: {
    id: string;
    title: string;
    count: number;
    defaultPoint: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

export async function getCheckIn() {
  const { data } = await client.get<CheckInInfo>('/quests/checkIn');

  return Object.freeze(data);
}

export function useCheckInInfo() {
  return useQuery({
    queryKey: ['quests', 'checkIn'],
    queryFn: getCheckIn,
  });
}

export async function checkIn({
  day,
  checkInEventId,
}: {
  day: number;
  checkInEventId: string;
}) {
  const { data } = await client.post('/quests/checkIn', {
    day,
    checkInEventId,
  });

  return data;
}

export function useCheckIn() {
  return useMutation({
    mutationFn: checkIn,
    mutationKey: ['quests', 'checkIn'],
  });
}

export interface CheckInHistory {
  checkInHistory: {
    eventName: string;
    points: number;
  }[];
  userId: string;
}

export async function getCheckInHistory() {
  const { data } = await client.get<CheckInHistory>('/quests/checkInHistory');

  return Object.freeze(data);
}

export function useCheckInHistory() {
  return useQuery({
    queryKey: ['quests', 'checkInHistory'],
    queryFn: getCheckInHistory,
  });
}
