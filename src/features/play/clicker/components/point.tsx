'use client';

import styled from 'styled-components';

import { Counter, Frame, GroupBox } from '@/components/react-95';
import { useMyPoint } from '@/requests/user';

export function ClickerPoint() {
  const { data, status } = useMyPoint();
  return (
    <StyledGroupBox label="Your Point">
      <div className="counter-wrap">
        {status === 'success' && <StyledCounter minLength={1} value={data} />}
        {status !== 'success' && <StyledFrame />}
      </div>
    </StyledGroupBox>
  );
}

const StyledFrame = styled(Frame).attrs({
  variant: 'well',
})`
  width: 100%;
  background-color: black;
  height: 50px;
  margin-bottom: -6px;
`;

const StyledGroupBox = styled(GroupBox)``;

const StyledCounter = styled(Counter)`
  width: 100%;
  display: flex;
  justify-content: end;
`;
