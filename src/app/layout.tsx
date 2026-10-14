import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';
import './globals.scss';

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

const notoSerifKr = Noto_Serif_KR({
  weight: ['700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif-kr',
});

export const metadata: Metadata = {
  title: '스페셜포스2 S.K.I.L.L. 사전예약',
  description: '다시, 전장으로. 스페셜포스2 사전예약에 참여하고 사전예약자 보상을 받으세요.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${notoSerifKr.variable}`}>
      <body>{children}</body>
    </html>
  );
}
