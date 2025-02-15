import { AxiosResponse } from 'axios';
import { Post } from './apiHelper';


export const getDemoData = (requestData: { search_year: number, search_month?: number }): Promise<AxiosResponse<any>> => {
  return Post("/GetDemoData", requestData);
}