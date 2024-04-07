import { FaEllipsisV } from 'react-icons/fa'; // Make sure you have react-icons installed
import { dropDownStores } from '../../stores/mainStores';


const ThreedotsButton = () => {
  const { isOpen, setIsOpen } = dropDownStores(state => ({ isOpen: state.isOpen, setIsOpen: state.setIsOpen }));
  return (
    <button className="p-2 rounded-lg  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 "   onClick={() => setIsOpen(!isOpen)}>
      <FaEllipsisV className="text-gray-800" />
    </button>
  );
};

export default ThreedotsButton;