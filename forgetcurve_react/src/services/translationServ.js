
import axios from "axios";

const translateServ = async (frontTexts, frontLangCodes, backLangCodes) => {
  try {
    const result = await axios.post("http://localhost:4000/google/translate", {
      frontText: frontTexts,
      frontLangCode: frontLangCodes,
      backLangCode: backLangCodes,
    });
    // result{data{frontText,targetLang} }
    return result.data;
  } catch (error) {
    console.error("Error in translation at translationServ", error);
  }
};

export default translateServ;
