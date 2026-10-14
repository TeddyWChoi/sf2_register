'use client';

import Modal from '@/components/common/Modal';
import { PRIVACY_POLICY_TEXT, TERMS_OF_SERVICE_TEXT } from '@/data/policies';
import styles from './Popup.module.scss';

export type PolicyType = 'terms' | 'privacy';

const POLICIES: Record<PolicyType, { title: string; text: string; heading: RegExp }> = {
  terms: { title: '이용약관', text: TERMS_OF_SERVICE_TEXT, heading: /^제\d+조 / },
  privacy: { title: '개인정보처리방침', text: PRIVACY_POLICY_TEXT, heading: /^\d+\. / },
};

type PolicyPopupProps = {
  type: PolicyType | null;
  onClose: () => void;
};

/**
 * 푸터 정책 레이어 팝업 (P10 개인정보처리방침 / P11 이용약관) — 본문 내부 스크롤
 * 정식 정책 페이지 오픈 시 푸터 링크 이동으로 교체 예정
 */
export default function PolicyPopup({ type, onClose }: PolicyPopupProps) {
  const policy = type ? POLICIES[type] : null;

  return (
    <Modal open={!!policy} title={policy?.title} onClose={onClose} size="xl">
      {policy && (
        <div className={styles.policyScroll} tabIndex={0}>
          {policy.text.split('\n').map((line, i) =>
            line.trim() === '' ? (
              <br key={i} />
            ) : (
              <p key={i} className={policy.heading.test(line) ? styles.policyHeading : undefined}>
                {line}
              </p>
            ),
          )}
        </div>
      )}
    </Modal>
  );
}
