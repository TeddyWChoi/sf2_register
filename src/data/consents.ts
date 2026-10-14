// 사전예약 약관 동의 항목 / 상세 팝업 문구 (Figma: 사전예약 팝업 보드 13109:321)
// ※ 문구는 사업팀 회신 전 임의 수정 금지 (SB-09 체크리스트 #4~#6, #24)

export type AgreementKey = 'age' | 'collect' | 'entrust' | 'marketing';

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
    key: 'age',
    required: true,
    label: '본인은 만 19세 이상임을 확인합니다.',
  },
  {
    key: 'collect',
    required: true,
    label: '개인정보 수집 및 이용 동의',
    detail: {
      type: 'table',
      title: '개인정보 수집 및 이용 동의 (필수)',
      intro:
        '버티고게임즈는 사전예약 이벤트 참여 및 진행을 위해 아래와 같은 개인정보를 수집·이용합니다.',
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
        '버티고게임즈는 사전예약 이벤트 진행을 위해 아래와 같이 개인정보 처리업무를 위탁하고 있습니다.',
      columns: ['수탁업체', '위탁업무'],
      rows: [{ label: 'LG U+', value: '문자 발송' }],
      note: '※ 수신 동의는 언제든지 철회할 수 있습니다.',
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
          heading: '1. 목적',
          body: 'SF2의 출시 안내, 다운로드 링크, 이벤트, 업데이트 및 혜택 정보 제공과 마케팅 분석',
        },
        { heading: '2. 수집 항목', body: '휴대폰 번호' },
        {
          heading: '3. 보유 및 이용 기간',
          body: '동의 철회 시 또는 수집일로부터 2년까지 보관 후 파기',
        },
        {
          heading: '4. 동의 거부 권리 및 불이익',
          body: '동의를 거부할 수 있으며, 거부하더라도 사전 예약 및 기본 보상 수령은 가능합니다. 단, 출시 후 이벤트 안내 및 추가 혜택 제공이 제한될 수 있습니다.',
        },
      ],
    },
  },
];
