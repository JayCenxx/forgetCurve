import { Editor } from "@tiptap/react";
import { buttonStyle } from "../../style/styles";
import { FaBold } from "react-icons/fa6";
import { MdOutlineFormatListBulleted } from "react-icons/md";
// Toolbar.js
export const Toolbar = ({ activeEditor, setActiveEditor }) => {
    if (!activeEditor) return null;
  
    const handleButtonClick = () => {
      activeEditor.chain().focus().toggleBold().run();
      setActiveEditor(null); // Optionally reset the active editor after an action
    };
    const handleBulletListClick = () => {
        activeEditor.chain().focus().toggleBulletList().run();
      };
    
    return (
      <main className="editor-toolbar flex  border-gray-300  space-x-1 bg-white pb-3">
        <button
          onClick={handleButtonClick}
          disabled={!activeEditor.can().chain().focus().toggleBold().run()}
          className={` ${activeEditor.isActive("bold") ? 'is-active' : ''}  `}
        >
         <FaBold />
        </button>
    
        <button
          onClick={handleBulletListClick}
          disabled={!activeEditor.can().chain().focus().toggleBulletList().run()}
          className={`${activeEditor.isActive("bulletList") ? 'is-active' : ''} text-xl `}
        >
       <MdOutlineFormatListBulleted/>
        </button>
      </main>
    );
  };
