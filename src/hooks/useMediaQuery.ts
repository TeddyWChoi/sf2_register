import { useEffect, useState } from 'react';

/** 미디어쿼리 일치 여부. SSR 초기값은 false(PC 기준) */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export const MO_QUERY = '(max-width: 1023px)';
