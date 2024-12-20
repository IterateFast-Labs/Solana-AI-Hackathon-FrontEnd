import { useQuery } from '@tanstack/react-query';

import { useTokenStore } from '@/states/token-store';

import { client } from './config/axios-instance';
import { UserDetail } from './user';

export interface Inventory {
  id: string;
  userId: string;
  user: UserDetail;
  clickerTicket: number;
  created: Date;
  updated: Date;
}

export async function getInventory() {
  const { data } = await client.get<Inventory>('/user/inventory');
  return data;
}

export function useInventory() {
  const accessToken = useTokenStore((state) => state.accessToken);
  return useQuery({
    queryKey: ['user', 'inventory', accessToken],
    queryFn: getInventory,
    enabled: Boolean(accessToken),
  });
}
