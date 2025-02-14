"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
} from "@tanstack/react-table";

const data = [
  { month: "2024.1", cost: 1000, category: "식비" },
  { month: "2024.1", cost: 2000, category: "쇼핑" },
  { month: "2024.2", cost: 3000, category: "교통비" },
  { month: "2024.2", cost: 4000, category: "쇼핑" },
];

// 🌟 메인 컬럼 정의
const columns: ColumnDef<typeof data[0]>[] = [
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row, getValue }) => (
      <span
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => row.toggleExpanded()}
      >
        {row.getIsExpanded() ? "▼" : "▶"} {String(getValue())}
      </span>
    ),
  },
  { accessorKey: "cost", header: "Total Cost" },
  { accessorKey: "category", header: "Category" },
];

export default function CustomGrid2() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div style={{ margin: "20px" }}>
      <table border={1} style={{ width: "100%", textAlign: "left" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{String(header.column.columnDef.header)}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              {/* 메인 행 */}
              <tr>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{String(cell.renderValue())}</td>
                ))}
              </tr>

              {/* 하위 상세 행 */}
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={columns.length}>
                    <div style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
                      <strong>상세 내역:</strong>
                      <ul>
                        <li>월: {row.original.month}</li>
                        <li>비용: {row.original.cost} 원</li>
                        <li>카테고리: {row.original.category}</li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>c
      </table>
    </div>
  );
}
