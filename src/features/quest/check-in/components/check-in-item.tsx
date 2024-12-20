import Image from 'next/image';
import styled, { css, keyframes } from 'styled-components';

import { Day } from '@/app/(authenticated)/quest/page';
import CoinsImage from '@/components/animation/coins';
import { Button } from '@/components/react-95';

interface CheckInItemProps {
  status: Day['status'];
  day: number;
  points: number;
  checkIn: () => void;
}

export function CheckInItem({
  status,
  day,
  points,
  checkIn,
}: CheckInItemProps) {
  if (status === 'checkable') {
    return (
      <CheckInButton status={status} onClick={() => checkIn()}>
        <CoinsImage />

        <DayText>Day {day}</DayText>
        <PointText>+{points}</PointText>
      </CheckInButton>
    );
  }

  if (status === 'checked') {
    return (
      <CheckedDay status={status}>
        <Image
          src="/sprite/light-coin.png"
          width={22}
          height={22}
          alt="light coin"
        />

        <DayText>Day {day}</DayText>
        <PointText>+{points}</PointText>
      </CheckedDay>
    );
  }

  if (status === 'checkIn') {
    return (
      <CheckedDay status={status}>
        <Image
          src="/sprite/light-coin.png"
          width={22}
          height={22}
          alt="light coin"
        />

        <DayText>Day {day}</DayText>
        <PointText>+{points}</PointText>
      </CheckedDay>
    );
  }

  if (status === 'disabled') {
    return (
      <CheckInButton status={status} disabled>
        <Image
          src="/sprite/dark-coin.png"
          width={22}
          height={22}
          alt="dark coin"
        />

        <DayText>Day {day}</DayText>
        <PointText>+{points}</PointText>
      </CheckInButton>
    );
  }
}

const borderAnimation = keyframes`
  from {
    border-width: 1px;
  }
  to {
    border-width: 4px;
  }
`;

const CheckInButton = styled(Button)<{ status: Day['status'] }>`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 6.5px 0;
  aspect-ratio: 1/1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CheckedDay = styled.div<{ status: Day['status'] }>`
  display: flex;
  height: 100%;
  padding: 6.5px 0;
  aspect-ratio: 1/1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid #009b05;

  ${({ status }) =>
    status === 'checkIn' &&
    css`
      animation: ${borderAnimation} 1s linear forwards;
    `}
`;

const DayText = styled.div`
  font-size: 14px;
  margin: 0.25rem 0;
`;

const PointText = styled.div`
  font-size: 12px;
`;
