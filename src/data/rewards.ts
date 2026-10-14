// 사전예약 보상 (임시 예시 문구 — 사업팀 보상 구성 확정 후 교체, SB-09 #7)

export type RewardItem = {
  name: string;
  description: string;
  amount: string;
  /** 아이콘 이미지 경로. 미정 시 플레이스홀더 노출 */
  icon?: string;
};

export const REWARD_ITEMS: RewardItem[] = [
  {
    name: '보상 1 아이템명',
    description: '아이템 설명이 들어갑니다. (예: 기간제 무기 스킨 30일)',
    amount: 'x1',
  },
  {
    name: '보상 2 아이템명',
    description: '아이템 설명이 들어갑니다. (예: 경험치 부스터 7일)',
    amount: 'x3',
  },
  {
    name: '보상 3 아이템명',
    description: '아이템 설명이 들어갑니다. (예: 캐릭터 의상 영구)',
    amount: 'x1',
  },
  {
    name: '보상 4 아이템명',
    description: '아이템 설명이 들어갑니다. (예: 오르골 박스 소환권)',
    amount: 'x10',
  },
  {
    name: '보상 5 아이템명',
    description: '아이템 설명이 들어갑니다. (예: 게임 머니)',
    amount: 'x50,000',
  },
];

export const REWARD_NOTES = [
  '※ 보상은 정식 출시 후 게임 내 우편함으로 지급됩니다.',
  '※ 보상 구성은 사정에 따라 변경될 수 있습니다.',
];
