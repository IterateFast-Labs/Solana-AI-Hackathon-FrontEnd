// import '@react95/icons/icons.css';
import type { Metadata } from 'next';

import { MobileLayout } from '@/components/layout/mobile-layout';
import { ClientSideProvider } from '@/providers/client';

import { fontSans } from './fonts/config';

export const metadata: Metadata = {
  title: 'Fission',
  description: 'Fission is a Next.js starter kit with batteries included.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <ClientSideProvider>
          <MobileLayout>{children}</MobileLayout>
        </ClientSideProvider>
      </body>
    </html>
  );
}
