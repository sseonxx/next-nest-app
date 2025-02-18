"use client";

import { getData, getDemoData } from '@/api/dataFetchApi';
import { convertDotNetDate } from '@/common/format';
import { useYearMonthSelector } from '@/hooks/useYearMonthSelector';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
const CustomPieChart = dynamic(() => import('@/component/CustomPieChart'), { ssr: false });


type CampaignItem = {
  CampaignName: string;
  Revenue: number;
};

type GridColumn = {
  CampaignName: string; // 캠페인명
  Commission: number; // 수수료
  Complete: number; // 캠페인 완료수
  Revenue: number; // 해당월 수익
  Datetime: string; // 시작날짜
}

type Props = {
  defaultData: any;
};


export default function ClientComponent({ defaultData }: Props) {
  const [data, setData] = useState(defaultData);
  const [chartData, setChartData] = useState<{ name: string; y: number }[]>([]);
  const [gridData, setGridData] = useState<GridColumn[]>([]);
  const { selected, setSelected, YearMonthSelector } = useYearMonthSelector();


  // 하이차트 옵션
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: '#f0f4f7',
      style: { fontFamily: 'Roboto, sans-serif' }
    },
    title: { text: "캠페인별 수익 비용" },
    series: [
      {
        name: "수익",
        type: "pie",
        data: chartData,
      },
    ],
  };

  //그리드 컬럼 정보
  const columns: MRT_ColumnDef<GridColumn>[] = [
    {
      accessorKey: 'CampaignName',
      header: '캠페인명',
    },
    {
      accessorKey: 'Commission',
      header: '수수료',
      Cell: ({ cell }) => cell.getValue<number>().toLocaleString(),
    },
    {
      accessorKey: 'Complete',
      header: '캠페인 완료 수',
      Cell: ({ cell }) => cell.getValue<number>().toLocaleString(),
    },
    {
      accessorKey: 'Revenue',
      header: '월 수익',
      Cell: ({ cell }) => cell.getValue<number>().toLocaleString(),
    },
    {
      accessorKey: 'Datetime',
      header: '시작날짜',
    },
  ]

  // 데이터 가져오기 함수
  const fetchData = async () => {
    const result = await getData(selected.year, selected.month);
    setData(result);
  };

  useEffect(() => {
    if (selected.year !== 2024 || selected.month) {
      fetchData();
    }
  }, [selected.year, selected.month]);

    //  데이터 변경 시 차트 데이터 생성
    useEffect(() => {
      if (data) {
        // 모든 Monthly 배열의 Campaign 데이터  병합
        const allCampaigns = data?.Payment?.Monthly?.flatMap((month: any) =>
          month?.App?.flatMap((app: any) =>
            app?.Campaign?.map((campaign: CampaignItem & GridColumn) => ({
              CampaignName: campaign.CampaignName,
              Commission: campaign.Commission,
              Complete: campaign.Complete,
              Revenue: campaign.Revenue,
              Datetime: convertDotNetDate(campaign.Datetime),
            }))
          )
        ).filter(Boolean); // undefined 제거
  
        if (Array.isArray(allCampaigns) && allCampaigns.length > 0) {
          const newChartData = allCampaigns.map((item) => ({
            name: item.CampaignName,
            y: item.Revenue,
          }));
  
          const newGridData = allCampaigns.map((item) => ({
            CampaignName: item.CampaignName,
            Commission: item.Commission,
            Complete: item.Complete,
            Revenue: item.Revenue,
            Datetime: item.Datetime,
          }));
  
          setChartData(newChartData);
          setGridData(newGridData);
  
        } else {
          console.warn('데이터 오류');
        }
      }
    }, [data]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">📆 연/월 선택</h3>
      <YearMonthSelector />

      {/* 동적 데이터 출력 */}
      <CustomPieChart options={options} />
      <MaterialReactTable
        columns={columns}
        data={gridData}
        enableColumnFilters
        muiTableBodyCellProps={{
          sx: {
            padding: '4px 8px',
            fontSize: '12px',
          }
        }}
        muiTableHeadCellProps={{
          sx: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
          }
        }}
      />
    </div>
  );
}