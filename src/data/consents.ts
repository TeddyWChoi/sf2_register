// 사전예약 약관 동의 항목 / 상세 팝업 문구 (Figma: 사전예약 팝업 보드 13109:321)
// ※ 2026-10-23 법무 검토 반영: 마케팅 동의 2개 분리, 만 19세 확인 [필수](A안, 휴대폰 인증은 연령 미확인 — 19세 미만 확인 시 보상 제외 안내), 회사명 통일
// ※ 신규 마케팅 동의 문구는 초안 — 사업팀·법무 최종 확인 필요 (SB-09)

export type AgreementKey = 'collect' | 'entrust' | 'age' | 'marketingCollect' | 'marketing';

export type ConsentDetail =
  | {
      type: 'table';
      title: string;
      intro: string;
      rows: { label: string; value: string }[];
      /** 2열 헤더형 표(처리 위탁) 여부 */
      columns?: [string, string];
      note: string;
    }
  | {
      type: 'sections';
      title: string;
      sections: { heading: string; body: string }[];
    };

export type Agreement = {
  key: AgreementKey;
  required: boolean;
  label: string;
  detail?: ConsentDetail;
};

export const AGREEMENTS: Agreement[] = [
  {
    key: 'collect',
    required: true,
    label: '개인정보 수집 및 이용 동의',
    detail: {
      type: 'table',
      title: '개인정보 수집 및 이용 동의 (필수)',
      intro:
        '(주)버티고우 게임즈는 사전예약 이벤트 참여 및 진행을 위해 아래와 같은 개인정보를 수집·이용합니다.',
      rows: [
        {
          label: '수집 및 이용 목적',
          value: '사전예약 참여자 확인(접수·중복 확인), 보상 지급 및 SF2 출시 안내 발송',
        },
        { label: '수집 항목', value: '휴대전화번호' },
        {
          label: '보유 및 이용기간',
          value: '사전예약 신청 취소 또는 보상 지급 완료 시 지체 없이 파기',
        },
      ],
      note: '※ 위의 개인정보 수집 및 이용 동의를 거부할 권리가 있으며, 동의 거부 시 사전예약 신청이 제한됩니다.',
    },
  },
  {
    key: 'entrust',
    required: true,
    label: '개인정보 처리 위탁 동의',
    detail: {
      type: 'table',
      title: '개인정보 처리 위탁 동의 (필수)',
      intro:
        '(주)버티고우 게임즈는 사전예약 이벤트 진행을 위해 아래와 같이 개인정보 처리업무를 위탁하고 있습니다.',
      columns: ['수탁업체', '위탁업무'],
      rows: [{ label: 'LG U+', value: '문자 발송' }],
      note: '※ 위의 개인정보 처리 위탁 동의를 거부할 권리가 있으며, 동의 거부 시 사전예약 신청이 제한됩니다.',
    },
  },
  {
    key: 'age',
    required: true,
    label: '본인은 만 19세 이상임을 확인합니다.',
  },
  {
    key: 'marketingCollect',
    required: false,
    label: '마케팅 목적 개인정보 수집·이용 동의',
    detail: {
      type: 'table',
      title: '마케팅 목적 개인정보 수집·이용 동의 (선택)',
      intro:
        '(주)버티고우 게임즈는 이벤트·혜택 안내 및 마케팅 활용을 위해 아래와 같이 개인정보를 수집·이용합니다.',
      rows: [
        {
          label: '수집 및 이용 목적',
          value: 'SF2 이벤트 · 업데이트 · 혜택 정보 안내, 마케팅 분석',
        },
        { label: '수집 항목', value: '휴대전화번호' },
        {
          label: '보유 및 이용기간',
          value: '동의 철회 시 또는 수집일로부터 2년까지 보관 후 파기',
        },
      ],
      note: '※ 동의를 거부할 수 있으며, 거부하더라도 사전예약 신청 및 보상 수령은 가능합니다. 단, 이벤트 안내 및 추가 혜택 제공이 제한될 수 있습니다.',
    },
  },
  {
    key: 'marketing',
    required: false,
    label: '광고성 정보 수신 동의',
    detail: {
      type: 'sections',
      title: '광고성 정보 수신 동의 (선택)',
      sections: [
        {
          heading: '1. 수신 내용',
          body: 'SF2의 이벤트, 업데이트, 혜택 등 광고성 정보',
        },
        { heading: '2. 수신 방법', body: '문자(SMS · LMS)' },
        {
          heading: '3. 동의 철회',
          body: '수신 동의는 언제든지 철회할 수 있으며, 철회 시 광고성 정보 발송이 중단됩니다.',
        },
        {
          heading: '4. 동의 거부 권리 및 불이익',
          body: '동의를 거부할 수 있으며, 거부하더라도 사전예약 신청 및 보상 수령은 가능합니다. 단, 이벤트 안내 및 추가 혜택 제공이 제한될 수 있습니다.',
        },
      ],
    },
  },
];
