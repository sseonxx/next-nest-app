import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function SearchLayout() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    if (e) {
      e.preventDefault();// 브라우저의 새로고침을 막음
    }
    // search 값이 없거나 쿼리스트링(q)과 search 값이 동일한 경우 동작없음
    if (!search || q === search) return;

    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }
  return (
    <div className="search-input">
      <form id="search" action="#">
        <input
          type="text"
          placeholder="검색어 입력"
          // id='searchText'
          // name="searchKeyword"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}

        />
        <i className="fa fa-search" onClick={onSubmit}></i>
      </form>
    </div>
  )



}