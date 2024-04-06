//useStores.js
import { create } from 'zustand';

const useStores = create((set) => ({
  bears: 10,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  updateBears: newBears => set({ bears: newBears }),
}))

export default useStores;