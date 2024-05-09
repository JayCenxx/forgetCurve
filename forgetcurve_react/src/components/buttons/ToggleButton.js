import { useState } from "react";
import useTTStore from "../../stores/useTTStore";

 
export const ToggleButton = ({ handleSwap2, className }) => {
    
const {flipAutoSpeak}=useTTStore()

  const [isChecked, setIsChecked] = useState(false);
  const handleToggle=() => {
    setIsChecked(!isChecked)
    flipAutoSpeak()
  }
    
    return(
  <>
  <main className="form-control">
    <label className="label cursor-pointer space-x-2">
      <span className=" ">Auto-Speak:</span> 
      <input type="checkbox" checked={isChecked} className="toggle" onChange={handleToggle} />
    </label>
 </main>
  </>
);
}
