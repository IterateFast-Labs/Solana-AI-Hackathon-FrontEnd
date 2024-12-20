'use client';

import styled from 'styled-components';

import { Window, WindowContent, WindowHeader } from '@/components/react-95';

export function BasicWindow({
  titleText,
  children,
}: {
  titleText?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <PaddingView>
      <StyledWindow>
        <WindowHeader>{titleText}</WindowHeader>
        <StyledWindowContent>{children}</StyledWindowContent>
      </StyledWindow>
    </PaddingView>
  );
}

export function HeaderArea({ children }: { children?: React.ReactNode }) {
  return <header className="header">{children}</header>;
}

export function BodyArea({ children }: { children?: React.ReactNode }) {
  return <div className="body">{children}</div>;
}

export function BodyCenteredArea({ children }: { children?: React.ReactNode }) {
  return <div className="body centered">{children}</div>;
}

export function ActionArea({ children }: { children?: React.ReactNode }) {
  return <div className={`action`}>{children}</div>;
}

const PaddingView = styled.div`
  padding: 1rem;
  height: 100%;
  width: 100%;
`;

const StyledWindow = styled(Window)`
  width: 100%;
  height: 100%;
`;

const StyledWindowContent = styled(WindowContent)`
  height: calc(100% - 2rem);
  padding: 0.25rem;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & .header {
  }

  & .body {
    flex: 1;
  }

  & .action {
    padding: 0.25rem;
  }
`;
