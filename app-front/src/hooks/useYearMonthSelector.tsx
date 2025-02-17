import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useAppStore } from '@/store/useAppStore';

export const useYearMonthSelector = () => {
  const { selected, setSelected } = useAppStore();

  const handleYearChange = (e: SelectChangeEvent<number>) => {
    const year = Number(e.target.value);
    setSelected({ year, month: undefined });
  };

  const handleMonthChange = (e: SelectChangeEvent<number>) => {
    const month = e.target.value === '' ? undefined : Number(e.target.value);
    setSelected({ year: selected.year, month });
  };

  const YearMonthSelector = () => (
    <div style={{ margin: '20px', display: 'flex', gap: '20px' }}>
      {/* 연도 선택 */}
      <FormControl variant="outlined" style={{ minWidth: 100 }} size="small">
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

      {/* 월 선택 */}
      <FormControl variant="outlined" style={{ minWidth: 100 }} size="small">
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
  );

  return { selected, setSelected, YearMonthSelector };
};
