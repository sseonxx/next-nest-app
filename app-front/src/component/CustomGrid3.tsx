import React, { useMemo } from "react";
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

// 🌟 그룹화 데이터 생성
const groupedData = Object.entries(
  data.reduce((acc, { month, cost }) => {
    acc[month] = (acc[month] || 0) + cost;
    return acc;
  }, {})
).map(([month, total]) => ({
  month,
  cost: total,
  isParent: true,
  children: data.filter((item) => item.month === month),
}));

// 🌟 컬럼 정의
const columns: ColumnDef<(typeof groupedData)[0]>[] = [
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row, getValue }) => (
      <span
        style={{ cursor: "pointer", color: row.original.isParent ? "blue" : "black" }}
        onClick={() => row.original.isParent && row.toggleExpanded()}
      >
        {row.original.isParent ? (row.getIsExpanded() ? "▼" : "▶") : "  "}{String(getValue())}
      </span>
    ),
  },
  { accessorKey: "cost", header: "Total Cost" },
];

const CustomGrid3 = () => {
  const table = useReactTable({
    data: groupedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div style={{ margin: "20px" }}>
      <table border={1} style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ padding: "10px", background: "#ddd" }}>
                  {String(header.column.columnDef.header)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr style={{ backgroundColor: row.original.isParent ? "#e3f2fd" : "#fff" }}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: "10px" }}>
                    {String(cell.renderValue())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() &&
                row.original.children.map((child, index) => (
                  <tr key={index} style={{ backgroundColor: "#f0f0f0" }}>
                    <td style={{ paddingLeft: "30px" }}>{child.category}</td>
                    <td>{child.cost}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomGrid3