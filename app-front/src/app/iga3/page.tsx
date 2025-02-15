"use client"

import { getDemoData } from '@/api/dataFetchApi';
import CustomPieChart from '@/component/CustomPieChart';
import { GridColumn } from '@/type/GridColumn';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'

type Props = {}

type BubblePoint = { x: number; y: number; z: number; name: string; month: string };

const Page = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [chartData, setChartData] = useState<BubblePoint[]>([]);
  const [gridData, setGridData] = useState<GridColumn[]>([]);
  const [selected, setSelected] = useState<{ year: number; month?: number }>({ year: 2021 });
  // 하이차트 옵션
  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy',
        backgroundColor: '#f0f4f7',
        style: { fontFamily: 'Roboto, sans-serif' }
      },
      title: {
        text: '월별 캠페인 성과 버블 차트'
      },
      xAxis: {
        title: { text: '캠페인 완료 수' },
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
            월: {point.month}<br/>
            완료 수: {point.x}<br/>
            수익: {point.y}₩<br/>
            버블 크기(Revenue): {point.z}` },
      plotOptions: {
        bubble: {
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: [{
        name: '캠페인 성과',
        data: chartData,
        type: 'bubble'
      }],
    }),
    [chartData, categories, selected.month]
  );

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
    fetchData();
  }, [selected]);

  useEffect(() => {
    if (data) {
      const newChartData: BubblePoint[] = [];

      // 📆 Monthly 배열 순회
      data?.Payment?.Monthly?.forEach((monthObj: any, monthIndex: number) => {
        const monthName = `${monthIndex + 1}월`;
        monthObj.App?.forEach((app: any) => {
          newChartData.push({
            x: app.Complete, // 완료 수
            y: app.Revenue,  // 수익
            z: app.Revenue,  // 버블 크기
            name: app.AppName,
            month: monthName
          });
        });
      });

      setChartData(newChartData);

    }

  }, [data])

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
      <div> <CustomPieChart options={options} /></div>
    </div>
  )
}

export default Page