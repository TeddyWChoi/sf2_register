'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

type ModalProps = {
  open: boolean;
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  /** sm 480 · md 600 · lg 680 · xl 760 (PC 기준 폭) */
  size?: ModalSize;
  /** 보상 안내 팝업 등 골드 테두리형 */
  variant?: 'default' | 'gold';
  /** 딤 클릭 닫기 (알림 팝업은 false 권장 — SB-04 공통 규칙) */
  closeOnDim?: boolean;
  confirmLabel?: string;
  onConfirm?: () => void;
  bodyClassName?: string;
};

export default function Modal({
  open,
  title,
  onClose,
  children,
  size = 'sm',
  variant = 'default',
  closeOnDim = true,
  confirmLabel = '확인',
  onConfirm,
  bodyClassName,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  // 오픈 시 배경 스크롤 잠금 + 포커스 이동, 닫힘 시 원래 위치로 포커스 복귀
  useEffect(() => {
    if (!open) return;
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.classList.add('is-modal-open');
    dialogRef.current?.focus();
    return () => {
      document.body.classList.remove('is-modal-open');
      lastFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.dim} onClick={closeOnDim ? onClose : undefined}>
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${styles[size]} ${variant === 'gold' ? styles.gold : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
        <div className={`${styles.body} ${bodyClassName ?? ''}`}>{children}</div>
        <div className={styles.footer}>
          <button type="button" className={styles.confirm} onClick={onConfirm ?? onClose}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
