// import create from 'zustand';
// import translate from 'google-translate-api-x';

// const useTranslationStore = create(set => ({
//   translation: '',
//   error: null,
//   translateText: async (text, targetLanguage = 'en') => {
//     try {
//       const result = await translate(text, { to: targetLanguage });
//       set({ translation: result.text });
//     } catch (error) {
//       set({ error });
//     }
//   },
// }));

// export default useTranslationStore;