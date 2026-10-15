import Image from 'next/image';
import { asset } from '@/lib/asset';
import styles from './RewardColumn.module.scss';

type RewardColumnProps = {
  onOpenDetail: () => void;
};

/** 사전예약자 보상 대표 이미지 (보상 9종 키비주얼, Figma: reward_key_visual) */
export default function RewardColumn({ onOpenDetail }: RewardColumnProps) {
  return (
    <section className={styles.reward} aria-labelledby="reward-title">
      <h2 id="reward-title" className={styles.title}>
        «&nbsp;&nbsp;사전예약자 보상&nbsp;&nbsp;»
      </h2>
      <div className={styles.visual}>
        <Image
          className={styles.img}
          src={asset('/images/main/reward_main.jpg')}
          alt="사전예약자 보상 대표 이미지"
          fill
          sizes="(max-width: 1023px) 100vw, 332px"
        />
        <span className={styles.shade} aria-hidden="true" />
        <button type="button" className={styles.pill} onClick={onOpenDetail}>
          보상 자세히 보기 <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
