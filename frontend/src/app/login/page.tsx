'use client'
import { useLogin } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';

import React, { FormEvent, useState } from 'react'

const LoginPage = () => {

  const router = useRouter(); // *next/router 이 아닌 next/navigation로 import 
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("login: ", email, password);

    loginMutation.mutate({ email, password },
      {
        onSuccess: (res) => {
          console.log("페이지 로그안: ", res.data);
          const item = res.data;
          localStorage.setItem("token", item.token)
          router.push("/");

        },
        onError: (error) => {
          console.log("Login Error : ", error);
          setMessage("잘못된 이메일 또는 비밀번호")

        }
      },
    );

  }
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setMessage(""); }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 p-2 rounded-lg"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setMessage("") }}
          />
        </div>
        <div>{message}</div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage