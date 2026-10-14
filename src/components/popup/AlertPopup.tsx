'use client';

import Modal from '@/components/common/Modal';
import type { AlertMessage } from '@/data/messages';
import styles from './Popup.module.scss';

type AlertPopupProps = {
  message: AlertMessage | null;
  onClose: () => void;
};

/** 알림 팝업 (P5 · P6 · P8 · P9 · 사전예약 완료) — 딤 클릭 닫힘 제외 */
export default function AlertPopup({ message, onClose }: AlertPopupProps) {
  return (
    <Modal open={!!message} title={message?.title} onClose={onClose} closeOnDim={false}>
      {message && (
        <div className={styles.alert}>
          <p className={styles.alertHeading}>{message.heading}</p>
          <p className={styles.alertDesc}>{message.description}</p>
        </div>
      )}
    </Modal>
  );
}
