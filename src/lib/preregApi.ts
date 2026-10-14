// 사전예약 API 연동부
// 현재는 퍼블리싱 확인용 Mock 구현. 개발 연동 시 각 함수 내부를 실제 API 호출로 교체하세요.
// (요청/응답 초안: 스토리보드 SB-07 API · 데이터 정의)
import type { AgreementKey } from '@/data/consents';

export type SendCodeResult =
  | { status: 'sent' }
  | { status: 'duplicate' } // 이미 사전예약된 번호 → P8
  | { status: 'locked' } // 인증 잠금 중 → P6
  | { status: 'error' };

export type VerifyCodeResult =
  | { status: 'verified' }
  | { status: 'mismatch' } // P5
  | { status: 'expired' } // P9
  | { status: 'error' };

export type SubmitResult = { status: 'complete' } | { status: 'duplicate' } | { status: 'error' };

export type SubmitPayload = {
  phone: string;
  agreements: Record<AgreementKey, boolean>;
};

/** Mock 전용: 이 인증번호를 입력하면 인증 성공 처리 */
export const MOCK_AUTH_CODE = '123456';
/** Mock 전용: 이 번호로 발송하면 중복 신청 처리 */
export const MOCK_DUPLICATE_PHONE = '01000000000';

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendAuthCode(phone: string): Promise<SendCodeResult> {
  // TODO(API): POST /prereg/auth/send { phone }
  await wait();
  if (phone === MOCK_DUPLICATE_PHONE) return { status: 'duplicate' };
  return { status: 'sent' };
}

export async function verifyAuthCode(phone: string, code: string): Promise<VerifyCodeResult> {
  // TODO(API): POST /prereg/auth/verify { phone, code }
  await wait();
  void phone;
  return code === MOCK_AUTH_CODE ? { status: 'verified' } : { status: 'mismatch' };
}

export async function submitPrereg(payload: SubmitPayload): Promise<SubmitResult> {
  // TODO(API): POST /prereg/apply { phone, agreements }
  await wait();
  void payload;
  return { status: 'complete' };
}
