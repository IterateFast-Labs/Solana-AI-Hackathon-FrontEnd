'use client';

import { Confcp118 } from '@react95/icons';
import Link from 'next/link';

import { CenteredLayout } from '@/components/layout/mobile-layout';
import { Button } from '@/components/react-95';

export default function Loading() {
  return (
    <CenteredLayout>
      <Confcp118 width={64} height={64} />
      <p>Oops! Something went wrong.</p>
      <Link href="/">
        <Button>Go back</Button>
      </Link>
    </CenteredLayout>
  );
}
