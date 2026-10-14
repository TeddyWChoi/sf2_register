import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 초 단위 카운트다운. start(sec) 호출 시 시작, 0 도달 시 onExpire 실행.
 */
export function useCountdown(onExpire?: () => void) {
  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endAtRef = useRef(0);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const start = useCallback(
    (sec: number) => {
      stop();
      endAtRef.current = Date.now() + sec * 1000;
      setRemaining(sec);
      timerRef.current = setInterval(() => {
        const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000));
        setRemaining(left);
        if (left === 0) {
          stop();
          onExpireRef.current?.();
        }
      }, 250);
    },
    [stop],
  );

  const reset = useCallback(() => {
    stop();
    setRemaining(0);
  }, [stop]);

  useEffect(() => stop, [stop]);

  return { remaining, start, stop, reset };
}

export const formatMMSS = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
