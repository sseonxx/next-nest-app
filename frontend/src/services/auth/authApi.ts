"use client";
import { AxiosResponse } from "axios";
import apiInstance from "../api";

// 요청 타입
export interface AuthRequest {
  email: string;
  password: string;
}

// 응답 타입
export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
  };
}

// 회원가입
export const signUpApi = (data: AuthRequest): Promise<AxiosResponse<any>> => {
  return apiInstance.post("/auth/signup", data);
};

// 로그인
export const loginApi = (data: AuthRequest): Promise<AxiosResponse<any>> => {
  return apiInstance.post("/auth/login", data);
};
