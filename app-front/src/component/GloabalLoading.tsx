"use client"

import { useAppStore } from '@/store/useAppStore';
import React from 'react'

type Props = {}

const GloabalLoading = (props: Props) => {
  const { isLoading } = useAppStore();


  if (!isLoading) return null;
  return (

    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Data is loading..</p>
    </div>)
}

export default GloabalLoading