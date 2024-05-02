import useCardArrayStore from "../../stores/useCardArrayStore";
import useLangCodeStore from "../../stores/useLangCodeStore";
import { SwapButton } from "../buttons/SwapButton";


export const EditButtonGroup = () => {
    // Get the swap function from the card array store
    const {swapTextAndLangCodes} = useCardArrayStore( );
  
    // Get the current language codes from the language code store
    const { backLangCode, frontLangCode } = useLangCodeStore();
  
    // Call swap function and pass the current language codes
    const handleSwap = () => { 
        swapTextAndLangCodes(frontLangCode,backLangCode );
    }
  
    return (
      <>
      <main className="flex mb-4 mt-20">
        <span className="grow"></span>
      <SwapButton handleSwap2={handleSwap} className="btn btn-square btn-outline"/>
      <span className="basis-[12%]"></span>
      </main>
 
 
      </>
   
    );
  };