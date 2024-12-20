'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function SampleBanner() {
  const maxCount = 2;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % maxCount);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <SpriteWrapper>
      <StyledImage
        $maxCount={maxCount}
        style={{
          transform: `translateX(-${index * (100 / 2)}%)`,
          userSelect: 'none',
        }}
        src="/sprite/sample-banner.jpg"
        width={1200}
        height={320}
        alt="loading..."
      />
    </SpriteWrapper>
  );
}

export default React.memo(SampleBanner);

const SpriteWrapper = styled.div`
  width: 100%;
  aspect-ratio: 600 / 320;
  overflow: hidden;
  position: relative;
`;

const StyledImage = styled(Image)<{
  $maxCount: number;
}>`
  position: absolute;
  height: 100%;
  width: auto;
  aspect-ratio: 1200 / 320;
  image-rendering: pixelated;
`;
