'use client';

import { Ulclient1002 } from '@react95/icons';
import { useCallback } from 'react';
import styled from 'styled-components';

import { WindowModal, useModalState } from '@/components/modal/window-modal';
import { Button, Frame, TextInput } from '@/components/react-95';
import { useMyInfo } from '@/requests/user';

import { ReferralList } from './referral-list';

export function ReferralShare() {
  const { data: userInfo, status } = useMyInfo();
  const { open, openModal, closeModal } = useModalState();

  const handleShare = useCallback(async () => {
    try {
      await navigator.share({
        title: 'Referral Code',
        text: 'Use my referral code : ' + userInfo?.referralCode,
      });
    } catch (error) {
      console.log('Failed to share referral code', error);
      // do nothing
    }
  }, [userInfo?.referralCode]);

  return (
    <>
      <StyledFrame variant="outside">
        <h2 className="title">
          <Ulclient1002 variant="16x16_4" width={24} height={24} />
          Your referral code
        </h2>
        <TextInput
          value={
            status === 'success'
              ? userInfo?.referralCode
              : status === 'pending'
                ? 'Loading...'
                : 'Failed to load information'
          }
          readOnly
        />
        <div className="actions">
          <ActionButton
            size="sm"
            fullWidth
            onClick={openModal}
            disabled={status !== 'success'}
          >
            Check My Referrals
          </ActionButton>
          <ActionButton
            size="sm"
            fullWidth
            onClick={handleShare}
            disabled={status !== 'success'}
          >
            Share
          </ActionButton>
        </div>
      </StyledFrame>
      <StyledModal open={open} onClose={closeModal} onDimClick={closeModal}>
        <ReferralList />
      </StyledModal>
    </>
  );
}

const StyledFrame = styled(Frame)`
  padding: 0.5rem;

  .title {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    vertical-align: middle;
  }

  .actions {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    padding-top: 0.5rem;
  }
`;

export const ActionButton = styled(Button)`
  font-size: 0.875rem;
  height: auto;
  padding: 0.5rem 0.5rem;
`;

export const StyledModal = styled(WindowModal)`
  min-height: 320px;
`;
