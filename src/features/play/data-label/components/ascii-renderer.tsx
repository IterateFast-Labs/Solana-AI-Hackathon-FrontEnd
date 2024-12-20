import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Frame } from '@/components/react-95';

export function AsciiRenderer({ url }: { url: string }) {
  const [ascii, setAscii] = useState<string>('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => setAscii(data));
  }, [url]);

  return (
    <AsciiBox>
      <StyledPre>{ascii}</StyledPre>
    </AsciiBox>
  );
}

const AsciiBox = styled(Frame).attrs({
  variant: 'well',
})`
  background-color: black;
  padding: 0.5rem;
  width: 300px;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPre = styled.pre`
  width: fit-content;
  height: fit-content;
  color: #00ff00;
  font-size: 3px;
  font-style: normal;
  font-weight: 400;
  line-height: 2px;
  letter-spacing: -0.84px;
  font-family: monospace;
`;
