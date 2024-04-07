import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { buttonStyle } from "../../style/styles";

const ArrowButtons = () => {
  return (
    <section className="flex items-center justify-center space-x-8 mt-3">
      <button className={`${buttonStyle.round_container} `}>
        <FaChevronLeft className={buttonStyle.round_span} />
      </button>
      <button className={`${buttonStyle.round_container} `}>
        <FaChevronRight className={buttonStyle.round_span} />
      </button>
    </section>
  );
};

export default ArrowButtons;
