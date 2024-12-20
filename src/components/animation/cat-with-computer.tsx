'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function CatWithComputer() {
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
          transform: `translateX(-${index * 120}px)`,
          transition: 'transform 0.2s steps(1)',
          userSelect: 'none',
        }}
        src="/sprite/cat-with-computer.png"
        width={240}
        height={94}
        alt="loading..."
      />
    </SpriteWrapper>
  );
}

export default React.memo(CatWithComputer);

const SpriteWrapper = styled.div`
  width: 120px;
  height: 94px;
  overflow: hidden;
`;

const StyledImage = styled(Image)<{
  $maxCount: number;
}>`
  image-rendering: pixelated;
  height: 94px;
  width: 240px;
`;
