'use client';

import styled from 'styled-components';

import { Frame } from '@/components/react-95';

export const StyledFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  padding: 2rem;

  & div.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

export const IconView = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
