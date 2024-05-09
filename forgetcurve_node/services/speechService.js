// services/speechService.js
const axios = require('axios');
const { googleUrl } = require('../config/config');

const synthesizeSpeech =  (input, voice, audioConfig) => {
  const requestData = {
    input,
    voice,
    audioConfig: { audioEncoding: 'MP3', speakingRate: audioConfig.speakingRate },
  };
 
    // axios call to fetch the base64 speech string 
   return axios.post(googleUrl, requestData)
    .then(response=>response.data)
    .catch(err =>{
     console.error(err)
     throw err;
    }  )
     
}

module.exports = synthesizeSpeech;