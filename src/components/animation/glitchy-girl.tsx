'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function GlitchyGirl() {
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
        src="/sprite/glitchy-girl.jpg"
        width={560}
        height={180}
        alt="loading..."
      />
    </SpriteWrapper>
  );
}

export default React.memo(GlitchyGirl);

const SpriteWrapper = styled.div`
  width: 100%;
  aspect-ratio: 280 / 180;
  overflow: hidden;
  position: relative;
`;

const StyledImage = styled(Image)<{
  $maxCount: number;
}>`
  position: absolute;
  height: 100%;
  width: auto;
  aspect-ratio: 560 / 180;
  image-rendering: pixelated;
`;
