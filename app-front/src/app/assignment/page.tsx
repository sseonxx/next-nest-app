import React from 'react'
import PieChart from '@/component/PieChart';
import CustomGrid from '@/component/CustomGrid';
import CustomGrid2 from '@/component/CustomGrid2';
import CustomGrid3 from '@/component/CustomGrid3';
import CustomGrid4 from '@/component/CustomGrid4';




const Page: React.FC = () => {
  return (
    <div>
      <h2>piechart</h2>
      <PieChart />

      <h2>grid</h2>
      {/* <CustomGrid /> */}
      {/* <CustomGrid2 /> */}

      <CustomGrid3 />
      <CustomGrid4 />
    </div>
  )
}

export default Page;