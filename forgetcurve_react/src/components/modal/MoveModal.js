import { useEffect, useState } from "react";
import useCardArrayStore from "../../stores/useCardArrayStore";

export const MoveModal = ({ index3,isOpen, close ,moveCardJSX }) => {
  // have to make it a return function to ensure the lastest state of index3 is used
  if (!isOpen) return null;
 

  const confirm = () => {
    console.log(index3);
  };

  return (
    <>
        

       <main className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            {/* Icon or image */}
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Which position would you want to move it?</h3>
          {/* Input and buttons */}
          <input
            onChange={(e) =>
              moveCardJSX(index3, parseInt(e.target.value) - 1)
            }
            placeholder="Enter a Position index"
            className=" input w-full basis-9/12  ring-emerald-300 focus:border-none focus:ring shadow-xl"
          />
          <div className="items-center px-4 py-3">
            <button onClick={() => close()} className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-20 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
              Cancel
            </button>
            <button onClick={() => close()} className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-20 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ml-3">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};
