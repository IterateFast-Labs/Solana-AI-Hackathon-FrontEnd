'use client';

import styled from 'styled-components';

import LoadingImage from '@/components/animation/loading-image';
import {
  Frame,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/react-95';
import { useLeaderboard } from '@/requests/leaderboard';

import { shortenPoints } from '../utils';

export function LeaderboardList() {
  const { data, status } = useLeaderboard();

  return (
    <div>
      <Caption>
        * Point = Labelling + Referral
        <br />
        ** This leaderboard is updated every hour
      </Caption>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell width={'40px'}>#</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell width={'90px'}>*Point</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Boolean(data?.userRank) && (
            <StyledRow $rank={data?.userRank.rank} $mine>
              <StyledDataCell $centered $bold>
                {data?.userRank.rank}
              </StyledDataCell>
              <StyledDataCell>
                You<small>({data?.userRank.nickname})</small>
              </StyledDataCell>
              <StyledDataCell $centered>
                {shortenPoints(data?.userRank.totalPoints)}
              </StyledDataCell>
            </StyledRow>
          )}
          {data?.leaderboard?.map((item) => (
            <StyledRow
              key={item.rank + '-' + item.totalPoints}
              $rank={item.rank}
            >
              <StyledDataCell $centered $bold>
                {item.rank}
              </StyledDataCell>
              <StyledDataCell>{item.nickname}</StyledDataCell>
              <StyledDataCell $centered>
                {shortenPoints(item.totalPoints)}
              </StyledDataCell>
            </StyledRow>
          ))}
        </TableBody>
      </Table>
      {status === 'pending' && (
        <StyledLoading>
          <LoadingImage />
          <p>Loading...</p>
        </StyledLoading>
      )}
    </div>
  );
}

const Caption = styled.p`
  font-size: 0.75rem;
  letter-spacing: -0.5px;
  margin-bottom: 0.25rem;
`;

const StyledRow = styled(TableRow)<{
  $rank?: number;
  $mine?: boolean;
}>`
  background-color: ${(props) => {
    if (Number(props.$rank) % 2 === 0) {
      return '#f0f0f0';
    }
  }};

  border-bottom: ${(props) => (props.$mine ? '4px solid black' : 'none')};

  & td {
    background-color: ${(props) => {
      if (Number(props.$rank) === 1) {
        return '#ffd900';
      }
      if (props.$mine) {
        return '#b0ddff';
      }
    }};

    font-weight: ${(props) => (props.$mine ? 'bold' : 'normal')};
    text-decoration: ${(props) => (props.$mine ? 'underline' : 'none')};
  }
`;

const StyledDataCell = styled(TableDataCell)<{
  $centered?: boolean;
  $bold?: boolean;
}>`
  text-align: ${(props) => (props.$centered ? 'center' : 'left')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0;

  font-size: 0.875rem;
  font-weight: ${(props) => (props.$bold ? 'bold' : 'normal')};
  border: 1px solid ${({ theme }) => theme.borderDark};

  & small {
    font-size: 0.75rem;
    font-weight: normal;
  }
`;

const StyledLoading = styled(Frame).attrs({
  variant: 'well',
})`
  margin-top: -4px;
  background-color: ${({ theme }) => theme.canvas};
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;
