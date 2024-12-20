'use client';

import { Main100 } from '@react95/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Dragable from 'react-draggable';
import styled from 'styled-components';

import { fontSans } from '@/app/fonts/config';
import GlitchyGirl from '@/components/animation/glitchy-girl';
import {
  Button,
  Frame,
  Window,
  WindowContent,
  WindowHeader,
} from '@/components/react-95';

export default function Page() {
  return (
    <>
      <StyledFrame variant="well">
        <LinkList>
          <StyledLink href={'/play/clicker'}>
            <div className="icon">
              <Main100 width={64} height={64} />
            </div>

            <span style={fontSans.style}>Clicker</span>
          </StyledLink>
          <StyledLink href={'/play/data-label'}>
            <div className="icon">
              <Image
                src={'/menu-icons/labeling.png'}
                width={64}
                height={64}
                alt="Labeling"
              />
            </div>

            <span style={fontSans.style}>Labeling</span>
          </StyledLink>
        </LinkList>

        <Egg />
      </StyledFrame>
    </>
  );
}

const LinkList = styled.div`
  padding-top: 250px;
  width: 100%;
  height: 100%;
`;

// 바탕화면 버튼
const StyledLink = styled(Link)`
  background-color: transparent;
  border: none;
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  padding: 2px 4px;

  & > .icon {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:focus > .icon {
    mix-blend-mode: overlay;
  }

  & > span {
    font-size: 16px;
    padding: 2px 4px;
    color: white;
    text-align: center;
    letter-spacing: 0.8px;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
  }

  &:focus > span {
    outline: 2px dotted yellow;
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

function Egg() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  return (
    <Dragable
      handle=".handle"
      nodeRef={nodeRef as unknown as React.RefObject<HTMLElement>}
      onDrag={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
    >
      <StyledWindow
        ref={nodeRef}
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
        }}
      >
        <StyledWindowHeader
          className="handle"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          <span>Ř§Ů©©Ř§Ů????½ </span>
        </StyledWindowHeader>
        <StyledWindowContent>
          <GlitchyGirl />
          <Button fullWidth disabled>
            How to Play
          </Button>
        </StyledWindowContent>
      </StyledWindow>
    </Dragable>
  );
}

const StyledFrame = styled(Frame)`
  position: relative;
  width: 100%;
  height: calc(100% - 8px);
  background-color: ${({ theme }) => theme.desktopBackground};
  overflow: hidden;
  padding: 4px;
`;

const StyledWindow = styled(Window)`
  width: 200px;
`;

const StyledWindowHeader = styled(WindowHeader)`
  & > span {
    pointer-events: none;
    user-select: none;
  }
`;

const StyledWindowContent = styled(WindowContent)`
  padding: 4px;
  display: flex;
  flex-direction: column;

  gap: 8px;
`;
