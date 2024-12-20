'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function CoinsImage({ size = 22 }: { size?: number }) {
  const maxCount = 2;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % maxCount);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <SpriteWrapper $size={size}>
      <StyledImage
        $size={size}
        $maxCount={maxCount}
        style={{
          transform: `translateX(-${index * size}px)`,
          transition: 'transform 0.2s steps(1)',
        }}
        src="/sprite/coins.png"
        width={44}
        height={22}
        alt="coins"
      />
    </SpriteWrapper>
  );
}

export default React.memo(CoinsImage);

const SpriteWrapper = styled.div<{
  $size: number;
}>`
  width: ${({ $size }) => $size}px;
  aspect-ratio: 1;
  overflow: hidden;
`;

const StyledImage = styled(Image)<{
  $size: number;
  $maxCount: number;
}>`
  image-rendering: pixelated;
  height: ${({ $size }) => $size}px;
  width: ${({ $size, $maxCount }) => $size * $maxCount}px;
`;
