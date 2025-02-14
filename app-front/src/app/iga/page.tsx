"use client"
import { getDemoData } from '@/api/dataFetchApi';
import CustomPieChart from '@/component/CustomPieChart';
import React, { useEffect, useMemo, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import CustomGrid4 from '@/component/CustomGrid4';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { convertDotNetDate } from '@/common/format';

type CampaignItem = {
  CampaignName: string;
  Revenue: number;
};

type GridColumn = {
  // CampaignKey
  CampaignName: string; //캠페인명
  Commission: number; // 수수료
  Complete: number; //캠페인 완료수
  Revenue: number; // 해당월 수익
  Datetime: string; //
}


type Props = {};

const Page = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [chartData, setChartData] = useState<{ name: string; y: number }[]>([]);
  const [gridData, setGridData] = useState<GridColumn[]>([]);
  const [selected, setSelected] = useState<{ year: number; month?: number }>({ year: 2021 });

  const columns: MRT_ColumnDef<GridColumn>[] = [
    {
      accessorKey: 'CampaignName',
      header: '캠페인명',
    },
    {
      accessorKey: 'Commission',
      header: '수수료',
    },
    {
      accessorKey: 'Complete',
      header: '캠페인 완료 수',
    },
    {
      accessorKey: 'Revenue',
      header: '월 수익익',
    },
    {
      accessorKey: 'Datetime',
      header: '시작날짜',
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

  //  데이터 변경 시 차트 데이터 생성
  useEffect(() => {
    if (data) {
      // 모든 Monthly 배열의 Campaign 데이터 병합
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
        console.log('📊 Chart Data (전체 월 데이터 포함):', newChartData);
      } else {
        console.warn('⚠️ Campaign 데이터가 올바르게 로드되지 않았습니다.');
      }
    }
  }, [data]);

  // 선택된 연도와 월이 변경될 때 데이터 다시 불러오기
  useEffect(() => {
    fetchData();
  }, [selected]);

  // 📈 하이차트 옵션 구성
  const options: Highcharts.Options = {
    chart: { type: "pie" },
    title: { text: "캠페인별 수익 비용" },
    series: [
      {
        name: "수익",
        type: "pie",
        data: chartData,
      },
    ],
  };

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
      <h2>📊 캠페인별 수익 비용</h2>

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
      <CustomPieChart options={options} />

      <MaterialReactTable columns={columns} data={gridData} enableColumnFilters />

    </div>
  );
};

export default Page;
