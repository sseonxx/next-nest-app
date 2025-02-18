import { AxiosResponse } from 'axios';
import { Post } from './apiHelper';


//axio API
export const getDemoData = (requestData: { search_year: number, search_month?: number }): Promise<AxiosResponse<any>> => {
  return Post("/GetDemoData", requestData);
}

//fetch 를 이요한 API
export const getData = async (search_year: number, search_month?: number|null) => {
  const requestData = { search_year, search_month };
  const response = await fetch(`https://coding-test.adpopcorn.com/api/v1/report/demo/GetDemoData`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData),
    cache: 'force-cache'  
  })
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}
