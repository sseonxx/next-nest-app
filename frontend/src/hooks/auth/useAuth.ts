"use client";
import { loginApi, signUpApi } from "@/services/auth/authApi";
import { useMutation } from "@tanstack/react-query";

// 회원가입 Hook
export const useSignUp = () =>
  useMutation({
    mutationFn: signUpApi,
    onSuccess: (response) => {
      console.log("회원가입 성공:", response.data);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
// 로그인 Hook
// export const useLogin = () => {
//   return useMutation((data: { email: string; password: string }) =>
//     loginApi(data)
//   );
// };
export const useLogin = () =>
  useMutation((data) => loginApi(data), {
    onSuccess: (response) => {
      console.log("로그인 성공:", response.data);
      localStorage.setItem("token", response.data.accessToken); // JWT 저장
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
