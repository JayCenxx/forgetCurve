// routes/speechRoutes.js
const express = require('express');
const router = express.Router();
const synthesizeSpeech = require('../services/speechService');

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
    const { text, to } = req.body;
  
    // Validate the input
    if (!text || !to) {
      return res.status(400).json({ error: 'Both text and target language are required' });
    }
  
    try {
      const result = await translateText(text, to);
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