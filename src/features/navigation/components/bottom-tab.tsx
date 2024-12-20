'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import PlayMenuIcon from '@/components/animation/play-menu-icon';

import { BottomTabContainer, Fab, MenuButton } from './style/bottom-tab';

export default function BottomTabNavigation() {
  const pathname = usePathname();
  return (
    <nav>
      <BottomTabContainer>
        <Link href="/dashboard">
          <MenuButton fullWidth active={pathname.startsWith('/dashboard')}>
            <div className="inside">
              <Image
                className="menu-icon"
                src="/menu-icons/home.png"
                width={32}
                height={32}
                alt="Home"
              />
              <span className="menu-title">Home</span>
            </div>
          </MenuButton>
        </Link>
        <Link href="/quest">
          <MenuButton fullWidth active={pathname.startsWith('/quest')}>
            <div className="inside">
              <Image
                className="menu-icon"
                src="/menu-icons/quest.png"
                width={32}
                height={32}
                alt="Quest"
              />
              <span className="menu-title">Quest</span>
            </div>
          </MenuButton>
        </Link>
        <Fab
          href="/play"
          className={pathname.startsWith('/play') ? 'active' : ''}
        >
          <PlayMenuIcon className="fab-icon" />
          <span className="menu-title">Play</span>
        </Fab>
        <Link href="/leaderboard">
          <MenuButton fullWidth active={pathname.startsWith('/leaderboard')}>
            <div className="inside">
              <Image
                className="menu-icon"
                src="/menu-icons/leaderboard.png"
                width={32}
                height={32}
                alt="Leaderboard"
              />
              <span className="menu-title">Leaderboard</span>
            </div>
          </MenuButton>
        </Link>
        <Link href="/myinfo">
          <MenuButton fullWidth active={pathname.startsWith('/myinfo')}>
            <div className="inside">
              <Image
                className="menu-icon"
                src="/menu-icons/myinfo.png"
                width={32}
                height={32}
                alt="My Info"
              />
              <span className="menu-title">My Info</span>
            </div>
          </MenuButton>
        </Link>
      </BottomTabContainer>
    </nav>
  );
}
