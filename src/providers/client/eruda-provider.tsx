'use client';

import { useEffect } from 'react';

export const ErudaProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
      import('eruda').then((lib) => lib.default.init());
    }
  }, []);

  return children;
};
