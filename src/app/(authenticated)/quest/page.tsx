'use client';

import { useEffect, useState } from 'react';
import { Separator } from 'react95';
import styled from 'styled-components';

import { Stack } from '@/components/layout/utilities';
import { Button, Frame } from '@/components/react-95';
import { CheckInItem } from '@/features/quest/check-in/components/check-in-item';
import { CheckPointsModal } from '@/features/quest/check-in/components/check-points-modal';
import {
  useCheckIn,
  useCheckInHistory,
  useCheckInInfo,
} from '@/requests/check-in';

export type Day = {
  day: number;
  points: number;
  status: 'checkIn' | 'checked' | 'checkable' | 'disabled';
};

export default function QuestPage() {
  const { data: checkInData } = useCheckInInfo();
  const { data: checkInHistoryData } = useCheckInHistory();
  const { mutate: checkIn } = useCheckIn();

  const [openPointsModal, setOpenPointsModal] = useState(false);

  const [days, setDays] = useState<Day[]>(() =>
    Array.from({ length: 8 }).map((_, index) => ({
      day: index + 1,
      points: 0,
      status: 'disabled',
    })),
  );

  const handleCheckIn = (day: number) => {
    if (!checkInData) {
      return;
    }
    checkIn(
      { day, checkInEventId: checkInData.currentCheckIn.id },
      {
        onSuccess: () =>
          setDays((prev) =>
            prev.map((prevDay) =>
              prevDay.day === day ? { ...prevDay, status: 'checkIn' } : prevDay,
            ),
          ),
      },
    );
  };

  useEffect(() => {
    if (!checkInData) {
      return;
    }

    const startDate = new Date(checkInData.currentCheckIn.startDate);
    const today = new Date();

    // 이벤트 시작일로부터 오늘까지의 일수 계산 (1부터 시작)
    const daysSinceStart =
      Math.floor(
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;

    // 오늘 체크인 했는지 확인
    const checkedToday = checkInData.checkInHistory.some(
      (history) => history.day === daysSinceStart,
    );

    setDays((prev) =>
      prev.map((day) => {
        // 이미 체크인한 날인지 확인
        const isCheckedIn = checkInData.checkInHistory.some(
          (history) => history.day === day.day,
        );

        let status: Day['status'] = 'disabled';

        if (isCheckedIn) {
          // 이미 체크인한 날
          status = 'checked';
        } else if (day.day === daysSinceStart && !checkedToday) {
          // 오늘이고 아직 체크인하지 않은 경우
          status = 'checkable';
        } else {
          // 미래 날짜 || 과거이고 체크인 하지 않은 경우
          status = 'disabled';
        }

        return {
          ...day,
          status,
          points: checkInData.currentCheckIn.defaultPoint,
        };
      }),
    );
  }, [checkInData]);

  const startDate = checkInData?.currentCheckIn.startDate
    ? new Date(checkInData.currentCheckIn.startDate).toLocaleDateString()
    : '2000.00.00';
  const endDate = checkInData?.currentCheckIn.endDate
    ? new Date(checkInData.currentCheckIn.endDate).toLocaleDateString()
    : '2000.00.00';

  return (
    <Stack>
      <div>
        <CheckInTitle>
          Daily {checkInData?.currentCheckIn.title || ''}
        </CheckInTitle>
        <CheckInDescription>
          Check in daily and earn points to get reward!
          <br />
          Period: {startDate} ~ {endDate}
        </CheckInDescription>
      </div>

      <Grid>
        {days.map((day) => (
          <CheckInItem
            key={day.day}
            {...day}
            checkIn={() => handleCheckIn(day.day)}
          />
        ))}
      </Grid>

      <ButtonContainer>
        <Button onClick={() => setOpenPointsModal(true)}>Check Points</Button>
      </ButtonContainer>

      <Separator />

      <div>
        <QuestsTitle>Quests</QuestsTitle>
        <ComingSoonContainer>Coming Soon</ComingSoonContainer>
      </div>

      <CheckPointsModal
        isOpen={openPointsModal}
        closeModal={() => setOpenPointsModal(false)}
        checkInHistory={checkInHistoryData?.checkInHistory ?? []}
      />
    </Stack>
  );
}

const CheckInTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

const CheckInDescription = styled.p`
  font-size: 14px;
  margin: 8px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const QuestsTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ComingSoonContainer = styled(Frame)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
`;
