import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { RxSpeakerLoud } from 'react-icons/rx';

const TTSButtons = ({ text }) => {

  const [audio, setAudio] = useState(null);

  const Data = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: "FEMALE", name: 'en-US-Standard-G'},
    audioConfig: {speakingRate: 1 },
  };


  const synthesizeText = useCallback(async () => {
    if(audio!==null)// Clear the existing audio if any
    setAudio(null) 

    try {
      const response = await axios.post('http://localhost:4000/synthesize-speech', Data);
      const audioContent = `data:audio/mp3;base64,${response.data.audioContent}`;

          // if post is success, it ll ve a property call audiocontent, use it to create a new audio
      const newAudio = new Audio(audioContent);
         //  play audio the first time audio object return a promise, n pause here when it is playing so it wont move to the next line of 
      await newAudio.play();
      // set audio state not null, so the next time it wont synthesize & api call again (cost money!)
      setAudio(newAudio);
    } catch (error) {
      console.error('Error synthesizing text:', error);
    }
  }, [text]); // run again when ever text changes

  const handleButtonClick = () => {
    if (!audio) {
      synthesizeText();
    } else {
      audio.play().catch((error) => console.error('Error playing the audio', error));
    }
  };


  return (
    <>
      <button onClick={handleButtonClick}>
        <RxSpeakerLoud />
      </button>
    </>
  );
};

export default TTSButtons;