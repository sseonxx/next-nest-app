// src/app/iga/page.tsx (Server Component)
import { getData } from '@/api/dataFetchApi';
import ClientWrapper from './ClientWrapper';

export default async function Page() {
  // 🟢 빌드 시 2024년 데이터 가져오기 (정적 페이지 생성)
  const defaultData = await getData(2024, undefined);
  console.log("defaultData >>", defaultData);

  return (
    <div className="p-6">
        {/* 클라이언트 컴포넌트 - 동적 데이터 변경 */}
        <ClientWrapper defaultData={defaultData} />
    </div>
  );
} 