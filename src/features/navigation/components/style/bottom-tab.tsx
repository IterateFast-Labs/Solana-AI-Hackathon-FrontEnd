'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { Button } from '@/components/react-95';

export const BottomTabContainer = styled.div`
  display: flex;
  gap: 3px;

  & > * {
    flex: 1;
  }
`;

export const SwitchButton = styled(Button)`
  margin: 0 -1px;
  height: 54px;
`;

export const MenuButton = styled(SwitchButton)`
  &.featured {
    background-color: #f870ff;
  }

  & .inside {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  & .menu-title {
    font-size: 10px;
    line-height: 1;
    text-shadow: 0.5px 0.5px 0px #fff;
  }

  & .menu-icon {
    image-rendering: pixelated;
    filter: drop-shadow(0px 0px 1px #000000);
  }
`;

export const Fab = styled(Link)`
  z-index: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2px;
  background: #b96ac9;
  border-top: 4px solid #e980fc;
  border-left: 4px solid #e980fc;
  border-bottom: 4px solid #6f2dbd;
  border-right: 4px solid #6f2dbd;

  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.45);

  &:after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    background-size: 30px;
    background-repeat: no-repeat;
    filter: drop-shadow(1px 1px 0px #e980fc) drop-shadow(-1px -1px 0px #6f2dbd);
    background-position: center;
  }

  &:active,
  &.active {
    border-bottom: 4px solid #e980fc;
    border-right: 4px solid #e980fc;
    border-top: 4px solid #6f2dbd;
    border-left: 4px solid #6f2dbd;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.55);

    &:after {
      background-position: 50% calc(50% + 2px);
    }
  }

  & .fab-icon {
    image-rendering: pixelated;
    flex-shrink: 0;
  }

  & .menu-title {
    font-size: 10px;
    line-height: 1;
    text-shadow: 0.5px 0.5px 0px #fff;
  }

  & .menu-icon {
    image-rendering: pixelated;
    filter: drop-shadow(0px 0px 1px #000000);
  }
`;
