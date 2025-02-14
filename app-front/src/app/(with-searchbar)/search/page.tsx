import React from 'react'
import Searchbar from '../../../component/searchbar';

const Page = async ({ searchParams }: { searchParams: Promise<{ q: string }> }) => {
  const { q } = await searchParams;
  console.log("searchParams >>", searchParams);

  return (
    <>
      <div>Search Page : {q}</div>

      <div>
        &quot;{q}&quot; 에 대한 search 목록

        <div>
          <span>아이템 이미지</span>
          <ul>
            <li>아이템명</li>
            <li>레벨</li>
            <li>직업</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Page