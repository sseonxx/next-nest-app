"use client"

import { getDemoData } from '@/api/dataFetchApi';
import React, { useEffect, useMemo, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { convertDotNetDate, formatToYearMonth } from '@/common/format';
import { GridColumn } from '@/type/GridColumn';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import CustomPieChart from '@/component/CustomPieChart';
type Props = {}

const Page = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([]);
  const [gridData, setGridData] = useState<GridColumn[]>([]);
  const [selected, setSelected] = useState<{ year: number; month?: number }>({ year: 2021 });

  const options: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Corn vs wheat estimated production for 2023'
    },
    subtitle: {
      text:
        'Source: <a target="_blank" ' +
        'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
    },
    xAxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      crosshair: true,
      accessibility: {
        description: 'Countries'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: '1000 metric tons (MT)'
      }
    },
    tooltip: {
      valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: chartData,
  }

  const columns: MRT_ColumnDef<GridColumn>[] = [
    {
      accessorKey: 'month',
      header: '',
      enableGrouping: true,
      maxSize: 100,
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
      AggregatedCell: ({ cell }) => `Total Revenue: ${cell.getValue<number>()}`
    },
    {
      accessorKey: 'Complete',
      header: '캠페인 완료 수',
      AggregatedCell: ({ cell }) => `Total Revenue: ${cell.getValue<number>()}`,
      maxSize: 100,
    },
    {
      accessorKey: 'Revenue',
      header: '월 수익',
      aggregationFn: 'sum',
      AggregatedCell: ({ cell }) => `Total Revenue: ${cell.getValue<number>()}`
    },
  ]



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
    fetchData();
  }, [selected]);

  useEffect(() => {
    if (data) {
      // 모든 Monthly 배열의 Campaign 데이터 병합
      const allCampaigns = data?.Payment?.Monthly?.flatMap((month: any, index: number) =>
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
      ).filter(Boolean); // undefined 제거

      console.log("allCampaigns >>", allCampaigns);

      const allCampaigns2 = data?.Payment?.Monthly?.flatMap((month: any, index: number) =>
        month?.App?.flatMap((app: any) =>
        ({
          Revenue: app.Revenue,
          month: formatToYearMonth(month.Datetime),
        })
        )
      )
      console.log("allCampaigns2 >>", allCampaigns2);


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

      if (Array.isArray(allCampaigns2) && allCampaigns2.length > 0) {

        const newChartData = allCampaigns2.map((item) => (
          item.Revenue
        ));
console.log("newChartData>>",newChartData);


        setChartData(newChartData);
      } else {
        console.warn('Campaign 데이터가 올바르게 로드되지 않았습니다.');
      }
    }
  }, [data]);

  const handleYearChange = (e: SelectChangeEvent<number>) => {
    const year = Number(e.target.value);
    setSelected({ year, month: undefined });
  }

  const handleMonthChange = (e: SelectChangeEvent<number>) => {
    const month = e.target.value === '' ? undefined : Number(e.target.value);
    setSelected((prev) => ({
      ...prev,
      month,
    }));
  };

  return (
    <div>
      <h2>📊 월별 성과</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>연도 선택</InputLabel>
          <Select
            value={selected.year}
            onChange={handleYearChange}
            label="연도 선택"
          >
            {[2018, 2019, 2020, 2021].map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>월 선택 (선택 사항)</InputLabel>
          <Select
            value={selected.month || ''}
            onChange={handleMonthChange}
            label="월 선택 (선택 사항)"
          >
            <MenuItem value="">전체</MenuItem>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <MenuItem key={month} value={month}>{month}월</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <CustomPieChart options={options} />
      </div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', margin: '20px' }}>
        <MaterialReactTable
          columns={columns}
          data={gridData}
          enableColumnFilters
          enableGrouping // 그룹핑 활성화
          enablePagination={false}
          enableRowVirtualization={true}
          muiTableContainerProps={{ sx: { minHeight: '800px', maxHeight: '800px' } }} // 스크롤 높이 제한
          initialState={{
            grouping: ['month', 'AppName'], // 초기에 'state' 컬럼으로 그룹화
            expanded: false, // 그룹을 기본적으로 펼침
          }}
        />
      </div>
    </div>
  )
}

export default Page