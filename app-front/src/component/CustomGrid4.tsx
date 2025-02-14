"use client"

import React, { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

// 원본 데이터
type DataItem = {
  month: string;
  cost: number;
  category: string;
};

const data: DataItem[] = [
  { month: '2024.1', cost: 1000, category: '식비' },
  { month: '2024.1', cost: 2000, category: '쇼핑' },
  { month: '2024.2', cost: 3000, category: '교통비' },
  { month: '2024.2', cost: 4000, category: '쇼핑' },
];

// month별로 cost 합산 및 하위 데이터 생성
const groupedData = Object.values(
  data.reduce<Record<string, { month: string; costTotal: number; subRows: DataItem[] }>>(
    (acc, item) => {
      if (!acc[item.month]) {
        acc[item.month] = {
          month: item.month,
          costTotal: 0,
          subRows: [],
        };
      }
      acc[item.month].costTotal += item.cost;
      acc[item.month].subRows.push(item);

      return acc;
    },
    {}
  )
);

console.log("groupedData >>", groupedData);

// 🌟 메인 컴포넌트
export default function CustomGrid4() {
  // 📋 컬럼 정의: useMemo를 컴포넌트 내부로 이동
  const columns = useMemo<MRT_ColumnDef<typeof groupedData[0]>[]>(
    () => [
      { accessorKey: 'month', header: 'Month' },
      { accessorKey: 'costTotal', header: 'Total Cost' },
    ],
    []
  );

  return (
    <div style={{ margin: '20px' }}>
      <MaterialReactTable
        columns={columns}
        data={groupedData}
        enableExpanding
        getSubRows={(row) => row.subRows as any}
        renderDetailPanel={({ row }) => {
          const details = row.original.subRows || [];
          return details.length > 0 ? (
            <div>
              <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#e5e7eb' }}>
                    <th>카테고리</th>
                    <th>비용</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((detail, idx) => (
                    <tr key={idx}>
                      <td>{detail.category}</td>
                      <td>{detail.cost.toLocaleString()} 원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '10px', backgroundColor: '#f3f4f6' }}>
              <strong>⚠️ 상세 내역이 없습니다.</strong>
            </div>
          );
        }}

      />
    </div>
  );
}