/** @type {import('next').NextConfig} */
/* Next앱에 설정을 관리하는 파일*/
const nextConfig = {
  reactStrictMode: false, // true일 경우 컴포넌트 2번 실행으로 디버깅에 방해가 되기때문에
  images: {
    domains: ['maplestory.io'], // 외부 이미지를 로드하기 위한 도메인 설정
  },
};

export default nextConfig;
