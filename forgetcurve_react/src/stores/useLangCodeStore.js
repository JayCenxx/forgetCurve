import { create } from 'zustand';

const useLangCodeStore = create(set => ({
  // by default front is Auto-Detect Language
  frontLangCode:{
    "language":"Auto-Detect",
    "langCode":"auto"},
  backLangCode: {
    "language":"",
    "langCode":""},
  setFrontLangCode:newlangCode => set({ frontLangCode: newlangCode }), 
  setBackLangCode: newlangCode => set({ backLangCode: newlangCode }), 
}))

export default useLangCodeStore;