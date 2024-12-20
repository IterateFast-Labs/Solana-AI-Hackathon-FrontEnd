import { Stack } from '@/components/layout/utilities';
import { Button, GroupBox } from '@/components/react-95';
import { LogoutButton } from '@/features/auth-common/components/logout-button';
import { LabellingPointSimple } from '@/features/play/data-label/components/point';
import { UserInfoDetail } from '@/features/user-info/components/user-info-detail';

export default function MyInfoPage() {
  return (
    <Stack>
      <UserInfoDetail />
      <GroupBox label="Account">
        <Stack $gap="1rem">
          <Button fullWidth disabled>
            Change My Nickname (Coming Soon)
          </Button>
          <Button fullWidth disabled>
            Update My Referral(Coming Soon)
          </Button>
        </Stack>
      </GroupBox>
      <GroupBox label="Data Labelling">
        <Stack $gap="1rem">
          <Stack $gap="0.25rem">
            <p>Your Point:</p>
            <LabellingPointSimple />
          </Stack>
          <Button fullWidth disabled>
            Play History (Coming Soon)
          </Button>
        </Stack>
      </GroupBox>
      <LogoutButton />
    </Stack>
  );
}
