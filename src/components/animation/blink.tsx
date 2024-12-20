'use client';

import { useEffect, useState } from 'react';

export function Blink({
  as,
  children,
  interval = 500,
}: {
  as?: React.ElementType;
  children?: React.ReactNode;
  interval?: number;
}) {
  const Element = as ?? 'span';

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible((prev) => !prev);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  return (
    <Element
      style={{
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      {children}
    </Element>
  );
}
