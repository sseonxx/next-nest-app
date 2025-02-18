import { AxiosResponse } from 'axios';
import { Post } from './apiHelper';


//axio API
export const getDemoData = (requestData: { search_year: number, search_month?: number }): Promise<AxiosResponse<any>> => {
  return Post("/GetDemoData", requestData);
}

// src/api/dataFetchApi.ts
export const getData = async (search_year: number, search_month?: number | null) => {
  const response = await fetch('https://coding-test.adpopcorn.com/api/v1/report/demo/GetDemoData', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ search_year, search_month }),
    cache: search_month ? 'no-store' : 'force-cache' // 기본 연도는 빌드 시 캐싱, 이후는 실시간 요청
  });

  if (!response.ok) {
    throw new Error(`🚨 API Error: ${response.status}`);
  }

  return response.json();
};