"use client";

import dynamic from 'next/dynamic';

// 클라이언트 전용 컴포넌트 동적 임포트
const DynamicClientComponent = dynamic(() => import('./ClientComponent'), { ssr: false });

export default function ClientWrapper({ defaultData }: { defaultData: any }) {
  return (
    <DynamicClientComponent defaultData={defaultData} />
  );
}