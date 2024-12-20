import styled from 'styled-components';

import { WindowModal } from '@/components/modal/window-modal';
import {
  Button,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/react-95';
import { CheckInHistory } from '@/requests/check-in';

interface CheckInHistoryProps {
  isOpen: boolean;
  closeModal: () => void;
  checkInHistory: CheckInHistory['checkInHistory'];
}

export function CheckPointsModal({
  isOpen,
  closeModal,
  checkInHistory,
}: CheckInHistoryProps) {
  return (
    <WindowModal
      open={isOpen}
      onDimClick={() => closeModal()}
      option={{
        showHeader: false,
      }}
    >
      <HistoryModalTitle>Check-in Point History</HistoryModalTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Event name</TableHeadCell>
            <TableHeadCell>Received</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkInHistory.map((history) => (
            <StyledRow key={history.eventName}>
              <TableDataCell>{history.eventName}</TableDataCell>
              <TableDataCell>{history.points}</TableDataCell>
            </StyledRow>
          ))}
          <StyledRow key={'123'}>
            <TableDataCell>{'qwe'}</TableDataCell>
            <TableDataCell>{'asd'}</TableDataCell>
          </StyledRow>
          <StyledRow key={'234'}>
            <TableDataCell>{'zxc'}</TableDataCell>
            <TableDataCell>{'zcxv'}</TableDataCell>
          </StyledRow>
        </TableBody>
      </Table>
      <CloseButton onClick={() => closeModal()}>Close</CloseButton>
    </WindowModal>
  );
}

const HistoryModalTitle = styled.h3`
  background-color: #060084;
  color: white;
  padding: 5.5px 8px;
  margin-bottom: 12px;
`;

const StyledRow = styled(TableRow)`
  & > td:first-child {
    border-right: 1px solid #848584;
  }
  & > td {
    border-bottom: 1px solid #848584;
  }
  & > td {
    font-weight: normal;
  }
`;

const CloseButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
`;
