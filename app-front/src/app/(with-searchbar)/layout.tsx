import React, { cloneElement, ReactNode } from 'react'
import Searchbar from '@/component/searchbar';


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Searchbar />
      {children}
    </>

  );
};

export default Layout