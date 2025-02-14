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
      />
    </div>
  );
}