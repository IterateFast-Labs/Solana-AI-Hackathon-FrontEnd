'use client';

import { Gcdef10001, Gcdef10003, Gcdef10005 } from '@react95/icons';
import React from 'react';
import styled from 'styled-components';

import CatWithComputer from '@/components/animation/cat-with-computer';
import { Stack } from '@/components/layout/utilities';
import { GroupBox } from '@/components/react-95';

function Guide() {
  return (
    <GroupBox
      label="How to play"
      style={{
        display: 'flex',
      }}
    >
      <Stack>
        <GuideList>
          <li>
            <Gcdef10001 className="icon" />
            <span>Read the image and question provided</span>
          </li>
          <li>
            <Gcdef10003 className="icon" />
            <span>Choose the answer that feels right to you</span>
          </li>
          <li>
            <Gcdef10005 className="icon" />
            <span>Move on to the next one until you&apos;re done!</span>
          </li>
          <hr style={{ width: '100%' }} />
          <GuideCentered>
            <p>
              If you choose with care, you&apos;ll earn points! <br />
              Remember, go with what you feel!
            </p>
            <CatWithComputer />
          </GuideCentered>
        </GuideList>
      </Stack>
    </GroupBox>
  );
}

export default React.memo(Guide);

const GuideList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  & > li {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
    font-size: 0.825rem;
    font-weight: bold;

    .icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
  }
`;

const GuideCentered = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.825rem;
  align-items: center;
  text-align: center;
`;
