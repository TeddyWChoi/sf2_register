import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages 배포용 정적 빌드 (GITHUB_PAGES=true 일 때만 적용)
// https://teddywchoi.github.io/sf2_register/
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/sf2_register' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  ...(isGithubPages && {
    output: 'export',
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
