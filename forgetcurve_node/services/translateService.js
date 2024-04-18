// services/translateService.js
const translate = require('google-translate-api-x');

const translateText = async (text, targetLangCode) => {
  try {
    const result = await translate(text, { to: targetLangCode });
    return result;
  } catch (error) {
    throw error; // Throw the error to be handled by the calling function
  }
};

module.exports = translateText;