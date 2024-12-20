import { Stack } from '@/components/layout/utilities';
import { LeaderboardList } from '@/features/leaderboard/components/leaderboard-list';
import { Top3 } from '@/features/leaderboard/components/top-3';

export default function Leaderboard() {
  return (
    <Stack>
      <Top3 />
      <LeaderboardList />
    </Stack>
  );
}
