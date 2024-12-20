import { redirect } from 'next/navigation';

import { BasicWindow } from '@/components/layout/window';
import { AuthSwitcher } from '@/features/auth-common/components/auth-switcher';

export default async function Page() {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
    redirect('/auth-telegram');
  }

  return (
    <BasicWindow titleText="Auth Switcher">
      <AuthSwitcher />
    </BasicWindow>
  );
}
