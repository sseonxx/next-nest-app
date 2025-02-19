"use client"

import { getDemoData } from '@/api/dataFetchApi';
import React, { useEffect, useMemo, useState } from 'react';
import { convertDotNetDate, formatToYearMonth } from '@/common/format';
import { GridColumn } from '@/type/GridColumn';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { useYearMonthSelector } from '@/hooks/useYearMonthSelector';
import { useExcelExport } from '@/hooks/useExcelExport';
import dynamic from 'next/dynamic';
const CustomPieChart = dynamic(() => import('@/component/CustomPieChart'), { ssr: false });

type Props = {}

const Page = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [chartData, setChartData] = useState<{ name: string; data: (number | null)[]; stack?: string }[]>([]);
  const [gridData, setGridData] = useState<GridColumn[]>([]);
  const { selected, setSelected, YearMonthSelector } = useYearMonthSelector();
  const { exportToExcel } = useExcelExport();

  

  // 하이차트 옵션
  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: 'column',
        backgroundColor: '#f0f4f7',
        style: { fontFamily: 'Roboto, sans-serif' }
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: categories,
        title: { text: selected.month ? 'App Name' : 'Month' },
      },
      yAxis: {
        min: undefined,
        title: { text: 'Revenue' },

      },
      tooltip: { valueSuffix: '' },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          minPointLength: 5,
          stacking: 'normal' //stack 추가
        }
      },
      series: chartData.map(item => ({
        type: 'column',
        name: item.name,
        data: item.data
      })) as Highcharts.SeriesOptionsType[]
    }),
    [chartData, categories, selected.month]
  );

  //그리드 컬럼 정보
  const columns: MRT_ColumnDef<GridColumn>[] = [
    {
      accessorKey: 'month',
      header: '',
      enableGrouping: true,
      maxSize: 120,
    },
    {
      accessorKey: 'AppName',
      header: '앱명',
      enableGrouping: true,
    },
    {
      accessorKey: 'CampaignName',
      header: '캠페인명',
    },
    {
      accessorKey: 'Commission',
      header: '수수료',
      AggregatedCell: ({ cell }) => `${cell.getValue<number>().toLocaleString()}`,
      Cell: ({ cell }) => cell.getValue<number>().toLocaleString(),
    },
    {
      accessorKey: 'Complete',
      header: '캠페인\n완료 수',
      AggregatedCell: ({ cell }) => `${cell.getValue<number>().toLocaleString()}`,
      Cell: ({ cell }) => cell.getValue<number>().toLocaleString(),
      // maxSize: 100,
    },
    {
      accessorKey: 'Revenue',
      header: '월 수익',
      aggregationFn: 'sum',
      AggregatedCell: ({ cell }) => `${cell.getValue<number>().toLocaleString()}`,
      Cell: ({ cell }) => cell.getValue<number>().toLocaleString(),
    },
  ]

  // 데이터 불러오기
  const fetchData = async () => {
    try {
      const params = selected.month
        ? { search_year: selected.year, search_month: selected.month }
        : { search_year: selected.year };

      const response = await getDemoData(params);
      console.log("response >>", response);


      setData(response.data);
    } catch (error: any) {
      console.error("Fetch Error:", error.message);
    }
  };
  useEffect(() => {
    setSelected({ year: 2021, month: undefined });
  }, [])
  useEffect(() => {
    fetchData();
  }, [selected]);

  useEffect(() => {
    if (data) {
      // 1. 모든 Campaign 데이터 병합
      const allCampaigns = data?.Payment?.Monthly?.flatMap((month: any) =>
        month?.App?.flatMap((app: any) =>
          app?.Campaign?.map((campaign: GridColumn) => ({
            month: formatToYearMonth(campaign.Datetime),
            AppKey: app.AppKey,
            AppName: app.AppName,
            CampaignKey: campaign.CampaignKey,
            CampaignName: campaign.CampaignName,
            Commission: campaign.Commission,
            Complete: campaign.Complete,
            Revenue: campaign.Revenue,
            Datetime: convertDotNetDate(campaign.Datetime),
          }))
        )
      ).filter(Boolean);

      // 2. Grid 데이터 설정
      if (Array.isArray(allCampaigns) && allCampaigns.length > 0) {
        const newGridData = allCampaigns.map((item) => ({
          month: item.month,
          AppKey: item.AppKey,
          AppName: item.AppName,
          CampaignKey: item.CampaignKey,
          CampaignName: item.CampaignName,
          Commission: item.Commission,
          Complete: item.Complete,
          Revenue: item.Revenue,
          Datetime: item.Datetime,
        }));
        setGridData(newGridData);
      } else {
        console.warn('Campaign 데이터가 올바르게 로드되지 않았습니다.');
      }

      // 3. 차트 데이터 생성: 월별 Revenue 합계
      if (selected.month) {
        const appRevenue: Record<string, number> = {};
        data?.Payment?.Monthly?.forEach((month: any) => {
          console.log("month >>", month);

          month?.App?.forEach((app: any) => {
            appRevenue[app.AppName] = (appRevenue[app.AppName] || 0) + app.Revenue;
          });

        });
        const apps = Object.keys(appRevenue);

        setCategories(apps);
        const series = Object.entries(appRevenue).map(([name, value]) => ({
          name,
          data: [value]
        }))
        setChartData(series);
      } else {
        const appRevenueByMonth: Record<string, Record<string, number>> = {};

        data?.Payment?.Monthly?.forEach((month: any) => {
          const monthKey = formatToYearMonth(month.Datetime);
          month?.App?.forEach((app: any) => {
            if (!appRevenueByMonth[app.AppName]) {
              appRevenueByMonth[app.AppName] = {};
            }
            appRevenueByMonth[app.AppName][monthKey] = (appRevenueByMonth[app.AppName][monthKey] || 0) + (app.Revenue || 0);
          });
        });

        const categories = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
        setCategories(categories);

        const series = Object.entries(appRevenueByMonth).map(([appName, monthlyData]) => ({
          name: appName,
          data: categories.map((month, index) => {
            const monthKey = `${selected.year}.${String(index + 1).padStart(2, '0')}`; // ex: 2020.01
            const value = monthlyData[monthKey] || 0
            return value === 0 ? null : value;
          }),
          stack: 'monthlyRevenue',
        }));

        setChartData(series);
      }
    }
  }, [data]);

  // 엑셀 다운로드 핸들러
  const handleExportToExcel = () => {
    exportToExcel(gridData, '월별_성과_데이터');
  };

  return (
    <div>
      <h2>월별 성과</h2>
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
        enableGrouping // 그룹핑 활성화
        enablePagination={false} // 페이지네이션 비활성화
        enableRowVirtualization={true} //행 가상화 활성화화
        muiTableContainerProps={{ sx: { minHeight: '500px', maxHeight: '500px' } }} // 스크롤 높이 제한
        muiTableHeadCellProps={{
          sx: {
            textAlign: 'center', // 📑 헤더 중앙 정렬
            fontWeight: 'bold',
            fontSize: '14px',
          }
        }}
        muiTableBodyRowProps={({ row }) => ({
          sx: {
            backgroundColor: row.depth === 0 ? '#e5f6fd' : // 최상위 그룹 행
              row.depth === 1 ? '#F4FBFE' : // 2차 그룹 행
                'white', // 일반 행은 흰색
            color: row.depth === 0 ? 'black' : 'inherit',

          }
        })}

        muiTableBodyCellProps={{
          sx: {
            padding: '4px 8px',
            fontSize: '12px',
          }
        }}
        initialState={{
          grouping: ['month', 'AppName'],
        }}
      />

    </div >
  )
}

export default Page