"use client"
import { getDemoData } from '@/api/dataFetchApi';
import CustomPieChart from '@/component/CustomPieChart'
import { InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'

type Props = {}

type CampaignItem = {
  CampaignName: string;
  Revenue: number;
};

const Page = (props: Props) => {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState<{ name: string; y: number }[]>([]);
  const [selected, setSelected] = useState<{ year: number, month: number }>();
  const availableYear = [2018, 2019, 2020, 2021];


  const fetchData = async () => {
    try {
      const params = {
        search_year: 2021,
        search_month: 1
      }
      const response = await getDemoData(params);
      console.log("response>>", response.data);

      setData(response.data);


    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    console.log("selected >>", selected);

    fetchData();
  }, [selected])

  useEffect(() => {
    const campaigns = data?.Payment?.Monthly?.[0]?.App?.[0]?.Campaign;
    if (Array.isArray(campaigns)) {
      const newChartData = campaigns.map((item: CampaignItem) => ({
        name: item.CampaignName,
        y: item.Revenue,
      }));
      setChartData(newChartData);
    } else {
      console.warn("⚠️ Campaign 데이터가 올바르게 로드되지 않았습니다.");
    }
  }, [data]);





  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "캠페인별 수익 비용",
    },
    series: [
      {
        name: "비율",
        type: "pie",
        data: chartData,
      },
    ],
  };

  return (
    <div>
      {/* 캠페인 별 성과:
      해당 데이터로 제공될 수 있는 다양한 형태의 리포트를 자유롭게 구성성
      */}
      <div>

        <h2>캠페인별 수익 비용</h2>
        <InputLabel>연도 선택</InputLabel>
        <Select
          value={selected?.year || ''}
          onChange={(e) =>
            setSelected((prev) => ({
              ...prev,
              year: Number(e.target.value),
            }))
          }
          label="연도 선택"
        >
          {
            availableYear.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))
          }
        </Select>
        <InputLabel>월 선택</InputLabel>
        <Select
          value={selected.month || ''}
          onChange={(e) =>
            setSelected((prev) => ({
              ...prev,
              month: e.target.value ? Number(e.target.value) : undefined
            }))
          }
          label="월 선택 (선택 사항)"
        >
          <MenuItem value="">전체</MenuItem>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <MenuItem key={month} value={month}>{month}월</MenuItem>
          ))}
        </Select>


        <CustomPieChart options={options} />

        <h2>캠페인별 완료 건수 & 수익익</h2>


      </div>

      <div>

      </div>
    </div>
  )
}

export default Page