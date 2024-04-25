import { useEffect, useRef, useState } from "react";

// MoveModal.js
export const MoveModal = ({ index3, isOpen, close, moveCardJSX }) => {
  const [targetPosition, setTargetPostion] = useState("");
  const inputRef = useRef(null);
  const modalRef = useRef(null);  // Reference to the modal content

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          close();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, close]);

  const inputHandler = (e) => {
    setTargetPostion(e.target.value);
  };

  const confirmMove = (e) => {
    e.stopPropagation();
    if (targetPosition) {
      moveCardJSX(index3, parseInt(targetPosition) - 1);
    }
    close();
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      confirmMove(e);
    }  
  };

  if (!isOpen) return null;
  return (
    <>
      <main
        className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-10"
        id="my-modal"
      >
        <section
          ref={modalRef}   
          className="relative top-60 mx-auto p-4 w-1/4 shadow-lg rounded-md bg-gray-100 rounded-2xl"
        >
          <div className="mt-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Which position would you want to move it?
            </h3>
            <input
              ref={inputRef}
              onChange={inputHandler}
              onKeyPress={keyPress}
              placeholder="Enter a Position index"
              className="input w-full basis-9/12 ring-emerald-300 focus:border-none focus:ring shadow-xl mt-3 h-15"
              type="number"
            />
            <div className="flex py-3 space-x-4">
              <div className="basis-7/12"></div>
              <button className="btn btn-error text-lg" onClick={() => close()}>
                Cancel
              </button>
              <button
                className="btn btn-accent text-lg"
                onClick={(e) => confirmMove(e)}
              >
                Confirm
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};