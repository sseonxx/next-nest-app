"use client";
import {
  AuthRequest,
  AuthResponse,
  loginApi,
  signUpApi,
} from "@/services/auth/authApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// 회원가입 Hook
// export const useSignUp = () => {
//   return useMutation((data: { email: string; password: string }) =>
//     signUpApi(data)
//   );
// };
// 회원가입 Hook
export const useSignUp = () =>
  useMutation<AxiosResponse<AuthResponse>, Error, AuthRequest>(
    (data) => signUpApi(data),
    {
      onSuccess: (response) => {
        console.log("회원가입 성공:", response.data);
      },
      onError: (error) => {
        console.error("회원가입 실패:", error.message);
      },
    }
  );

// 로그인 Hook
// export const useLogin = () => {
//   return useMutation((data: { email: string; password: string }) =>
//     loginApi(data)
//   );
// };
export const useLogin = () =>
  useMutation<AxiosResponse<AuthResponse>, Error, AuthRequest>(
    (data) => loginApi(data),
    {
      onSuccess: (response) => {
        console.log("로그인 성공:", response.data);
        localStorage.setItem("token", response.data.accessToken); // JWT 저장
      },
      onError: (error) => {
        console.error("로그인 실패:", error.message);
      },
    }
  );
