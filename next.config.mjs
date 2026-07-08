/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGithubPages ? '/kaskada' : '',
  assetPrefix: isGithubPages ? '/kaskada' : ''
};

export default nextConfig;
