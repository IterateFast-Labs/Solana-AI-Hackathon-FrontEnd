import { useRef, useState } from 'react';

export const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const start = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(initialTime);
  };

  return {
    time,
    isRunning,
    start,
    stop,
    reset,
  };
};
