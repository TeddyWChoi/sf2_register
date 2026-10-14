# SF2 사전예약 페이지 (sf2_register)

스페셜포스2 S.K.I.L.L. 사전예약 원스크린 페이지 퍼블리싱본입니다.
디자인 원본: Figma `SF2_NEW` › `SF2 사전예약 (신규)` — PC `sf2-prereg-pc-v2` (13112:403), MO `sf2-prereg-mo-v2` (13112:544), 팝업 보드 (13109:321)

## 스펙

| 항목 | 내용 |
| --- | --- |
| 프레임워크 | Next.js 14.2.35 + React 18.3.1, App Router |
| 언어 | TypeScript 5.3.3 |
| 스타일링 | SCSS + CSS Modules (`*.module.scss`) |
| 빌드 | Next.js 내장 빌드(Webpack) |
| 패키지 매니저 | npm (`package-lock.json`) |
| 실행 환경 | Node.js 24.21.0 / npm 11.19.0 (`.nvmrc`) |
| 코드 규칙 | ESLint (next/core-web-vitals), Prettier |
| 상태·폼 | React `useState`, `useRef` |

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
npm run lint
npm run format
```

## GitHub Pages 미리보기

- 주소: https://teddywchoi.github.io/sf2_register/
- `main` 브랜치에 push 하면 `.github/workflows/deploy-pages.yml`이 자동으로 빌드하고 배포합니다.
- 최초 1회 설정: 저장소 **Settings › Pages › Build and deployment › Source**를 **GitHub Actions**로 지정
- Pages 빌드에서만 정적 export와 `basePath: /sf2_register`가 적용됩니다 (`GITHUB_PAGES=true`). 로컬 개발이나 실서버 배포에는 영향이 없습니다.
- 이미지 등 `public` 파일은 basePath가 붙도록 `asset('/images/...')`로 참조하세요 (`src/lib/asset.ts`).
- API는 Mock이라 Pages에서도 인증번호 `123456`으로 전체 흐름을 확인할 수 있습니다.

## 구조

```
src/
  app/                 layout.tsx (폰트·메타), page.tsx, globals.scss
  styles/              _variables.scss (컬러·폰트·브레이크포인트 토큰), _mixins.scss (mo/pc, 호버 규칙)
  components/
    prereg/            PreregPage(페이지 조립·팝업 상태), TitleLogotype, TopIcons,
                       RewardColumn, PreregForm(인증·동의·신청 로직), Footer
    popup/             AlertPopup(P5·P6·P8·P9·완료), ConsentPopup(약관 3종),
                       RewardPopup(보상 안내), PolicyPopup(P10 개인정보처리방침 / P11 이용약관)
    common/            Modal(레이어 팝업 공통), Checkbox
  data/                config.ts(정책 상수·외부 링크), consents.ts, messages.ts, rewards.ts, policies.ts
  hooks/               useCountdown(03:00 타이머), useMediaQuery
  lib/preregApi.ts     API 연동부 (현재 Mock)
public/images/         main(배경·캐릭터·로고·보상), icons, footer(로고·등급표시)
```

공통 컴포넌트는 기존 프로젝트 것으로 교체 연결하시면 됩니다. 교체 대상: `common/Modal`, `common/Checkbox`, `prereg/Footer`.

## 반응형

- **PC (1024px 이상)**: 1920×1080 원스크린. 1920 기준 좌표를 중앙 정렬하고 좌우는 잘립니다. 상단 아이콘은 화면 오른쪽 기준입니다. 높이 1080 미만은 스크롤됩니다 (SB-02 메모: 개발 협의).
- **MO (1023px 이하)**: 상단 비주얼 400px + 신청 패널(최대 560px) + 푸터. 브레이크포인트는 `$bp-mo`와 `hooks/useMediaQuery.ts`의 `MO_QUERY` 두 곳을 함께 수정하세요.

## 동작 정책 (스토리보드 SB-01 / SB-06)

- 휴대폰 번호: 숫자만, 최대 11자리. [인증번호 발송] 클릭 시 형식을 검사하고, 오류면 입력칸 아래 인라인 메시지를 띄웁니다 (팝업 아님).
- 발송 후 03:00 카운트다운. 버튼은 [재발송]으로 바뀌고, 시간 만료 시 P9 팝업을 띄웁니다.
- 인증 실패 1~4회는 P5, 5회째는 P6 + 발송/확인 버튼 잠금 (`AUTH_LOCK_MINUTES`, **TBD — 현재 임시 10분**).
- 인증 성공 시 입력칸 잠금 + "인증 완료" 표시.
- 전체 동의는 하위 4개를 일괄 체크/해제하고, 하위가 모두 체크되면 자동 체크됩니다.
- [사전예약 신청]은 인증 완료 + 필수 3개(만 19세·수집이용·처리위탁) 동의 시 활성화됩니다.
- 완료 팝업 [확인] 후 폼을 초기화합니다 (**TBD — SB-09 #13**).
- 팝업 공통: 딤 + 배경 스크롤 잠금, ESC/[X]/[확인]으로 닫힘. 딤 클릭 닫힘은 알림 팝업에서 제외했습니다.

## API 연동 (TODO)

`src/lib/preregApi.ts`의 `sendAuthCode` / `verifyAuthCode` / `submitPrereg`를 실제 API로 교체하세요.
반환 타입(`status`)에 맞춰 화면 분기(중복 P8, 잠금 P6, 만료 P9 등)가 이미 연결되어 있습니다.

Mock 동작:
- 인증번호 `123456` 입력 시 성공, 그 외에는 불일치
- `01000000000`으로 발송하면 중복 신청(P8)

## 상단 홈 아이콘 숨김 (1차 오픈)

사전예약 1차 오픈 시점에는 SF2 공식 홈페이지가 아직 오픈 전이라, 상단 아이콘 중 **홈(공식 홈페이지) 버튼을 숨겼습니다.** 현재는 YouTube와 Discord만 노출됩니다.
공식 홈페이지가 오픈되면 `src/data/config.ts`에서 아래 두 가지를 바꾸면 다시 노출됩니다.

```ts
export const SHOW_HOME_LINK = true; // false → true
export const EXTERNAL_LINKS = { home: '공식 홈페이지 URL', ... };
```

## 확인 필요 (SB-09 체크리스트)

- 상단 아이콘 URL: `data/config.ts`의 `EXTERNAL_LINKS` (현재 `#`). 홈 아이콘은 위 항목대로 숨김 상태
- 보상 구성·아이콘: `data/rewards.ts`, `public/images/main/reward_main.png` (현재 예시)
- 등급표시: `public/images/footer/img_grade_sf2.png`는 공홈 이미지 임시 사용 (2010 드래곤플라이 등급). SF2 등급분류번호 발급 시 이미지와 `Footer.tsx`의 alt 텍스트를 교체하세요.
- 회사명 표기: 정책 원문은 "버티고우 게임즈", 동의 팝업은 "버티고게임즈"
- 알림 문구: P5의 "(1~4회 실패 시)"는 노출 조건 주석으로 보고 제외했습니다. P6 "버튼이 비활성화됩니다"는 원문 그대로 두었습니다 (확정 대기).
- API 오류 공통 알림(`ALERTS.serverError`)은 디자인에 없어 임시 문구로 넣었습니다.
