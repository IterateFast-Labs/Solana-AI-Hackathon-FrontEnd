'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function LoadingImage({ size = 32 }: { size?: number }) {
  const maxCount = 9;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % maxCount);
    }, 250);

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
        src="/sprite/connect-loading.png"
        width={288}
        height={32}
        alt="loading..."
      />
    </SpriteWrapper>
  );
}

export default React.memo(LoadingImage);

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
