// routes/speechRoutes.js
const express = require('express');
const router = express.Router();
const synthesizeSpeech = require('../services/speechService');
const translate = require('google-translate-api-x');

// text to speech 
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

// translate
router.post('/translate', async (req, res) => {
    const { frontText, frontLangCode, backLangCode } = req.body;
console.log(frontText, frontLangCode, backLangCode);
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

module.exports = router;