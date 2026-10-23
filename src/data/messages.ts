// 알림 팝업 / 인라인 메시지 문구 (Figma: P5·P6·P8·P9, 사전예약 완료, S1 형식 오류)
// ※ 사업팀 확인 대기 문구 포함 (SB-09 #1~#3, #9) — 확정 전 임의 수정 금지
import { AUTH_LOCK_MINUTES } from './config';

export type AlertMessage = {
  title: string;
  heading: string;
  description: string;
};

export const ALERTS = {
  /** P5 인증번호 불일치 (1~4회 실패) — 디자인 원문의 "(1~4회 실패 시)"는 노출 조건 주석이라 제외 */
  codeMismatch: {
    title: '알림',
    heading: '인증번호가 맞지 않습니다.',
    description: '인증번호를 다시 확인해 주세요.',
  },
  /** P6 인증 횟수 초과 (5회 실패) */
  authLocked: {
    title: '알림',
    heading: '인증 횟수를 초과하셨습니다.',
    description: `${AUTH_LOCK_MINUTES}분 뒤에 다시 시도해 주세요.\n인증번호 발송 및 확인 버튼이 비활성화됩니다.`,
  },
  /** P8 중복 신청 */
  duplicate: {
    title: '알림',
    heading: '이미 사전예약이 완료된 번호입니다.',
    description: '사전예약은 휴대폰 번호당 1회만 신청할 수 있습니다.',
  },
  /** P9 인증 시간 만료 */
  expired: {
    title: '알림',
    heading: '인증 시간이 만료되었습니다.',
    description: '[재발송] 버튼을 눌러 인증번호를 다시 받아주세요.',
  },
  /** 사전예약 완료 */
  complete: {
    title: '사전예약 완료',
    heading: '사전 예약이 완료되었습니다.',
    description:
      '정식 출시 후 사전예약 보상이 게임 내 우편함으로 지급됩니다.\n출시 안내는 등록하신 번호로 문자 발송됩니다.',
  },
  /** 사전예약 완료 — 만 19세 이상 미확인 (보상 제외, 법무 검토 2026-10-23) */
  completeNoReward: {
    title: '사전예약 완료',
    heading: '사전 예약이 완료되었습니다.',
    description:
      '만 19세 이상 확인이 되지 않아 사전예약 보상 지급 대상에서 제외됩니다.\n출시 안내는 등록하신 번호로 문자 발송됩니다.',
  },
  /** API 오류 (공통) — 디자인 미정, 임시 문구 */
  serverError: {
    title: '알림',
    heading: '일시적인 오류가 발생했습니다.',
    description: '잠시 후 다시 시도해 주세요.',
  },
} satisfies Record<string, AlertMessage>;

export const INLINE_MESSAGES = {
  phoneFormat: '휴대폰 번호를 정확히 입력해 주세요.',
};
