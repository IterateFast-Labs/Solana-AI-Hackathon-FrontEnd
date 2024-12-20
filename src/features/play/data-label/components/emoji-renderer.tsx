import styled from 'styled-components';

import { Frame } from '@/components/react-95';

export function EmojiRenderer({ text }: { text: string }) {
  return <EmojiBox>{text}</EmojiBox>;
}

const EmojiBox = styled(Frame).attrs({
  variant: 'well',
})`
  background-color: ${({ theme }) => theme.canvas};
  padding: 0.5rem;
  width: 300px;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.75rem;
`;
