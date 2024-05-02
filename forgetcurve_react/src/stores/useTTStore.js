// useStores.js
import create from "zustand";
import axios from "axios";
import { fetchTTS } from "../services/fetchTTS";
import { getCardSet, updateCardSet } from "../utils/localStorageHelpers";

const useTTStore = create((set, get) => ({
  audio: null,
  lastText: "",
  autoSpeak: true,
  base64ToAudio:async(base64)=>{

    try{
      const audioContent = `data:audio/mp3;base64,${base64}`;
      const currentAudio = get().audio;

      // this is used to check if previous audio object exist, if yes stop playing it, so the new audio can interrupt it
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // use the base64 string to convert to mp3 to create an audio
      const newAudio = new Audio(audioContent);
      // play the mp3
      await newAudio.play();
      // setting the value to audio & lastText
      set({ audio: newAudio  });
    }catch(err){
      console.error("didnt interact with document",err) 
    }
  
  },
  cheapSynthesizeText: async (text) => {
    try {
      if (text && text.trim() !== "") {

        const {base64ToAudio}=get()
        let cacheKey = `${text}`;
        let dateId = '1'; // we assume that we use dateTime coming back from database
       
       let cardSet= getCardSet(dateId)
     localStorage.clear()
        // Check if the cacheKey already exists & get the base64 string, purpose is avoid API call
        if (cardSet.has(cacheKey)) {
           const base64=cardSet.get(cacheKey); 
           base64ToAudio(base64);
          return  ;
        }

        //else cacheKey dont exist, API call to get the TTS string. cSpeakText is on auto language detection
        const response = await fetchTTS(text)
        const {baseString}=response; 
        if (response && baseString) { 
          // Set new cacheKey and value
          cardSet.set(cacheKey, baseString);
    
          updateCardSet(dateId,cardSet)
        }
        //let it play for the first time
        base64ToAudio(baseString);

      }
    } catch (err) {
      console.error("cheapSynthesizeText Error", err);
      throw err;
    }
  },
  synthesizeText: async (text) => {
    // get audio & lastText's value
    const { audio, lastText } = get();

    // Synthesize only if audio is null or text has changed
    if (!audio || text !== lastText) {
      const Data = {
        input: { text },
        voice: {
          languageCode: "en-US",
          ssmlGender: "FEMALE",
          name: "en-US-Standard-G",
        },
        audioConfig: { speakingRate: 1 },
      };

      try {
        // axios call
        const response = await axios.post(
          "http://localhost:4000/google/speakText",
          Data
        );
        const baseString = `data:audio/mp3;base64,${response.data.baseString}`;
        // use the base64 string to convert to mp3 to create an audio
        const newAudio = new Audio(baseString);
        // play the mp3
        await newAudio.play();
        // setting the value to audio & lastText
        set({ audio: newAudio, lastText: text });
      } catch (error) {
        console.error("Error synthesizing text:", error);
      }
    } else {
      // play existing audio thats created + error handling
      audio.play().catch((error) => {
        console.error("Error playing the audio", error);
      });
    }
  },
}));

export default useTTStore;
