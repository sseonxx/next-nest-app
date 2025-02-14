"use client"

import React, { useState } from 'react';
import DataGrid, { Column, Grouping, GroupPanel, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

// 원본 데이터
const data = [
  { month: '2024.1', cost: 1000, category: '식비' },
  { month: '2024.1', cost: 2000, category: '쇼핑' },
  { month: '2024.2', cost: 3000, category: '교통비' },
  { month: '2024.2', cost: 4000, category: '쇼핑' },
];

// month별 cost 합산 및 상세 데이터 그룹화
const groupedData = Object.values(
  data.reduce((acc, item) => {
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

export default function CustomGrid() {
  const [expandedRows, setExpandedRows] = useState([]);

  // 행 확장/축소 토글
  const toggleRow = (month) => {
    setExpandedRows((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  return (
    <div style={{ margin: '20px' }}>
      <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
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
                  {expandedRows.includes(group.month) ? '▼' : '▶'} {group.month}
                </td>
                <td style={{ padding: '10px' }}>{group.costTotal.toLocaleString()} 원</td>
              </tr>
              {expandedRows.includes(group.month) && (
                <tr>
                  <td colSpan={2} style={{ backgroundColor: '#f0f0f0' }}>

                    <DataGrid
                      dataSource={group.details}
                      showBorders={true}
                      columnAutoWidth={true}
                      height={200}
                    >
                      <Column dataField="category" caption="Category" />
                      <Column dataField="cost" caption="Cost" dataType="number" />
                    </DataGrid>
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
