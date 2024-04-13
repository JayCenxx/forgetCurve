// useStores.js
import create from 'zustand';
import axios from 'axios';

const useTTStore = create((set, get) => ({
  audio: null,
  lastText: '',
  autoSpeak:false,
  synthesizeText: async (text) => {
    // get audio & lastText's value
    const { audio, lastText } = get();
    
    // Synthesize only if audio is null or text has changed
    if (!audio || text !== lastText) {
      const Data = {
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: "FEMALE", name: 'en-US-Standard-G'},
        audioConfig: {speakingRate: 1 },
      };

      try {
        // axios call 
        const response = await axios.post('http://localhost:4000/google/speakText', Data);
        const audioContent = `data:audio/mp3;base64,${response.data.audioContent}`;
        // use the base64 string to convert to mp3 to create an audio
        const newAudio = new Audio(audioContent);
        // play the mp3
        await newAudio.play();
        // setting the value to audio & lastText
        set({ audio: newAudio, lastText: text });
      } catch (error) {
        console.error('Error synthesizing text:', error);
      }
    } else {
        // play existing audio thats created + error handling 
      audio.play().catch((error) => {
        console.error('Error playing the audio', error);
      });
    }
  }
}));

export default useTTStore;