import Image from 'next/image';
import { EXTERNAL_LINKS, SHOW_HOME_LINK } from '@/data/config';
import styles from './TopIcons.module.scss';

const ICONS = [
  { key: 'home', label: '스페셜포스2 공식 홈페이지', src: '/images/icons/ico_home.svg' },
  { key: 'youtube', label: '스페셜포스2 유튜브', src: '/images/icons/ico_youtube.svg' },
  { key: 'discord', label: '스페셜포스2 디스코드', src: '/images/icons/ico_discord.svg' },
] as const;

/** 상단 외부 링크 아이콘 — 새 창 이동 (URL TBD) */
export default function TopIcons() {
  // 공식 홈페이지 오픈 전에는 홈 아이콘 숨김 (data/config.ts SHOW_HOME_LINK)
  const icons = ICONS.filter((icon) => icon.key !== 'home' || SHOW_HOME_LINK);

  return (
    <ul className={styles.icons}>
      {icons.map((icon) => (
        <li key={icon.key}>
          <a
            className={styles.link}
            href={EXTERNAL_LINKS[icon.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${icon.label} (새 창)`}
          >
            <Image className={styles.img} src={icon.src} alt="" width={22} height={22} />
          </a>
        </li>
      ))}
    </ul>
  );
}
