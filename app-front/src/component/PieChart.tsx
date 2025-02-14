"use client"; // 클라이언트 컴포넌트로 설정

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = () => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "하이차트 Pie Chart 예제",
    },
    series: [
      {
        name: "비율",
        type: "pie",
        data: [
          { name: "A", y: 40 },
          { name: "B", y: 30 },
          { name: "C", y: 20 },
          { name: "D", y: 10 },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;