import axios from 'axios';
import React, { useState ,useEffect} from 'react';

function MenuItem() {
  const [menuItem, setMenuItem] = useState({
    itemName: 'chicken',
    price: '100',
    calories: '100',
    description: 'sss',
    imageUrl: 'chicken',
  });

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get('/fetchMenuItem');
        setMenuItem({
          itemName: response.data.itemName,
          price: response.data.price,
          calories: response.data.calories,
          description: response.data.description,
          imageUrl: response.data.imageUrl,
        });
      } catch (error) {
        console.error('There was an error fetching the menu item:', error);
      }
    };

    fetchMenuItem();
  }, []);

  return (
    <main className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg w-80 h-80"> {/* Adjusted for square shape */}
      {menuItem.imageUrl && (
        <img
          src={menuItem.imageUrl}
          alt={menuItem.itemName}
          className="w-32 h-32 mb-2 rounded-lg" /* Adjusted for square shape */
        />
      )}
      <div className="text-center">
        <span className="text-lg font-bold">{menuItem.itemName}</span>
        <span className="text-gray-500 block">{menuItem.price} · {menuItem.calories} Cal.</span>
        <span className="text-green-500 font-bold block">{menuItem.description}</span>
      </div>
      <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-full mt-2">
        +
      </button>
    </main>
  );
}

export default MenuItem;