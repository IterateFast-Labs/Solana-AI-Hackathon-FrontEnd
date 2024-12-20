'use client';

import { MiniKit } from '@worldcoin/minikit-js';
import { useEffect } from 'react';

export default function WorldProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    MiniKit.install(process.env.NEXT_PUBLIC_WORLD_APP_ID);
  }, []);

  return <>{children}</>;
}
