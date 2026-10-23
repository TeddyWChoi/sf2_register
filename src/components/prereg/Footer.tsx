import Image from 'next/image';
import { asset } from '@/lib/asset';
import type { PolicyType } from '@/components/popup/PolicyPopup';
import styles from './Footer.module.scss';

type FooterProps = {
  onOpenPolicy: (type: PolicyType) => void;
};

/**
 * 사전예약 푸터 — 정책 링크는 정식 페이지 준비 전까지 레이어 팝업으로 노출
 * 등급표시(img_grade_sf2)는 공홈 푸터 이미지 임시 사용 — 사전예약 오픈 시 삭제 예정
 * (법무 검토 2026-10-23: 등급분류 전에는 등급 표시 불필요). 등급분류번호 발급 후 새 이미지로 다시 노출
 */
export default function Footer({ onOpenPolicy }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.info}>
          <div className={styles.logos}>
            <Image
              className={styles.logoPapaya}
              src={asset('/images/footer/logo_papaya.png')}
              alt="papaya play"
              width={216}
              height={44}
            />
            <Image
              className={styles.logoDragonfly}
              src={asset('/images/footer/logo_dragonfly.png')}
              alt="DragonFly"
              width={220}
              height={32}
            />
          </div>
          <ul className={styles.links}>
            <li>
              <button type="button" className={styles.link} onClick={() => onOpenPolicy('terms')}>
                이용약관
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.link} ${styles.privacy}`}
                onClick={() => onOpenPolicy('privacy')}
              >
                개인정보처리방침
              </button>
            </li>
          </ul>
          <p className={styles.copyright}>
            © DRAGONFLY GF CO., LTD. All rights reserved.
            <br />
            Published by Vertigo Games, Inc.
          </p>
        </div>
        <Image
          className={styles.grade}
          src={asset('/images/footer/img_grade_sf2.png')}
          alt="게임물 등급 정보 — 제명: 스페셜포스2, 이용등급: 청소년 이용불가, 제작년월일: 2010년 12월 29일, 상호: (주)드래곤플라이, 등급분류번호: CC-NP-101229-007, 신고(등록)번호: 제 2006-000027호"
          width={826}
          height={230}
        />
      </div>
    </footer>
  );
}
