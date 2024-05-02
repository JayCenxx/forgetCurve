// useStores.js
import create from "zustand";
import axios from "axios";

const useTTStore = create((set, get) => ({
  audio: null,
  lastText: "",
  autoSpeak: false,
  base64ToAudio:async(base64)=>{
    const audioContent = `data:audio/mp3;base64,${base64}`;
    // use the base64 string to convert to mp3 to create an audio
    const newAudio = new Audio(audioContent);
    // play the mp3
    await newAudio.play();
    // setting the value to audio & lastText
    set({ audio: newAudio  });
  },
  cheapSynthesizeText: async (text) => {
    try {
      if (text && text.trim() !== "") {

        const {base64ToAudio}=get()
        let cacheKey = `${text}`;
        let dateId = '1'; // we assume that we use dateTime coming back from database
       
        //check if this cardSet exist, 
        let cardSet = localStorage.getItem(dateId);
        //  if dataTimeID exist, we want to get the inner HashMap to cardSet from Outer Hashmap, else set it as an empty map , also gotta convert to JS string
        cardSet = cardSet ? new Map(JSON.parse(cardSet)) : new Map();
    
        // Check if the cacheKey already exists & get the base64 string, purpose is avoid API call
        if (cardSet.has(cacheKey)) {
           const base64=cardSet.get(cacheKey); 
           base64ToAudio(base64);
          return  ;
        }

        //else cacheKey dont exist, API call to get the TTS string. cSpeakText is on auto language detection
        const response = await axios.post("http://localhost:4000/google/cSpeakText", { text });
       
        if (response && response.data.baseString) { 
          // Set new cacheKey and value
          cardSet.set(cacheKey, response.data.baseString);
    
          // Update localStorage/outer-HashMap with the new set  ,  also gotta convert to JSON when u set
          localStorage.setItem(dateId, JSON.stringify([...cardSet]));
        }
 
        base64ToAudio(response.data.baseString);

      }
    } catch (e) {
      console.error(e);
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
