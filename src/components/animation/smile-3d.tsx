'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Smile3D() {
  const maxCount = 450 / 25;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % maxCount);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <SpriteWrapper>
      <StyledImage
        $maxCount={maxCount}
        style={{
          transform: `translateX(-${index * 25}px)`,
          userSelect: 'none',
        }}
        src="/sprite/smile-3d.png"
        width={450}
        height={22}
        alt="loading..."
      />
    </SpriteWrapper>
  );
}

export default React.memo(Smile3D);

const SpriteWrapper = styled.div`
  width: 25px;
  height: 22px;
  overflow: hidden;
`;

const StyledImage = styled(Image)<{
  $maxCount: number;
}>`
  image-rendering: pixelated;
`;
