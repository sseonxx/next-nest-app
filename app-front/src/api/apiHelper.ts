import { AxiosResponse } from 'axios';
import { useAppStore } from '@/store/useAppStore';
import apiInstance from './api';

export const Post = async <T>(
  endpoint: string,
  requestData: object
): Promise<AxiosResponse<T>> => {
  const { setIsLoading } = useAppStore.getState();

  try {
    setIsLoading(true);
    const response = await apiInstance.post<T>(endpoint, requestData);
    return response;
  } catch (error: any) {
    console.log(error.message || 'API Error');
    throw error;
  } finally {
    setIsLoading(false);
  }
};
