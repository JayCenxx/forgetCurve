const {translate} = require('google-translate-api-x'); 
const langCodeService = async (input) => {
  const result = await translate(input, { to: "en" });
// return only the detected LangCode  
  return result.from.language.iso ;
};

module.exports=langCodeService;