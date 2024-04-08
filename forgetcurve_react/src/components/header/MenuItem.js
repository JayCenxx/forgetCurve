
const MenuItem = ({ icon, text }) => {
    return (
      <main className="flex items-center justify-between  hover:bg-gray-100 px-4 py-3  cursor-pointer">
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{text}</span>
        </div>
      </main>
    );
  };
  
export default MenuItem;