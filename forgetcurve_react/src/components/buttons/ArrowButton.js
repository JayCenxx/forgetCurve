import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { buttonStyle } from "../../style/styles";

const ArrowButtons = ({ onLeftClick, onRightClick, children }) => {
  return (
    <section className="flex items-center justify-center space-x-8 mt-3">
      <button onClick={onLeftClick} className={`${buttonStyle.round_container} bg-white`}>
        <FaChevronLeft className={`${buttonStyle.round_span} text-2xl text-gray-700`} />
      </button>
      <div className="text-lg">
        {children}
      </div>
      <button onClick={onRightClick} className={`${buttonStyle.round_container} bg-white`}>
        <FaChevronRight className={`${buttonStyle.round_span} text-2xl text-gray-700`} />
      </button>
    </section>
  );
};

export default ArrowButtons;
