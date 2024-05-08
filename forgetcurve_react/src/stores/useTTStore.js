// useStores.js
import create from "zustand";
import axios from "axios";
import { fetchTTS } from "../services/fetchTTS";
import { getCardSet, updateCardSet } from "../utils/localStorageHelpers";

const useTTStore = create((set, get) => ({
  audio: null,
  lastText: "",
  autoSpeak: false, 
  flipAutoSpeak: ()=>set((oldState)=>{return {autoSpeak: !oldState.autoSpeak}}),
  stopCurrentAudio:()=>{
    try{

      const currentAudio = get().audio; 
      // this is used to check if previous audio object exist, if yes stop playing it, so the new audio can interrupt it
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }catch(err){
      console.error("error at stopCurrentAudio",err);
    }
  },
  base64ToAudio:async(base64,isSinglePlay)=>{

    try{
      const audioContent = `data:audio/mp3;base64,${base64}`;
      get().stopCurrentAudio()

      // use the base64 string to convert to mp3 to create an audio
      const newAudio = new Audio(audioContent);

      //for text with <200 chars
      if(isSinglePlay){
         // play the mp3
        await newAudio.play();
        set({ audio: newAudio   });
      }
      else{ 
        //this is for >200 characters  
        await new Promise((resolve, reject) => { 
          newAudio.onended = resolve;
          newAudio.onerror = reject;
          newAudio.play();
          //duplicated code i know, but this is the code that solve the problem with multiple tts playin at the sametime
          set({ audio: newAudio   });
        });
      } 
    }catch(err){
      console.error("problem at base64ToAudio",err) 
    }
  
  },
  base64ArrayToAudio: async (base64Array) => {  
      //for <=200 chars
      if(typeof base64Array==="string"){
        get().base64ToAudio(base64Array,true); 
      }
      //for >200 chars
      else{
        for (const base64 of base64Array) {
          await get().base64ToAudio(base64);
        } 
      } 
  },
  toAduioAndSetLastText:(base64,text)=>{
    get().base64ArrayToAudio(base64); 
    set({lastText:text})
  },
  cheapSynthesizeText: async (text) => {
    try {
      const {toAduioAndSetLastText,stopCurrentAudio}=get()
      //if the text is empty, no need to speak it
      if (text && text.trim() !== "") {
  
           //if same text & audio is playing, 2nd time u click the speak button, it ll stop it, 3rd time it ll play from beginning
           if(text===get().lastText){ 
            stopCurrentAudio()
            //set lastText back to "" so u can play a 2nd time
            set({lastText:""})
            return
          } 
          //else diff Text just replace the existing one 
  
        let cacheKey = `${text}`;
        let dateId = '1'; // we assume that we use dateTime coming back from database
      
       let cardSet= getCardSet(dateId)  
        // Check if the cacheKey already exists & get the base64 string, purpose is avoid API call
        if (cardSet.has(cacheKey)) { 
           const base64=cardSet.get(cacheKey); 
           toAduioAndSetLastText(base64,text) 
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
        toAduioAndSetLastText(baseString,text)  
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
