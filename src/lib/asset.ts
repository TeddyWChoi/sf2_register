/**
 * public 폴더 정적 파일 경로. basePath(GitHub Pages 배포 시 /sf2_register)를 앞에 붙입니다.
 * 개발 서버 / 일반 배포에서는 basePath가 빈 문자열이라 경로가 그대로 유지됩니다.
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
