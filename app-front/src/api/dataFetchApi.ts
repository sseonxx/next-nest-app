import axios, { AxiosResponse } from 'axios';
import apiInstance from './api';


export const getDemoData = (requestData: { search_year: number, search_month?: number }): Promise<AxiosResponse<any>> => {
  return apiInstance.post("/GetDemoData", requestData);
}