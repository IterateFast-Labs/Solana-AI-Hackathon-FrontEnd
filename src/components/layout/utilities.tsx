'use client';

import styled from 'styled-components';

export const Stack = styled.div<{
  $gap?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || '1rem'};
  width: 100%;
`;
