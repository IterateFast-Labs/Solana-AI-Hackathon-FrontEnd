'use client';

import React, { ComponentProps } from 'react';
import { WindowContent } from 'react95';
import styled from 'styled-components';

import { Button, Window, WindowHeader } from '../react-95';

export interface WindowModalProps extends ComponentProps<'dialog'> {
  header?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onDimClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClose?: () => void;
  children?: React.ReactNode;
  option?: {
    showHeader?: boolean;
  };
}

export function useModalState() {
  const [open, setOpen] = React.useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return { open, openModal, closeModal };
}

export function WindowModal({
  header,
  className,
  children,
  open,
  showCloseButton = true,
  onDimClick,
  onClose,
  option: { showHeader = true } = {},
}: WindowModalProps) {
  if (!open) return null;
  return (
    <>
      <Dim onClick={onDimClick} />
      <StyledDialog open={open}>
        <StyledWindow className={className}>
          {showHeader && (
            <StyledWindowHeader>
              <div>{header}</div>
              {showCloseButton && (
                <Button className="close" onClick={onClose}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 7 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 0.5V1.5H1.5V2.5H2.5V3.5H3.5M3.5 3.5H4.5V2.5H5.5V1.5H6.5V0.5M3.5 3.5V4.5M0.5 7.5V6.5H1.5V5.5H2.5V4.5H3.5M6.5 7.5V6.5H5.5V5.5H4.5V4.5H3.5"
                      stroke="black"
                    />
                  </svg>
                </Button>
              )}
            </StyledWindowHeader>
          )}
          <StyledWindowContent>{children}</StyledWindowContent>
        </StyledWindow>
      </StyledDialog>
    </>
  );
}

const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.desktopBackground};
  opacity: 0.8;
  z-index: 10;
`;

const StyledDialog = styled.dialog`
  padding: 0;
  border: none;
  background: transparent;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
  right: 1rem;
  width: calc(100% - 2rem);
  z-index: 99;

  height: auto;
  max-width: 640px;
  margin: 0 auto;
`;

const StyledWindow = styled(Window)`
  width: 100%;
  height: 100%;
  position: relative;
  max-height: calc(100svh - 2rem);
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledWindowContent = styled(WindowContent)`
  padding: 0.5rem;
  max-height: calc(100svh - 5rem);
  overflow-y: auto;
  height: 100%;
`;
