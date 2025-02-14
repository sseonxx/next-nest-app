"use client"

import React, { useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
// import 'material-react-table/dist/index.css';

// 원본 데이터
interface DataItem {
  month: string;
  cost: number;
  category: string;
}

const data: DataItem[] = [
  { month: '2024.1', cost: 1000, category: '식비' },
  { month: '2024.1', cost: 2000, category: '쇼핑' },
  { month: '2024.2', cost: 3000, category: '교통비' },
  { month: '2024.2', cost: 4000, category: '쇼핑' },
];

// month별 cost 합산 및 상세 데이터 그룹화
interface GroupedData {
  month: string;
  costTotal: number;
  details: DataItem[];
}

const groupedData: GroupedData[] = Object.values(
  data.reduce<Record<string, GroupedData>>((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = {
        month: item.month,
        costTotal: 0,
        details: [],
      };
    }
    acc[item.month].costTotal += item.cost;
    acc[item.month].details.push(item);
    return acc;
  }, {})
);

const columns: MRT_ColumnDef<GroupedData>[] = [
  {
    accessorKey: 'month',
    header: 'Month',
  },
  {
    accessorKey: 'costTotal',
    header: 'Total Cost',
  },
];

export default function CustomGrid3() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // 행 확장/축소 토글
  const toggleRow = (month: string) => {
    setExpandedRows((prev) => ({ ...prev, [month]: !prev[month] }));
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>MaterialReactTable</h2>
      <MaterialReactTable columns={columns} data={groupedData} />

      <h2>table</h2>
      <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th style={{ padding: '10px' }}>Month</th>
            <th style={{ padding: '10px' }}>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((group) => (
            <React.Fragment key={group.month}>
              <tr>
                <td
                  style={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold', padding: '10px' }}
                  onClick={() => toggleRow(group.month)}
                >
                  {expandedRows[group.month] ? '▼' : '▶'} {group.month}
                </td>
                <td style={{ padding: '10px' }}>{group.costTotal.toLocaleString()} 원</td>
              </tr>
              {expandedRows[group.month] && (
                <tr>
                  <td colSpan={2} style={{ backgroundColor: '#f0f0f0' }}>
                    <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '5px' }}>Category</th>
                          <th style={{ padding: '5px' }}>Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.details.map((detail, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '5px' }}>{detail.category}</td>
                            <td style={{ padding: '5px' }}>{detail.cost.toLocaleString()} 원</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
