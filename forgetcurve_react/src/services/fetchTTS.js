

import axios from 'axios';

export const fetchTTS = async(text) =>{
    return axios.post("http://localhost:4000/google/cSpeakText", { text })
    .then(response => response.data)
    .catch(error => {
      console.error("API error:", error);
      throw error;
    });
}