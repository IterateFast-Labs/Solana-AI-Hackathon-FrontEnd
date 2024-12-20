import {
  ERR_RETRIEVE_LP_FAILED,
  LaunchParams,
  TypedError,
  User,
  retrieveLaunchParams,
} from '@telegram-apps/sdk';
import { useEffect, useRef, useState } from 'react';

export function useTelegram() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isTMA, setIsTMA] = useState<boolean>(true);
  const launchParams = useRef<LaunchParams>(undefined);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);
    try {
      const params = retrieveLaunchParams();
      launchParams.current = params;
      setIsTMA(true);
      setUser(params.initData?.user);
    } catch (error: unknown) {
      if (error instanceof TypedError) {
        if (error.type === ERR_RETRIEVE_LP_FAILED) {
          setIsTMA(false);
        }
      }
    }

    setLoading(false);

    return () => {
      launchParams.current = undefined;
    };
  }, []);

  return {
    isTMA,
    launchParams: launchParams.current,
    telegramUser: user,
    isChecking: loading,
  };
}
