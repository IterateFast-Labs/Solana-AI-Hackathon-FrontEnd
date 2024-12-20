import { useMutation } from '@tanstack/react-query';
import { ISuccessResult } from '@worldcoin/minikit-js';

import { client } from './config/axios-instance';

interface LoginWithWorldPayload {
  payload: ISuccessResult;
  action: string;
  worldAddress: string;
  userType: 'WORLD';
}

// type LoginWithWorldResponse = void;
interface LoginWithWorldResponse {
  accessToken: string;
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    telegramId: string;
    nickname: string | null;
    userType: 'WORLD';
    telegramHandle: string | null;
    walletAddress: string | null;
    referralCode: string;
  };
}

export async function loginWithWorld(payload: LoginWithWorldPayload) {
  const { data } = await client.patch<LoginWithWorldResponse>(
    '/auth/login/world',
    payload,
  );

  return data;
}

export function useLoginWithWorld() {
  return useMutation({
    mutationFn: loginWithWorld,
    mutationKey: ['world-auth', 'login-with-world'],
  });
}
