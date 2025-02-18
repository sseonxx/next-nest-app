import { NextResponse } from "next/server";

// 빌드시 기본 데이터를 가져오기 위한 API 엔드포인트 생성 
export async function POST(req: Request) {
  const body = await req.json();
  const { search_year, search_month } = body;

  const response = await fetch(`https://coding-test.adpopcorn.com/api/v1/report/demo/GetDemoData`, {
    method: 'POST',
    headers: { 'Content-Type': 'applicaion/json' },
    body: JSON.stringify({ search_year, search_month }),
    cache: 'force-cache'
  });
  const data = await response.json();
  return NextResponse.json(data);
}