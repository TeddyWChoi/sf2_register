// 사전예약 보상 (사업팀 확정 구성, 2026-10-15 수령)
// 아이콘은 인게임 스크린샷에서 추출한 임시 이미지 — 원본 아이콘 수령 시 public/images/reward 교체
// ExpUP 100P 아이콘은 미수령 (플레이스홀더 노출)

export type RewardItem = {
  name: string;
  /** 지급 기간: 영구 / 30일 */
  period: string;
  amount: string;
  /** public 기준 아이콘 경로. 미정 시 플레이스홀더 노출 */
  icon?: string;
};

export const REWARD_ITEMS: RewardItem[] = [
  {
    name: 'Papaya Founder Shirt',
    period: '영구',
    amount: 'x1',
    icon: '/images/reward/papaya_founder_shirt.png',
  },
  { name: 'Eagle Eye', period: '30일', amount: 'x1', icon: '/images/reward/eagle_eye.png' },
  {
    name: 'FNF2000 Predator',
    period: '영구',
    amount: 'x1',
    icon: '/images/reward/fn_f2000_predator.png',
  },
  {
    name: 'FNF2000 Predator Papaya',
    period: '영구',
    amount: 'x1',
    icon: '/images/reward/fn_f2000_predator_papaya.png',
  },
  { name: 'M67 Gravity', period: '영구', amount: 'x1', icon: '/images/reward/m67_gravity.png' },
  {
    name: 'Tomahawk Ruler',
    period: '영구',
    amount: 'x1',
    icon: '/images/reward/tomahawk_ruler.png',
  },
  { name: 'ExpUP 100P', period: '30일', amount: 'x1' },
  {
    name: 'Quick SP Pay 30P',
    period: '30일',
    amount: 'x1',
    icon: '/images/reward/quick_sp_pay_30p.png',
  },
  {
    name: 'Wall Spray : SF2 Founder',
    period: '영구',
    amount: 'x1',
    icon: '/images/reward/wall_spray_sf2_founder.png',
  },
];

export const REWARD_NOTES = [
  '※ 보상은 정식 출시 후 게임 내 우편함으로 지급됩니다.',
  '※ 보상 구성은 사정에 따라 변경될 수 있습니다.',
];
