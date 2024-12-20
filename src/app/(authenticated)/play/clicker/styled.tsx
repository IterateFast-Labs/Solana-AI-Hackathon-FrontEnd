import styled from 'styled-components';

import { Counter, Frame, WindowContent } from '@/components/react-95';

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

export const TargetBox = styled(WindowContent)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: inset 0px 0px 6px 2px rgba(0, 0, 0, 0.75);
  transition: all 0.3s ease;
`;

export const ClickableItem = styled.img<{ $isInBox: boolean }>`
  position: absolute;
  cursor: ${(props) => (props.$isInBox ? 'default' : 'pointer')};
  border: ${(props) => props.$isInBox && '1px solid #000'};
  opacity: ${(props) => props.$isInBox && 0.7};
  z-index: ${(props) => (props.$isInBox ? 0 : 1)};
  transition: all 0.15s ease;
`;

export const InfoFrame = styled(Frame).attrs({
  variant: 'window',
})`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 2;
  width: 100%;
  bottom: 0px;
  height: 64px;
  transform: translateX(-50%);
  left: 50%;
`;

export const ScoreCounter = styled(Counter)`
  margin-left: auto;
`;
