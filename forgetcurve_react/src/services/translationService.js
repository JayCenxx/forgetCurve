import translate from "google-translate-api-x";

const translateService = async (front, targetLang) => {
  try {
    console.log('1');
    const res = await translate(front, { to: 'es' });
    console.log('2');
    return {
      translateText: res.text,
      langCode: res.from.langugage.iso,
    };
  } catch (error) {
    console.error("Error during translation:", error);
  }
};

export default translateService;
