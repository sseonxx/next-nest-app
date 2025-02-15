import { create } from 'zustand';

type StoreState = {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void;
}

export const useAppStore = create<StoreState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
}))