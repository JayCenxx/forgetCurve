// routes/speechRoutes.js
const express = require('express');
const router = express.Router();
const synthesizeSpeech = require('../services/speechService');

router.post('/synthesize-speech', async (req, res) => {
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

module.exports = router;