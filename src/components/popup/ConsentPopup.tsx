'use client';

import Modal from '@/components/common/Modal';
import type { ConsentDetail } from '@/data/consents';
import styles from './Popup.module.scss';

type ConsentPopupProps = {
  detail: ConsentDetail | null;
  onClose: () => void;
};

/** 약관 상세 팝업 3종 — [확인]/[X]/딤 클릭 시 닫힘, 체크 상태 변경 없음 */
export default function ConsentPopup({ detail, onClose }: ConsentPopupProps) {
  return (
    <Modal open={!!detail} title={detail?.title} onClose={onClose} size="md">
      {detail?.type === 'table' && (
        <div className={styles.consent}>
          <p className={styles.text}>{detail.intro}</p>
          <table className={styles.table}>
            {detail.columns && (
              <thead>
                <tr>
                  <th scope="col">{detail.columns[0]}</th>
                  <th scope="col">{detail.columns[1]}</th>
                </tr>
              </thead>
            )}
            <tbody>
              {detail.rows.map((row) =>
                detail.columns ? (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ) : (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <p className={styles.text}>{detail.note}</p>
        </div>
      )}
      {detail?.type === 'sections' && (
        <dl className={styles.sections}>
          {detail.sections.map((section) => (
            <div key={section.heading}>
              <dt>{section.heading}</dt>
              <dd>{section.body}</dd>
            </div>
          ))}
        </dl>
      )}
    </Modal>
  );
}
