import { useQuery } from '@tanstack/react-query';

import { useTokenStore } from '@/states/token-store';

import { client } from './config/axios-instance';
import { ListResponse, PaginationParams } from './types/list';

export interface UserDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  telegramId: string;
  userName: string | null;
  userType: 'WORLD' | 'TELEGRAM';
  telegramHandle: string | null;
  walletAddress: string | null;
  referralCode: string;
}

export async function getMyInfo() {
  const { data } = await client.get<UserDetail>('/user/myInfo');
  return data;
}

export function useMyInfo() {
  const accessToken = useTokenStore((state) => state.accessToken);
  return useQuery({
    queryKey: ['user', 'myInfo', accessToken],
    queryFn: getMyInfo,
    enabled: Boolean(accessToken),
  });
}

export interface UserReferral {
  id: string;
  created: string;
  updated: string;
  referralId: string;
  referredId: string;
  user: {
    nickname: string | null;
    telegramHandle: string | null;
  };
}

export async function getReferralList(params: PaginationParams) {
  const { data } = await client.get<ListResponse<UserReferral>>(
    '/user/referral',
    {
      params: {
        page: params.page,
        size: params.size,
      },
    },
  );

  await new Promise((resolve) => setTimeout(resolve, 500));
  return data;
}

export function useReferralList(params: PaginationParams) {
  const accessToken = useTokenStore((state) => state.accessToken);
  return useQuery({
    queryKey: ['user', 'referralList', accessToken],
    queryFn: () => getReferralList(params),
    enabled: Boolean(accessToken),
  });
}

export async function getMyPoint() {
  const { data } = await client.get<number>('/user/myPoint');
  return data;
}

export function useMyPoint() {
  const accessToken = useTokenStore((state) => state.accessToken);
  return useQuery({
    queryKey: ['user', 'myPoint', accessToken],
    queryFn: getMyPoint,
    enabled: Boolean(accessToken),
  });
}
