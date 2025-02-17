"use client"

import { getDemoData } from '@/api/dataFetchApi';
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { convertDotNetDate } from '@/common/format';
import { useYearMonthSelector } from '@/hooks/useYearMonthSelector';
import { useExcelExport } from '@/hooks/useExcelExport';
import dynamic from 'next/dynamic';
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

type Props = {};

const Page = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [chartData, setChartData] = useState<{ name: string; y: number }[]>([]);
  const [gridData, setGridData] = useState<GridColumn[]>([]);
  const { selected, setSelected, YearMonthSelector } = useYearMonthSelector();
  const { exportToExcel } = useExcelExport();




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

  // 데이터 불러오기
  const fetchData = async () => {
    try {
      const params = selected.month
        ? { search_year: selected.year, search_month: selected.month }
        : { search_year: selected.year };

      const response = await getDemoData(params);

      setData(response.data);
    } catch (error: any) {
      console.error("Fetch Error:", error.message);
    }
  };

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

  useEffect(() => {
    setSelected({ year: 2021, month: undefined });
  }, [])

  useEffect(() => {
    fetchData();
  }, [selected]);

  // 엑셀 다운로드 핸들러
  const handleExportToExcel = () => {
    exportToExcel(gridData, '캠페인_수익_데이터');
  };


  return (
    <div>
      <h2>캠페인별 수익 비용</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button onClick={handleExportToExcel} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          엑셀 다운로드
        </button>
      </div>
      <YearMonthSelector />
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
};

export default Page;
