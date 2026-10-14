// 사전예약 정책 / 외부 링크 설정
// TBD 항목은 SB-08 / SB-09 체크리스트 확정 후 값 교체

export const PREREG_PERIOD = {
  start: '2026. 11. 10 (화)',
  end: '정식 출시 전까지',
};

/** 인증번호 유효 시간(초) — 03:00 */
export const AUTH_CODE_TTL_SEC = 180;

/** 인증번호 자리수 */
export const AUTH_CODE_LENGTH = 6;

/** 인증 실패 허용 횟수 (5회 실패 시 잠금) */
export const AUTH_MAX_FAIL = 5;

/** 인증 잠금 시간(분) — TBD(SB-09 #10). 확정 전 임시값 */
export const AUTH_LOCK_MINUTES = 10;

/** 휴대폰 번호 최대 자리수 */
export const PHONE_MAX_LENGTH = 11;

/**
 * 상단 홈(공식 홈페이지) 아이콘 노출 여부
 * 사전예약 1차 오픈 시점에는 SF2 공식 홈페이지가 오픈 전이므로 숨김(false).
 * 공식 홈페이지 오픈 후 EXTERNAL_LINKS.home 에 URL 입력하고 true 로 변경.
 */
export const SHOW_HOME_LINK = false;

/** 상단 아이콘 외부 링크 — URL TBD(SB-09 #12) */
export const EXTERNAL_LINKS = {
  home: '#',
  youtube: '#',
  discord: '#',
};
