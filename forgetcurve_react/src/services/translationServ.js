
import axios from "axios";
const cache = {};

const translateServ = async (frontTexts, frontLangCodes, backLangCodes) => {
 // Generate a cache key based on the text and target language
 const cacheKey = `${frontTexts}-${frontLangCodes}-${backLangCodes}`;

 // Check the cache first
 if (cache[cacheKey]) {
   return cache[cacheKey];
 }

 try {
   const result = await axios.post("http://localhost:4000/google/etranslate", {
     frontText: frontTexts,
     frontLangCode: frontLangCodes,
     backLangCode: backLangCodes,
   });

   // Cache the result using the generated key
   cache[cacheKey] = result.data;

// result{data{frontText,targetLang} }
   return result.data;
 } catch (error) {
   console.error("Error in translation at translationServ", error);
 }
};

export default translateServ;
