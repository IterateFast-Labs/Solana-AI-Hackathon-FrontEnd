'use client';

import { Drvspace7 } from '@react95/icons';
import { useMemo } from 'react';
import styled from 'styled-components';

import { Frame } from '@/components/react-95';
import { useMyInfo } from '@/requests/user';

export function UserInfoDetail() {
  const { data: userInfo, status } = useMyInfo();

  const timePassed = useMemo(() => {
    if (!userInfo?.createdAt) return '';

    const now = new Date();
    const createdAt = new Date(userInfo.createdAt);
    const diff = now.getTime() - createdAt.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      const diffHours = Math.floor(diff / (1000 * 60 * 60));

      if (diffHours < 1) {
        const diffMinutes = Math.floor(diff / (1000 * 60));

        if (diffMinutes < 1) {
          return 'just now';
        }

        return `${diffMinutes} minutes ago`;
      }

      return `${diffHours} hours ago`;
    }

    return `${diffDays} days ago`;
  }, [userInfo?.createdAt]);

  return (
    <div>
      <DetailArea>
        <ProfileFrame>
          <Drvspace7 width={64} height={64} />
        </ProfileFrame>

        <div className="detail">
          {status === 'pending' && <p className="item">Loading...</p>}
          {status === 'success' && (
            <>
              <h2 className="title">{userInfo?.userName}</h2>
              {userInfo?.telegramHandle && (
                <p className="item">@{userInfo.telegramHandle}</p>
              )}
              {userInfo.userType === 'WORLD' && (
                <p className="item">Worldcoin user</p>
              )}
              <p className="item">Signed up {timePassed}</p>
            </>
          )}
          {status === 'error' && (
            <p className="item">Failed to load information</p>
          )}
        </div>
      </DetailArea>
    </div>
  );
}

const ProfileFrame = styled(Frame).attrs({
  variant: 'well',
})`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.desktopBackground};
  background-image: url('/95-patterns/metal_links.jpg');
  background-repeat: repeat;
  aspect-ratio: 1 / 1;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.canvas};
`;

const DetailArea = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 2px;
  align-items: center;

  .detail {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    word-break: break-all;
    gap: 0.25rem;
    padding-right: 0.25rem;
  }

  .detail .title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .detail .item {
    font-size: 0.875rem;
    letter-spacing: -0.03rem;
  }
`;
