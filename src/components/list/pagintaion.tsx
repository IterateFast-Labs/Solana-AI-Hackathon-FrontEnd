import { ArrowLeft, ArrowRight } from '@react95/icons';
import { Button } from 'react95';
import styled from 'styled-components';

export function Pagination({
  count,
  page,
  size,
  onPageChange,
}: {
  count: number;
  page: number;
  size: number;
  onPageChange: (page: number) => void;
}) {
  const maxPage = Math.ceil(count / size);
  return (
    <StyledContainer>
      <StyledButton
        square
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ArrowLeft />
      </StyledButton>
      <p>
        {page} / {maxPage}
      </p>
      <StyledButton
        square
        disabled={page === maxPage}
        onClick={() => onPageChange(page + 1)}
      >
        <ArrowRight />
      </StyledButton>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  &:disabled > svg {
    opacity: 0.3;
  }
`;
