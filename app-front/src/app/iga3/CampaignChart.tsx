"use client";

import { getDemoData } from '@/api/dataFetchApi';
import CustomPieChart from '@/component/CustomPieChart';
import { GridColumn } from '@/type/GridColumn';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

type Props = {};

type BubblePoint = { x: number; y: number; z: number; name: string };

// 🎨 동적 색상 생성 (HSL 기반)
export const getColorForCampaign = (campaignName: string) => {
  let hash = 0;
  for (let i = 0; i < campaignName.length; i++) {
    hash = campaignName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

const CampaignChart = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selected, setSelected] = useState<{ year: number; month?: number }>({ year: 2021 });

  // 📊 Highcharts 옵션 설정
  const options: Highcharts.Options = useMemo(() => ({
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy',
      backgroundColor: '#f0f4f7',
      style: { fontFamily: 'Roboto, sans-serif' }
    },
    title: { text: '📊 캠페인별 통합 성과 버블 차트' },
    xAxis: {
      title: { text: '캠페인 완료 수(Complete)' },
      gridLineWidth: 1
    },
    yAxis: {
      title: { text: '수익(Revenue) (₩)' },
      labels: { format: '{value}₩' }
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<b>{point.name}</b><br>',
      pointFormat: `
        완료 수(Complete): {point.x}<br/>
        총 수익(Revenue): {point.y}₩<br/>
        ROI(%) [버블 크기]: {point.z}`
    },
    plotOptions: {
      bubble: {
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    },
    series: chartData
  }), [chartData]);

  // 📡 데이터 불러오기
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

  useEffect(() => {
    fetchData();
  }, [selected]);

  // 📊 캠페인별 데이터 통합
  useEffect(() => {
    if (data) {
      const campaignSummary: Record<string, { complete: number; revenue: number; commission: number }> = {};

      data?.Payment?.Monthly?.forEach((monthObj: any) => {
        monthObj.App?.forEach((app: any) => {
          app?.Campaign?.forEach((campaign: any) => {
            const campaignName = campaign.CampaignName;
            if (!campaignSummary[campaignName]) {
              campaignSummary[campaignName] = { complete: 0, revenue: 0, commission: 0 };
            }

            campaignSummary[campaignName].complete += campaign.Complete || 0;
            campaignSummary[campaignName].revenue += campaign.Revenue || 0;
            campaignSummary[campaignName].commission += campaign.Commission || 0;
          });
        });
      });

      // 📈 데이터 포인트 생성
      const seriesData = Object.entries(campaignSummary).map(([name, { complete, revenue, commission }]) => {
        const roi = commission > 0 ? Math.round((revenue / commission) * 100) : revenue;
        return {
          name,
          color: getColorForCampaign(name),
          data: [{ x: complete, y: revenue, z: roi, name }]
        };
      });

      setChartData(seriesData);
    }
  }, [data]);

  // 📆 연도 변경 핸들러
  const handleYearChange = (e: SelectChangeEvent<number>) => {
    const year = Number(e.target.value);
    setSelected({ year, month: undefined });
  };

  // 📆 월 변경 핸들러
  const handleMonthChange = (e: SelectChangeEvent<number>) => {
    const month = e.target.value === '' ? undefined : Number(e.target.value);
    setSelected((prev) => ({
      ...prev,
      month,
    }));
  };

  // 🖼️ UI 렌더링
  return (
    <div>
      <div style={{ margin: '20px', display: 'flex', gap: '20px' }}>
        <FormControl variant="outlined" style={{ minWidth: 100 }} size='small'>
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

        <FormControl variant="outlined" style={{ minWidth: 100 }} size='small'>
          <InputLabel>월 선택</InputLabel>
          <Select
            value={selected.month ?? ''}
            onChange={handleMonthChange}
            label="월 선택"
          >
            <MenuItem value=""><em>전체</em></MenuItem>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <MenuItem key={month} value={month}>{month}월</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div> 
        <CustomPieChart options={options} />
      </div>
    </div>
  );
};

export default CampaignChart;