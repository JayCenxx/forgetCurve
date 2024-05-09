const {translate} = require('google-translate-api-x'); 
const langCodeService =  (input) => {
   return  translate(input, { to: "en" })
  .then(  result=>result.from.language.iso) // return only the detected LangCode  
  .catch(err=>{
    console.error("error in getting the LangCode",err);
    throw err
  })


};

module.exports=langCodeService;