'use client';

import { Gcdef10001, Gcdef10003, Gcdef10005 } from '@react95/icons';
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
            <span>Watch where the target box appears</span>
          </li>
          <li>
            <Gcdef10003 className="icon" />
            <span>
              Click on error alerts to move them toward the target box
            </span>
          </li>
          <li>
            <Gcdef10005 className="icon" />
            <span>Get all alerts into the box before time runs out!</span>
          </li>
          <hr style={{ width: '100%' }} />
          <GuideCentered>
            <p>
              Each click earns you 10 points! <br />
              Clear the stage for a 1000 point bonus!
            </p>
            <CatWithComputer />
          </GuideCentered>
        </GuideList>
      </Stack>
    </GroupBox>
  );
}

export default Guide;

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
