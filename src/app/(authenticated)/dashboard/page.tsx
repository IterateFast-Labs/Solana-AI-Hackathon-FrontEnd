'use client';

import Link from 'next/link';

import SampleBanner from '@/components/animation/sample-banner';
import { Stack } from '@/components/layout/utilities';
import { LabellingPoint } from '@/features/play/data-label/components/point';
import { ReferralShare } from '@/features/user-info/components/referral-share';
import { UserInfoDetail } from '@/features/user-info/components/user-info-detail';

export default function DashboardPage() {
  return (
    <Stack>
      <UserInfoDetail />
      <LabellingPoint />
      <ReferralShare />
      <Link href="/play/data-label">
        <SampleBanner />
      </Link>
    </Stack>
  );
}
