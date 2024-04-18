import { Editor } from "@tiptap/react";
import { buttonStyle } from "../../style/styles";

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
          className={` ${activeEditor.isActive("bold") ? 'is-active' : ''} ${buttonStyle.round_container} ${buttonStyle.round_span} h-10 w-10`}
        >
          bold
        </button>
    
        <button
          onClick={handleBulletListClick}
          disabled={!activeEditor.can().chain().focus().toggleBulletList().run()}
          className={`${activeEditor.isActive("bulletList") ? 'is-active' : ''} ${buttonStyle.round_container} ${buttonStyle.round_span} h-10 w-10`}
        >
        Bullet
        </button>
      </main>
    );
  };
