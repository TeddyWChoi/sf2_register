'use client';

import { useEffect, useRef, useState } from 'react';
import Checkbox from '@/components/common/Checkbox';
import { AGREEMENTS, type AgreementKey, type ConsentDetail } from '@/data/consents';
import {
  AUTH_CODE_LENGTH,
  AUTH_CODE_TTL_SEC,
  AUTH_LOCK_MINUTES,
  AUTH_MAX_FAIL,
  PHONE_MAX_LENGTH,
} from '@/data/config';
import { ALERTS, INLINE_MESSAGES, type AlertMessage } from '@/data/messages';
import { formatMMSS, useCountdown } from '@/hooks/useCountdown';
import { MO_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { sendAuthCode, submitPrereg, verifyAuthCode } from '@/lib/preregApi';
import styles from './PreregForm.module.scss';

const PHONE_REGEX = /^01[016789]\d{7,8}$/;

const INITIAL_AGREEMENTS: Record<AgreementKey, boolean> = {
  collect: false,
  entrust: false,
  age: false,
  marketingCollect: false,
  marketing: false,
};

type PreregFormProps = {
  onAlert: (message: AlertMessage, onClose?: () => void) => void;
  onOpenConsent: (detail: ConsentDetail) => void;
};

export default function PreregForm({ onAlert, onOpenConsent }: PreregFormProps) {
  const isMo = useMediaQuery(MO_QUERY);

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [agreements, setAgreements] = useState(INITIAL_AGREEMENTS);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const timer = useCountdown(() => {
    setIsExpired(true);
    onAlert(ALERTS.expired);
  });

  useEffect(
    () => () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    },
    [],
  );

  const allChecked = AGREEMENTS.every((item) => agreements[item.key]);
  const requiredChecked = AGREEMENTS.filter((item) => item.required).every(
    (item) => agreements[item.key],
  );

  const canSend = !isVerified && !isLocked && !isPending;
  const canVerify =
    isCodeSent &&
    !isExpired &&
    !isVerified &&
    !isLocked &&
    !isPending &&
    code.length === AUTH_CODE_LENGTH;
  const canSubmit = isVerified && requiredChecked && !isPending;

  const resetAuth = () => {
    timer.reset();
    setIsCodeSent(false);
    setIsExpired(false);
    setCode('');
  };

  const resetForm = () => {
    resetAuth();
    setPhone('');
    setPhoneError(false);
    setIsVerified(false);
    setFailCount(0);
    setAgreements(INITIAL_AGREEMENTS);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH));
    setPhoneError(false);
    // 발송 후 번호를 변경하면 인증 진행 상태 초기화
    if (isCodeSent) resetAuth();
  };

  const handleSend = async () => {
    if (!canSend) return;
    if (!PHONE_REGEX.test(phone)) {
      setPhoneError(true);
      return;
    }

    setIsPending(true);
    const result = await sendAuthCode(phone);
    setIsPending(false);

    switch (result.status) {
      case 'sent':
        setCode('');
        setIsCodeSent(true);
        setIsExpired(false);
        timer.start(AUTH_CODE_TTL_SEC);
        codeInputRef.current?.focus();
        break;
      case 'duplicate':
        onAlert(ALERTS.duplicate);
        break;
      case 'locked':
        lockAuth();
        break;
      default:
        onAlert(ALERTS.serverError);
    }
  };

  const lockAuth = () => {
    resetAuth();
    setIsLocked(true);
    onAlert(ALERTS.authLocked);
    lockTimerRef.current = setTimeout(
      () => {
        setIsLocked(false);
        setFailCount(0);
      },
      AUTH_LOCK_MINUTES * 60 * 1000,
    );
  };

  const handleVerify = async () => {
    if (!canVerify) return;

    setIsPending(true);
    const result = await verifyAuthCode(phone, code);
    setIsPending(false);

    switch (result.status) {
      case 'verified':
        timer.stop();
        setIsVerified(true);
        break;
      case 'mismatch': {
        const nextCount = failCount + 1;
        setFailCount(nextCount);
        if (nextCount >= AUTH_MAX_FAIL) lockAuth();
        else onAlert(ALERTS.codeMismatch);
        break;
      }
      case 'expired':
        timer.reset();
        setIsExpired(true);
        onAlert(ALERTS.expired);
        break;
      default:
        onAlert(ALERTS.serverError);
    }
  };

  const handleAllAgree = (checked: boolean) => {
    setAgreements({
      collect: checked,
      entrust: checked,
      age: checked,
      marketingCollect: checked,
      marketing: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsPending(true);
    const result = await submitPrereg({ phone, agreements });
    setIsPending(false);

    if (result.status === 'complete') {
      // TBD(SB-09 #13): 완료 후 폼 초기화 vs 완료 상태 유지 — 현재 초기화로 처리
      onAlert(ALERTS.complete, resetForm);
    } else if (result.status === 'duplicate') {
      onAlert(ALERTS.duplicate);
    } else {
      onAlert(ALERTS.serverError);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>휴대폰 번호 사전예약</h2>

      {/* 휴대폰 번호 */}
      <div className={styles.field}>
        <div className={styles.row}>
          <label
            className={`${styles.input} ${phoneError ? styles.isError : ''} ${
              isVerified ? styles.isLocked : ''
            }`}
          >
            <span className="blind">휴대폰 번호</span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={phone}
              maxLength={PHONE_MAX_LENGTH}
              placeholder={isMo ? "휴대폰 번호 ('-' 없이)" : "휴대폰 번호 ('-' 없이 숫자만 입력)"}
              readOnly={isVerified}
              aria-invalid={phoneError}
              aria-describedby={phoneError ? 'phone-error' : undefined}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </label>
          <button
            type="button"
            className={`${styles.btnLine} ${styles.btnSend}`}
            disabled={!canSend}
            onClick={handleSend}
          >
            {isCodeSent || isExpired ? '재발송' : '인증번호 발송'}
          </button>
        </div>
        {phoneError && (
          <p id="phone-error" className={styles.errorText} role="alert">
            {INLINE_MESSAGES.phoneFormat}
          </p>
        )}
      </div>

      {/* 인증번호 */}
      <div className={styles.row}>
        <label className={`${styles.input} ${isVerified ? styles.isLocked : ''}`}>
          <span className="blind">인증번호</span>
          <input
            ref={codeInputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            maxLength={AUTH_CODE_LENGTH}
            placeholder={isMo ? '인증번호 6자리' : '인증번호 6자리 입력'}
            disabled={!isCodeSent && !isVerified}
            readOnly={isVerified}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, AUTH_CODE_LENGTH))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleVerify();
              }
            }}
          />
          {isVerified ? (
            <span className={styles.timer}>인증 완료</span>
          ) : (
            <span className={styles.timer} aria-live="polite">
              <span className="blind">남은 시간</span>
              {formatMMSS(isCodeSent ? timer.remaining : AUTH_CODE_TTL_SEC)}
            </span>
          )}
        </label>
        <button
          type="button"
          className={`${styles.btnSecondary} ${styles.btnVerify}`}
          disabled={!canVerify}
          onClick={handleVerify}
        >
          {isMo ? '확인' : '인증번호 확인'}
        </button>
      </div>

      <p className={styles.notice}>※ 해당 번호를 사용하는 사전 예약자에게 보상이 지급됩니다.</p>

      <hr className={styles.divider} />

      {/* 약관 동의 */}
      <ul className={styles.agreements}>
        <li>
          <Checkbox checked={allChecked} onChange={handleAllAgree} strong>
            약관을 확인하였으며, 모두 동의합니다.
          </Checkbox>
        </li>
        {AGREEMENTS.map((item) => (
          <li key={item.key}>
            <Checkbox
              checked={agreements[item.key]}
              onChange={(checked) => setAgreements((prev) => ({ ...prev, [item.key]: checked }))}
            >
              {item.required ? '[필수]' : '[선택]'} {item.label}
            </Checkbox>
            {item.detail && (
              <button
                type="button"
                className={styles.detail}
                onClick={() => item.detail && onOpenConsent(item.detail)}
              >
                {isMo ? '보기 >' : '자세히 보기 >'}
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className={`${styles.notice} ${styles.noticeAge}`}>
        ※ 만 19세 미만으로 확인될 경우 사전예약 보상 지급 대상에서 제외될 수 있습니다.
      </p>

      <button type="submit" className={styles.btnPrimary} disabled={!canSubmit}>
        <span className={styles.arrow} aria-hidden="true">
          ‹‹‹
        </span>
        <span className={styles.btnPrimaryLabel}>
          {!canSubmit && (
            <svg
              className={styles.lock}
              width="16"
              height="18"
              viewBox="0 0 16 18"
              aria-hidden="true"
            >
              <path
                d="M4 8V5a4 4 0 118 0v3h1.5A1.5 1.5 0 0115 9.5v7a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 16.5v-7A1.5 1.5 0 012.5 8H4zm2 0h4V5a2 2 0 10-4 0v3z"
                fill="currentColor"
              />
            </svg>
          )}
          사전예약 신청
        </span>
        <span className={styles.arrow} aria-hidden="true">
          ›››
        </span>
      </button>
    </form>
  );
}
