import { IoSwapHorizontal } from "react-icons/io5";

export const SwapButton = ({ handleSwap2, className }) => (
  <button className={`${className} mr-6 ml-4 text-xl`} onClick={handleSwap2}>
    <IoSwapHorizontal />
  </button>
);
