import { FaEllipsisV } from 'react-icons/fa'; // Make sure you have react-icons installed

const ThreedotsButton = () => {
  return (
    <button className="p-2 rounded-lg  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 ">
      <FaEllipsisV className="text-gray-800" />
    </button>
  );
};

export default ThreedotsButton;