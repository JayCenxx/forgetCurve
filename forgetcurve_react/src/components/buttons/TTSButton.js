import React from "react";
import { RxSpeakerLoud } from "react-icons/rx";
import useTTStore from "../../stores/useTTStore";

const TTSButtons = ({ text }) => {
  const { cheapSynthesizeText } = useTTStore();

  const handleButtonClick = async () => {
    try {
      await cheapSynthesizeText(text);
    } catch (e) {
      console.error("Error playing the audio", e);
    }
  };

  return (
    <button onClick={handleButtonClick}>
      <RxSpeakerLoud />
    </button>
  );
};

export default TTSButtons;
