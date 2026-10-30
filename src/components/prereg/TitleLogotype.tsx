import Image from 'next/image';
import { asset } from '@/lib/asset';
import { PREREG_PERIOD } from '@/data/config';
import styles from './TitleLogotype.module.scss';

/** 슬로건 + S.K.I.L.L. 로고 + 타이틀 + 사전예약 기간 */
export default function TitleLogotype() {
  return (
    <div className={styles.title}>
      <p className={styles.slogan}>
        <span className={styles.sloganLine} aria-hidden="true" />
        <span className={styles.sloganText}>
          다시, <em>전장으로.</em>
        </span>
        <span className={`${styles.sloganLine} ${styles.reverse}`} aria-hidden="true" />
      </p>
      <h1 className={styles.heading}>
        <Image
          className={styles.logo}
          src={asset('/images/main/logo_skill.png')}
          alt="스페셜포스2 S.K.I.L.L."
          width={1882}
          height={488}
          priority
        />
        <Image
          className={styles.operation}
          src={asset('/images/main/logo_operation_reforce.png')}
          alt="Operation RE:FORCE"
          width={1400}
          height={162}
          priority
        />
        <span className={styles.headingText}>지금 사전예약 중</span>
      </h1>
      <p className={styles.period}>
        <span className={styles.periodBadge}>사전예약 기간</span>
        <span className={styles.periodDate}>{PREREG_PERIOD.start}</span>
        <span className={styles.periodTilde} aria-label="부터">
          ~
        </span>
        <span className={styles.periodEnd}>{PREREG_PERIOD.end}</span>
      </p>
    </div>
  );
}
