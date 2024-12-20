'use client';

import { Refresh } from '@react95/icons';
import { useState } from 'react';
import styled from 'styled-components';

import LoadingImage from '@/components/animation/loading-image';
import { Stack } from '@/components/layout/utilities';
import { Pagination } from '@/components/list/pagintaion';
import {
  Button,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/react-95';
import { useReferralList } from '@/requests/user';

const MAX_REFERRAL_COUNT = 5;

export function ReferralList() {
  const [page, setPage] = useState<number>(0);

  const { data, status, refetch, isRefetching } = useReferralList({
    page: page + 1,
    size: MAX_REFERRAL_COUNT,
  });

  return (
    <Stack>
      <StyledDiv>
        {status === 'pending' && <p>Loading...</p>}
        {data?.count === 0 && <p>No referrals yet</p>}
        {Number(data?.count) > 0 && (
          <p>
            You have {data?.count} referral{Number(data?.count) > 1 ? 's' : ''}
          </p>
        )}

        <Button
          square
          disabled={status !== 'success'}
          onClick={() =>
            refetch({
              cancelRefetch: true,
            })
          }
        >
          <Refresh />
        </Button>
      </StyledDiv>

      {(status === 'pending' || isRefetching) && (
        <StyledLoading>
          <LoadingImage />
          <p>Loading...</p>
        </StyledLoading>
      )}
      {status === 'error' && <p>Failed to load referrals</p>}
      {status === 'success' && !isRefetching && (
        <>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledHeadCell>Referrer</StyledHeadCell>
                <StyledHeadCell width={100}>Date</StyledHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Boolean(status === 'success' && Number(data?.count) === 0) && (
                <TableRow>
                  <StyledCell>No referrals yet</StyledCell>
                  <StyledCell>-</StyledCell>
                </TableRow>
              )}
              {data?.list.map((referral) => (
                <TableRow key={referral.id}>
                  <StyledCell>{referral.user.nickname}</StyledCell>
                  <StyledCell>
                    {new Date(referral.created).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </StyledCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
          <div>
            <Pagination
              count={data?.count || 0}
              page={page + 1}
              size={MAX_REFERRAL_COUNT}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </Stack>
  );
}

const StyledLoading = styled.div`
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledTable = styled(Table)`
  min-height: 200px;
`;

const StyledHeadCell = styled(TableHeadCell)`
  font-size: 0.875rem;
  letter-spacing: -0.01rem;
`;

const StyledCell = styled(TableDataCell)`
  font-size: 0.75rem;
  letter-spacing: -0.01rem;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
