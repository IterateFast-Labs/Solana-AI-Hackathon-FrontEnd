'use client';

import { ErudaProvider } from './eruda-provider';
import { ReactQueryProvider } from './react-query-provider';
import { StyledComponentProvider } from './styled-component-provider';
import { StyledComponentRegistry } from './styled-component-registry';
import WorldProvider from './world-provider';

export function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErudaProvider>
      <WorldProvider>
        <StyledComponentRegistry>
          <StyledComponentProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </StyledComponentProvider>
        </StyledComponentRegistry>
      </WorldProvider>
    </ErudaProvider>
  );
}
