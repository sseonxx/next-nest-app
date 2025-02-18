// src/app/iga/ClientComponent.tsx
"use client";

import { getData } from '@/api/dataFetchApi';
import { useYearMonthSelector } from '@/hooks/useYearMonthSelector';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const CustomPieChart = dynamic(() => import('@/component/CustomPieChart'), { ssr: false });

type GridColumn = {
  CampaignName: string;
  Commission: number;
  Complete: number;
  Revenue: number;
  Datetime: string;
};

type Props = {
  defaultData: GridColumn[];
};

export default function ClientComponent({ defaultData }: Props) {
  const [data, setData] = useState<GridColumn[]>(defaultData);
  const [chartData, setChartData] = useState<{ name: string; y: number }[]>([]);
  const { selected, YearMonthSelector } = useYearMonthSelector();

  // 📊 하이차트 옵션
  const options: Highcharts.Options = {
    chart: { type: "pie", backgroundColor: '#f0f4f7' },
    title: { text: "캠페인별 수익 비용" },
    series: [
      { name: "수익", type: "pie", data: chartData },
    ],
  };

  // 🛠️ 테이블 컬럼 정의
  const columns: MRT_ColumnDef<GridColumn>[] = [
    { accessorKey: 'CampaignName', header: '캠페인명' },
    { accessorKey: 'Commission', header: '수수료', Cell: ({ cell }) => cell.getValue<number>().toLocaleString() },
    { accessorKey: 'Complete', header: '캠페인 완료 수', Cell: ({ cell }) => cell.getValue<number>().toLocaleString() },
    { accessorKey: 'Revenue', header: '월 수익', Cell: ({ cell }) => cell.getValue<number>().toLocaleString() },
    { accessorKey: 'Datetime', header: '시작날짜' },
  ];

  // 📦 데이터 가져오기 함수
  const fetchData = async () => {
    try {
      const newData = await getData(selected.year, selected.month);
      const processed = newData?.Payment?.Monthly?.flatMap((month: any) =>
        month?.App?.flatMap((app: any) =>
          app?.Campaign?.map((campaign: any) => ({
            CampaignName: campaign.CampaignName,
            Commission: campaign.Commission,
            Complete: campaign.Complete,
            Revenue: campaign.Revenue,
            Datetime: campaign.Datetime,
          }))
        )
      ).filter(Boolean);

      setData(processed || []);
    } catch (error) {
      console.error("🚨 데이터 가져오기 실패:", error);
    }
  };

  // 📡 데이터 변경 시 차트 업데이트
  useEffect(() => {
    const newChartData = data.map((item) => ({
      name: item.CampaignName,
      y: item.Revenue,
    }));
    setChartData(newChartData);
  }, [data]);

  // 📡 선택된 연도/월 변경 시만 fetch
  useEffect(() => {
    if (selected.year !== 2021 || selected.month) {
      fetchData();
    }
  }, [selected.year, selected.month]);

  return (
    <div className="mt-6">
      <YearMonthSelector />
      <CustomPieChart options={options} />
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnFilters
        muiTableBodyCellProps={{ sx: { padding: '4px 8px', fontSize: '12px' } }}
        muiTableHeadCellProps={{ sx: { textAlign: 'center', fontWeight: 'bold', fontSize: '14px' } }}
      />
    </div>
  );
}
