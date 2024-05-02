// routes/speechRoutes.js
const express = require('express');
const router = express.Router();
const synthesizeSpeech = require('../services/speechService');
const {translate, speak} = require('google-translate-api-x'); 
const {TranslationServiceClient} = require('@google-cloud/translate');
const  langCodeService  = require('../services/langCodeService');
const client = new TranslationServiceClient();


//expensive text to speech 
router.post('/speakText', async (req, res) => {
  const { input, voice, audioConfig } = req.body;

  if (!input || !input.text) {
    return res.status(400).json({ error: 'Text is required' });
  }else if (!voice ){
    return res.status(400).json({ error: 'voice is required' });
  }else if(!audioConfig){
    return res.status(400).json({ error: 'audioConfig is required' });
  }

  try {
    const data = await synthesizeSpeech(input, voice, audioConfig);
    res.json(data);
  } catch (error) {
    console.error('Error calling the Google TTS API:', error.message);
    res.status(500).json({ error: 'Error processing your request' });
  }
}
);

//cheap TTS
router.post('/cSpeakText', async(req,res)=>{
try {
  const {text}=req.body; 
  const detectLangCode=await langCodeService(text);
   const ttsBase64=await speak(text, {to:detectLangCode}) 
  res.json({
    "baseString":ttsBase64
  });
}
catch(e){
  console.error(e)
} 
})

//free translation service
router.post('/ctranslate', async (req, res) => {
    const { frontText, frontLangCode, backLangCode } = req.body;
    // Validate the input
    if (!frontText || !backLangCode) {
      return res.status(400).json({ error: 'Both text and target-language are required' });
    }
    try {
  //  user selected auto lang detection for Front
      if(frontLangCode ==="auto"){
        const result = await translate(frontText, {to:backLangCode, autoCorrect: true});
        res.json({
          translatedText: result.text,
          // this is the auto detection code 
          langCode: result.from.language.iso
        });
      }else{
        // otherwise the user selected a frontLangCode
        const result = await translate(frontText, {from:frontLangCode,to:backLangCode, autoCorrect: true});
        res.json({
          translatedText: result.text,
          langCode: frontLangCode
        });
      }
    } catch (error) {
      console.error('Error translating:', error);
      res.status(500).json({ error: 'Error processing your translation request' });
    }
  });

//expensive  translate
  router.post('/etranslate', async (req, res) => {

    const { frontText, frontLangCode, backLangCode } = req.body;
    if (!frontText || !backLangCode) {
      return res.status(400).json({ error: 'Both text and target language are required' });
    }
  
    const request = {
      parent: `projects/${process.env.PROJECT_ID}/locations/${process.env.LOCATION}`,
      contents: [frontText],
      mimeType: 'text/plain',
      targetLanguageCode: backLangCode,
    };
  
 
  
    try {
      const [response] = await client.translateText(request);
      const translations = response.translations;

      if(frontLangCode==='auto'){
        res.json({
          translatedText: translations[0].translatedText,
          detectedLanguageCode: translations[0].detectedLanguageCode
        });
      }
      else{
        res.json({
          translatedText: translations[0].translatedText,
          detectedLanguageCode: translations[0].detectedLanguageCode,
          front: frontLangCode,
        });
      }
     

      
    } catch (error) {
      console.error('Translation API error:', error);
      res.status(500).json({ error: 'Error processing your translation request', details: error.message });
    }
  });




module.exports = router;