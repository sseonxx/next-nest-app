import React from 'react'
import PieChart from '@/component/PieChart';
import CustomGrid from '@/component/CustomGrid';
import CustomGrid2 from '@/component/CustomGrid2';




const Page: React.FC = () => {
  return (
    <div>
      <h2>piechart</h2>
      <PieChart />

      <h2>grid</h2>
      {/* <CustomGrid /> */}
      <CustomGrid2 />
    </div>
  )
}

export default Page;