'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import AlertPopup from '@/components/popup/AlertPopup';
import ConsentPopup from '@/components/popup/ConsentPopup';
import PolicyPopup, { type PolicyType } from '@/components/popup/PolicyPopup';
import RewardPopup from '@/components/popup/RewardPopup';
import type { ConsentDetail } from '@/data/consents';
import type { AlertMessage } from '@/data/messages';
import Footer from './Footer';
import PreregForm from './PreregForm';
import RewardColumn from './RewardColumn';
import TitleLogotype from './TitleLogotype';
import TopIcons from './TopIcons';
import styles from './PreregPage.module.scss';

export default function PreregPage() {
  const [alert, setAlert] = useState<AlertMessage | null>(null);
  const alertCloseRef = useRef<(() => void) | undefined>();
  const [consent, setConsent] = useState<ConsentDetail | null>(null);
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [policy, setPolicy] = useState<PolicyType | null>(null);

  const openAlert = useCallback((message: AlertMessage, onClose?: () => void) => {
    alertCloseRef.current = onClose;
    setAlert(message);
  }, []);

  const closeAlert = useCallback(() => {
    setAlert(null);
    alertCloseRef.current?.();
    alertCloseRef.current = undefined;
  }, []);

  const closeConsent = useCallback(() => setConsent(null), []);
  const closeReward = useCallback(() => setIsRewardOpen(false), []);
  const closePolicy = useCallback(() => setPolicy(null), []);

  return (
    <>
      <main className={styles.page}>
        <section className={styles.stage}>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.bg}>
              <Image src="/images/main/bg.jpg" alt="" fill priority sizes="100vw" />
            </div>
            <div className={styles.canvas}>
              <span className={styles.faceLight} />
              <div className={styles.character}>
                <Image src="/images/main/char_hero.png" alt="" fill priority sizes="800px" />
              </div>
            </div>
            <span className={styles.gradCenter} />
            <span className={styles.gradTopBottom} />
          </div>

          <TopIcons />

          <div className={styles.title}>
            <TitleLogotype />
          </div>
        </section>

        <section className={styles.panelWrap} aria-label="사전예약 신청">
          <div className={styles.panel}>
            <div className={styles.rewardCol}>
              <RewardColumn onOpenDetail={() => setIsRewardOpen(true)} />
            </div>
            <div className={styles.formCol}>
              <PreregForm onAlert={openAlert} onOpenConsent={setConsent} />
            </div>
            <span className={`${styles.bracket} ${styles.tl}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.tr}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.bl}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.br}`} aria-hidden="true" />
          </div>
        </section>
      </main>

      <Footer onOpenPolicy={setPolicy} />

      <ConsentPopup detail={consent} onClose={closeConsent} />
      <RewardPopup open={isRewardOpen} onClose={closeReward} />
      <PolicyPopup type={policy} onClose={closePolicy} />
      <AlertPopup message={alert} onClose={closeAlert} />
    </>
  );
}
