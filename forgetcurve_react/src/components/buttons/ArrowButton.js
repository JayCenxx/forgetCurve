import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { buttonStyle } from "../../style/styles";
import useFlashCardStore from "../../stores/useFlashCardStore";

const ArrowButtons = ({ onLeftClick, onRightClick, children }) => {
 
const { card,curPage, nextPage, prevPage } = useFlashCardStore();

  return (
    <section className="flex items-center justify-center space-x-8 mt-3">
      <button onClick={prevPage} className={`${buttonStyle.round_container} bg-white`}>
        <FaChevronLeft className={`${buttonStyle.round_span} text-2xl text-gray-700`} />
      </button>
      <div className="text-lg">
      {curPage + 1}/{card.length}
      </div>
      <button onClick={nextPage} className={`${buttonStyle.round_container} bg-white`}>
        <FaChevronRight className={`${buttonStyle.round_span} text-2xl text-gray-700`} />
      </button>
    </section>
  );
};

export default ArrowButtons;
