import Link from 'next/link';
import styled from 'styled-components';

import { Button, Frame } from '@/components/react-95';

export function XPostRenderer({
  text,
  source,
}: {
  text: string;
  source: string;
}) {
  return (
    <Container>
      <PostBox>
        <p>{text}</p>
      </PostBox>
      {source && (
        <StyledLink href={source} target="_blank" passHref>
          <StyledButton>
            <em>𝕏</em> Post Link
          </StyledButton>
        </StyledLink>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: right;
  margin-bottom: 20px;
`;

const PostBox = styled(Frame).attrs({
  variant: 'well',
})`
  background-color: ${({ theme }) => theme.canvas};
  padding: 0.5rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  letter-spacing: 0.025rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: end;
`;

const StyledButton = styled(Button)`
  & em {
    font-size: 1.25rem;
    font-style: normal;
    margin-right: 0.5rem;
  }

  font-weight: bold;
`;
