// routes/speechRoutes.js
const express = require('express');
const router = express.Router();
const synthesizeSpeech = require('../services/speechService');
const translate = require('google-translate-api-x');
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

router.post('/translate', async (req, res) => {
    const { frontText, targetLang } = req.body;

    console.log( frontText, targetLang);
    // Validate the input
    if (!frontText || !targetLang) {
      return res.status(400).json({ error: 'Both text and target language are required' });
    }
  
    try {
    
      const result = await translate(frontText, {to:targetLang});
      res.json({
        translatedText: result.text,
        langCode: result.from.language.iso
      });
    } catch (error) {
      console.error('Error translating:', error);
      res.status(500).json({ error: 'Error processing your translation request' });
    }
  });

module.exports = router;