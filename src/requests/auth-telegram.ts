import { useMutation } from '@tanstack/react-query';

import { client } from './config/axios-instance';

interface LoginWithTelegramPayload {
  telegramId: number;
  telegramName: string;
  telegramHandle?: string;
  referralCode?: string;
}

interface LoginWithTelegramResponse {
  accessToken: string;
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    telegramId: string;
    nickname: string | null;
    userType: 'TELEGRAM';
    telegramHandle: string | null;
    walletAddress: string | null;
    referralCode: string;
  };
}

export async function loginWithTelegram(payload: LoginWithTelegramPayload) {
  const { data } = await client.patch<LoginWithTelegramResponse>(
    '/auth/login/telegram',
    payload,
  );

  return data;
}

export function useLoginWithTelegram() {
  return useMutation({
    mutationFn: loginWithTelegram,
    mutationKey: ['telegram-auth', 'login-with-telegram'],
  });
}

export async function logout() {
  await client.delete('/auth/logout');
}
