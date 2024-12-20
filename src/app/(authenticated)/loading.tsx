import LoadingImage from '@/components/animation/loading-image';
import { CenteredLayout } from '@/components/layout/mobile-layout';

export default function Loading() {
  return (
    <CenteredLayout>
      <LoadingImage size={128} />
      <p>Loading...</p>
    </CenteredLayout>
  );
}
