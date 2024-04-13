import translate from "google-translate-api-x";
import axios from 'axios';

const translateServ = async (frontTexts, targetLangs) => {
  try {
    console.log('hey');
    const result=await axios.post('http://localhost:4000/google/translate',{frontText:frontTexts,targetLang:targetLangs})
    return result;

  } catch (error) {
    console.error("Error in translation at translationServ", error);
  }
};

export default translateServ;
