import create from "zustand";

import { clamp } from "./utils";

const useStore = create((set, get) => {
  return {
    score: 0,
    increment: (value = 1) => set((state) => (state.score = clamp(state.score + value, 0, Number.MAX_SAFE_INTEGER))),
    decrement: (value = 1) => set((state) => (state.score = clamp(state.score - value, 0, Number.MAX_SAFE_INTEGER))),
  };
});

export default useStore;
