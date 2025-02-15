"use client";

import { getDemoData } from '@/api/dataFetchApi';
import CustomPieChart from '@/component/CustomPieChart';
import { useYearMonthSelector } from '@/hooks/useYearMonthSelector';
import React, { useEffect, useMemo, useState } from 'react';
import { create } from 'zustand';

type Props = {};

type Store = {
  selectedApp: string | null;
  setSelectedApp: (app: string | null) => void;
};
const useAppStore = create<Store>((set) => ({
  selectedApp: null,
  setSelectedApp: (app) => set({ selectedApp: app }),
}));

export const getColorForApp = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

const Page = (props: Props) => {
  const [data, setData] = useState<any>(null);
  const [appChartData, setAppChartData] = useState<any[]>([]);
  const [campaignChartData, setCampaignChartData] = useState<any[]>([]);
  const { selectedApp, setSelectedApp } = useAppStore();
  const { selected, YearMonthSelector } = useYearMonthSelector();

  // 앱별 Highcharts 옵션
  const appChartOptions: Highcharts.Options = useMemo(() => ({
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy',
      backgroundColor: '#f0f4f7',
      style: { fontFamily: 'Roboto, sans-serif' }
    },
    title: { text: '앱(App)별 통합 성과 버블 차트' },
    xAxis: { title: { text: '완료 수(Complete)' } },
    yAxis: { title: { text: '수익(Revenue)' } },
    tooltip: {
      useHTML: true,
      pointFormat: `
        <b>{point.name}</b><br/>
        완료 수: {point.x}<br/>
        수익: {point.y}<br/>
        ROI(버블 크기): {point.z}`
    },
    plotOptions: {
      series: {
        point: {
          events: {
            click: function () {
              setSelectedApp(this.name);
            }
          }
        }
      }
    },
    series: appChartData
  }), [appChartData, setSelectedApp]);

  // 캠페인별 Highcharts 옵션
  const campaignChartOptions: Highcharts.Options = useMemo(() => {
    if (!selectedApp) {
      return {
        chart: { type: 'bubble', backgroundColor: '#f7f7f7' },
        title: { text: '' },
        xAxis: { title: { text: '완료 수(Complete)' } },
        yAxis: { title: { text: '수익(Revenue)' } },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              align: 'center',
              verticalAlign: 'middle',
              style: {
                // fontSize: '18px',
                // color: '#999',
                textAlign: 'center'
              }
            }
          }
        },
        series: [{
          type: 'scatter',
          data: [[0, 0]],
          showInLegend: false,
          dataLabels: {
            enabled: true,
            format: "🖱️ 앱을 클릭하여 상세 캠페인을 확인하세요"
          }
        }]
      };
    }

    return {
      chart: { type: 'bubble', backgroundColor: '#f7f7f7' },
      title: { text: `${selectedApp}의 상위 10개 캠페인 버블 차트` },
      xAxis: { title: { text: '완료 수(Complete)' } },
      yAxis: { title: { text: '수익(Revenue)' } },
      tooltip: {
        useHTML: true,
        pointFormat: `
          <b>{point.name}</b><br/>
          완료 수: {point.x}<br/>
          수익: {point.y}<br/>
          ROI(버블 크기): {point.z}%<br/>
          수수료: {point.fee}₩`
      },
      plotOptions: {
        bubble: {
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: campaignChartData
    };
  }, [campaignChartData, selectedApp]);

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
    setSelectedApp(null)
  }, [selected]);

  useEffect(() => {
    if (data) {
      const appSummary: Record<string, { complete: number; revenue: number; commission: number }> = {};

      data?.Payment?.Monthly?.forEach((monthObj: any) => {
        monthObj.App?.forEach((app: any) => {
          const appName = app.AppName;
          if (!appSummary[appName]) {
            appSummary[appName] = { complete: 0, revenue: 0, commission: 0 };
          }

          app?.Campaign?.forEach((campaign: any) => {
            appSummary[appName].complete += campaign.Complete || 0;
            appSummary[appName].revenue += campaign.Revenue || 0;
            appSummary[appName].commission += campaign.Commission || 0;
          });
        });
      });

      const seriesData = Object.entries(appSummary).map(([name, { complete, revenue, commission }]) => {
        const roi = commission > 0 ? Math.round((revenue / commission) * 100) : revenue;
        return {
          name,
          color: getColorForApp(name),
          data: [{ x: complete, y: revenue, z: roi, name }]
        };
      });

      setAppChartData(seriesData);
    }
  }, [data]);

  //선택된 앱의 상위 10개 캠페인 데이터 생성
  useEffect(() => {
    if (selectedApp && data) {
      const campaignSummary: Record<string, { complete: number; revenue: number; commission: number }> = {};

      data?.Payment?.Monthly?.forEach((monthObj: any) => {
        monthObj.App?.forEach((app: any) => {
          if (app.AppName === selectedApp) {
            app?.Campaign?.forEach((campaign: any) => {
              const campaignName = campaign.CampaignName;
              if (!campaignSummary[campaignName]) {
                campaignSummary[campaignName] = { complete: 0, revenue: 0, commission: 0 };
              }
              campaignSummary[campaignName].complete += campaign.Complete || 0;
              campaignSummary[campaignName].revenue += campaign.Revenue || 0;
              campaignSummary[campaignName].commission += campaign.Commission || 0;
            });
          }
        });
      });

      // 상위 10개 선택
      const top10Campaigns = Object.entries(campaignSummary)
        .sort(([, a], [, b]) => b.revenue - a.revenue)
        .slice(0, 10)
        .map(([name, { complete, revenue, commission }]) => {
          const roi = commission > 0 ? Math.round((revenue / commission) * 100) : revenue;
          return {
            name,
            color: getColorForApp(name),
            data: [{
              x: complete,
              y: revenue,
              z: roi,
              name,
              fee: commission
            }]
          };
        });

      setCampaignChartData(top10Campaigns);
    }
  }, [selectedApp, data]);

  return (
    <div>
      <h2>캠페인 별 ROI(Return on investment)</h2>
      <YearMonthSelector />

      <div style={{ margin: '20px', display: 'flex', gap: '20px' }}>
        {/* 앱별 버블 차트 */}
        <CustomPieChart options={appChartOptions} />
        {/* 캠페인별 버블 차트 */}
        <CustomPieChart options={campaignChartOptions} />
      </div>
    </div>
  );
};

export default Page;
