'use client';

import { styleReset } from 'react95';

/* Original Windows95 font (optional) */
import original from 'react95/dist/themes/original';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  ${styleReset}

  * {
    box-sizing: border-box;
  }

  html {
    overflow: hidden;
    height: 100%;
    min-height: 100svh;
    width: 100%;
  }

  body {
    overscroll-behavior: none;
    -webkit-overflow-scrolling: none;

    min-height: 100svh;
    -webkit-font-smoothing: antialiased;

    background: ${({ theme }) => theme.desktopBackground};
  }
`;

export function StyledComponentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider theme={original}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </>
  );
}

type Theme = typeof original;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
