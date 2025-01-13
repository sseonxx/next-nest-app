
export default async function handler(req, res) {
  const response = await fetch(
    "https://mapledb.kr/Assets/data/search_lists.js"
  );
  const data = await response.text(); // JSON이 아니므로 .text()로 처리
  res.setHeader("Content-Type", "application/json");
  res.send(data );
}

