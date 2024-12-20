'use client';

import styled from 'styled-components';

import { Frame } from '../react-95';

/**
 * Mobile layout
 * - Max width: 640px
 * - Centered
 * - Full height
 */
export const MobileLayout = styled.div`
  max-width: 640px;
  margin: 0 auto;
  height: 100svh;
`;

/**
 * Centered Layout
 * - for loading, error, and other views
 */
export const CenteredLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: safe center;
  flex-direction: column;
  gap: 1rem;
`;

/**
 * Main Layout
 */
export const MainLayout = styled.div`
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  gap: 0px;

  nav {
    background-color: ${({ theme }) => theme.material};
    width: 100%;
    max-width: 624px;
    padding: 3px 4px 8px 4px;
  }
`;

export const MainFrame = styled(Frame).attrs({
  variant: 'window',
})`
  padding: 16px 12px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;
