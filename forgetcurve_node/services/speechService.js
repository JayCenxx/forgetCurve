// services/speechService.js
const axios = require('axios');
const { googleUrl } = require('../config/config');

const synthesizeSpeech = async (input, voice, audioConfig) => {
  const requestData = {
    input,
    voice,
    audioConfig: { audioEncoding: 'MP3', speakingRate: audioConfig.speakingRate },
  };

  try {
    // axios call to fetch the base64 speech string 
    const response = await axios.post(googleUrl, requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = synthesizeSpeech;