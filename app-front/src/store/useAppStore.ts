import { create } from 'zustand';

type StoreState = {
  selected: { year: number; month?: number | null };
  setSelected: (newSelected: { year: number; month?: number }) => void;

  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void;
}

export const useAppStore = create<StoreState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  selected: { year: 2021, month: undefined },
  setSelected: (newSelected) => set((prev) => ({ ...prev, selected: newSelected }))
}));