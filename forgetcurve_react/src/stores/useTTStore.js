// useStores.js
import create from "zustand";
import axios from "axios";

const useTTStore = create((set, get) => ({
  audio: null,
  lastText: "",
  autoSpeak: false,
  cheapSynthesizeText: async (text) => {
    try {
      if (text && text.trim() !== "") {
        let cacheKey = `${text}`;
        let dateId = '1'; // LocalStorage keys should be strings
    
        //check if this cardSet exist
        let cardSet = localStorage.getItem(dateId);
        //  if dataTimeID exist, we want to get the inner HashMap to cardSet, else set it as an empty map
        cardSet = cardSet ? new Map(JSON.parse(cardSet)) : new Map();
    
        // Check if the cacheKey already exists, return to avoid API call
        if (cardSet.has(cacheKey)) {
          return cardSet.get(cacheKey);
        }
    
        //else cacheKey dont exist, API call to get the TTS string
        const response = await axios.post("http://localhost:4000/google/cSpeakText", { text });
        if (response && response.baseString) {
          // Set new cacheKey and value
          cardSet.set(cacheKey, response.baseString);
    
          // Update localStorage/outer-HashMap with the new set
          localStorage.setItem(dateId, JSON.stringify([...cardSet]));
        }
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
        const audioContent = `data:audio/mp3;base64,${response.data.audioContent}`;
        // use the base64 string to convert to mp3 to create an audio
        const newAudio = new Audio(audioContent);
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
