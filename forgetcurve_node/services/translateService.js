// services/translateService.js
const translate = require('google-translate-api-x');

const translateText = async (text, targetLang) => {
  try {
    const result = await translate(text, { to: targetLang });
    return result;
  } catch (error) {
    throw error; // Throw the error to be handled by the calling function
  }
};

module.exports = translateText;