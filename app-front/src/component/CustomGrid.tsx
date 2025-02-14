"use client";

import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColDef } from "ag-grid-community";

// 모듈 등록
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const CustomGrid = () => {
  const [rowData] = useState([
    { month: "2024.1", cost: 1000, category: "식비" },
    { month: "2024.1", cost: 2000, category: "쇼핑" },
    { month: "2024.1", cost: 3000, category: "영화" },
    { month: "2024.1", cost: 4000, category: "교통비" },
    { month: "2024.2", cost: 1000, category: "영화" },
    { month: "2024.2", cost: 2000, category: "식비" },
    { month: "2024.2", cost: 3000, category: "교통비" },
    { month: "2024.2", cost: 4000, category: "쇼핑" },
  ]);

  const columnDefs: ColDef[] = [
    { field: "month", rowGroup: true, hide: true },
    { field: "cost", aggFunc: "sum" },
    { field: "category" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      {/* <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        groupDefaultExpanded={0}
        animateRows={true}
        autoGroupColumnDef={{
          headerName: "Month",
          field: "month",
          cellRendererParams: { suppressCount: false },
        }}
      /> */}
    </div>
  );
};

export default CustomGrid;
