import React from 'react'

type Props = {}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <>
      <div>item/[id] Page : {id}</div>
      <div>**아이템 사진**</div>
      <div> {/*설명 */}
        <span> 착용 조건</span>
        <ul>
          <li>아이템명</li>
          <li>직업</li>
          <li>LEVEL</li>
          <li>성별</li>
        </ul>
        <span>분류</span>
        <ul>
          <li>분류</li>
          <li>주 카테고리</li>
          <li>부 카테고리</li>
        </ul>
        <span>능력</span>
        <ul>
          <li>물리 방어력</li>
          <li>마법 방어력</li>
          <li>공격력</li>
          <li>마력</li>
          <li>STR</li>
          <li>DEX</li>
          <li>INT</li>
          <li>LUK</li>
        </ul>

      </div>
    </>
  )
}

export default Page