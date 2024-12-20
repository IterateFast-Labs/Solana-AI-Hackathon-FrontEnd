'use client';

import styled from 'styled-components';

import Smile3d from '@/components/animation/smile-3d';
import { Frame } from '@/components/react-95';
import { useLeaderboard } from '@/requests/leaderboard';

import { shortenPoints } from '../utils';

export function Top3() {
  const { data } = useLeaderboard();

  const spliced = data?.leaderboard.slice(0, 3);

  return (
    <ChartView variant="outside">
      <div className="icon-top">
        <Smile3d />
      </div>
      <ol>
        <StyledBar $order={2} $height={160} $disabled={!Boolean(spliced?.[0])}>
          <span className="rank">1st</span>
          {Boolean(spliced?.[0]?.nickname) && (
            <span className="nickname">{spliced?.[0]?.nickname}</span>
          )}
          {Boolean(spliced?.[0]?.totalPoints) && (
            <span className="points">
              {shortenPoints(spliced?.[0]?.totalPoints)} Point
            </span>
          )}
        </StyledBar>
        <StyledBar $order={1} $height={130} $disabled={!Boolean(spliced?.[1])}>
          <span className="rank">2st</span>
          {Boolean(spliced?.[1]?.nickname) && (
            <span className="nickname">{spliced?.[1]?.nickname}</span>
          )}
          {Boolean(spliced?.[1]?.totalPoints) && (
            <span className="points">
              {shortenPoints(spliced?.[1]?.totalPoints)} Point
            </span>
          )}
        </StyledBar>
        <StyledBar $order={3} $height={100} $disabled={!Boolean(spliced?.[2])}>
          <span className="rank">3st</span>

          {Boolean(spliced?.[2]?.nickname) && (
            <span className="nickname">{spliced?.[2]?.nickname}</span>
          )}

          {Boolean(spliced?.[2]?.totalPoints) && (
            <span className="points">
              {shortenPoints(spliced?.[2]?.totalPoints)} Point
            </span>
          )}
        </StyledBar>
      </ol>
    </ChartView>
  );
}

const ChartView = styled(Frame)`
  padding: 20px 12px 12px 12px;

  background: url('/95-patterns/circles.jpg');
  background-repeat: repeat;

  ol {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 8px;
  }

  & .icon-top {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
`;

const StyledBar = styled.li<{
  $height?: number;
  $order?: number;
  $disabled?: boolean;
}>`
  order: ${({ $order }) => $order};
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height}px;
  background-color: white;
  border-top: 6px solid #808080;
  border-left: 6px solid #808080;
  border-bottom: 6px solid black;
  border-right: 6px solid black;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 6px;
    background-color: #c0c0c0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 6px;
    height: 100%;
    background-color: #c0c0c0;
  }

  .rank {
    position: absolute;
    top: 6px;
    left: calc(50% - 2px);
    transform: translateX(-50%);
    padding: 2px 4px;
    font-size: 12px;
    font-weight: bold;
    background-color: #c0c0c0;
  }

  .nickname {
    position: absolute;
    bottom: 12px;
    left: 4px;
    width: calc(100% - 16px);
    font-size: 10px;
    font-weight: bold;
    word-break: break-all;
    text-align: center;
    line-height: 1.1;
  }

  .points {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 0;
    font-size: 12px;
    font-weight: bold;
    color: yellow;
    text-align: center;
    width: 100%;
  }
`;
