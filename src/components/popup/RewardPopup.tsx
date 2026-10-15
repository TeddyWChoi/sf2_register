'use client';

import Modal from '@/components/common/Modal';
import { asset } from '@/lib/asset';
import { REWARD_ITEMS, REWARD_NOTES } from '@/data/rewards';
import styles from './Popup.module.scss';

type RewardPopupProps = {
  open: boolean;
  onClose: () => void;
};

/** 사전예약 보상 안내 팝업 ("보상 자세히 보기" 클릭 시) */
export default function RewardPopup({ open, onClose }: RewardPopupProps) {
  return (
    <Modal
      open={open}
      title={'«  사전예약 보상 안내  »'}
      onClose={onClose}
      size="lg"
      variant="gold"
      bodyClassName={styles.rewardBody}
    >
      <p className={styles.rewardIntro}>
        사전예약에 참여하신 모든 대원에게 아래 보상을 지급합니다.
      </p>
      <ul className={styles.rewardList}>
        {REWARD_ITEMS.map((item) => (
          <li key={item.name} className={styles.rewardRow}>
            <span className={styles.rewardIcon}>
              {item.icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(item.icon)} alt="" />
              ) : (
                <span className={styles.rewardIconPlaceholder}>아이콘</span>
              )}
            </span>
            <span className={styles.rewardInfo}>
              <strong>{item.name}</strong>
              <span className={item.period === '영구' ? styles.periodPermanent : undefined}>
                {item.period}
              </span>
            </span>
            <span className={styles.rewardAmount}>{item.amount}</span>
          </li>
        ))}
      </ul>
      <ul className={styles.rewardNotes}>
        {REWARD_NOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </Modal>
  );
}
