"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  options: Highcharts.Options
}

const CustomPieChart = (props: Props) => {
  const { options } = props;
  
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default CustomPieChart