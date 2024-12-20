import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { MainFrame, MainLayout } from '@/components/layout/mobile-layout';
import BottomTabNavigation from '@/features/navigation/components/bottom-tab';
import { safeParseStoreValue, tokenStoreKey } from '@/states/token-store';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ [key: string]: string }>;
}) {
  const params = await props.params;

  const { children } = props;

  const cookieStore = await cookies();

  const accessToken = safeParseStoreValue(
    cookieStore.get(tokenStoreKey)?.value,
  );

  if (!accessToken) {
    redirect(`/?${new URLSearchParams(params).toString()}`);
  }

  return (
    <MainLayout>
      <MainFrame>{children}</MainFrame>
      <BottomTabNavigation />
    </MainLayout>
  );
}
