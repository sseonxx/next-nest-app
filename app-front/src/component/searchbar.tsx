"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

const Searchbar = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // 현재 페이지에 전달된 쿼리스트링을 꺼내올 수 있는 훅
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q])

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  }
  return (
    <div>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  )
}

export default Searchbar