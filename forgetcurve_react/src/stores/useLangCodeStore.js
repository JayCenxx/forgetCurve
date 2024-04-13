import { create } from 'zustand';

const useLangCodeStore = create(set => ({
  langCode: "en",
  setlangCode: newlangCode => set({ langCode: newlangCode }), 
}))

export default useLangCodeStore;