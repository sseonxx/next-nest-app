"use client"

import { getDemoData } from '@/api/dataFetchApi';
import React, { useEffect, useMemo, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { convertDotNetDate } from '@/common/format';
import { GridColumn } from '@/type/GridColumn';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
type Props = {}

const Page = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [gridData, setGridData] = useState<GridColumn[]>([]);
  const [selected, setSelected] = useState<{ year: number; month?: number }>({ year: 2021 });


  const columns: MRT_ColumnDef<GridColumn>[] = [
    {
      accessorKey: 'AppName',
      header: '앱명',
    },
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
      header: '월 수익',
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

  useEffect(() => {
    fetchData();
  }, [selected]);

  useEffect(() => {
    if (data) {
      // 모든 Monthly 배열의 Campaign 데이터 병합
      const allCampaigns = data?.Payment?.Monthly?.flatMap((month: any) =>
        month?.App?.flatMap((app: any) =>
          app?.Campaign?.map((campaign: GridColumn) => ({
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


      if (Array.isArray(allCampaigns) && allCampaigns.length > 0) {

        const newGridData = allCampaigns.map((item) => ({
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
        console.warn('⚠️ Campaign 데이터가 올바르게 로드되지 않았습니다.');
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
      <MaterialReactTable columns={columns} data={gridData} enableColumnFilters />
    </div>
  )
}

export default Page