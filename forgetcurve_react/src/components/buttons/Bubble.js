import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import "../../style/flashCardTiptap.css";
import useTTStore from '../../stores/useTTStore';

export default function Bubble({ text }) {
   

  const editor = useEditor({
    extensions: [StarterKit], 
    editable: false, // Set the initial editable state
  });
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null); // Create a ref for the hiding the bubble 
  const { cheapSynthesizeText}=useTTStore()
  const handleMouseUp = (event) => {
    if (!editor) {
      return;
    }

    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setMenuPosition({
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY,
      });
      setMenuVisible(true);
    } else {
      setMenuVisible(false);
    }
  }; 

  //use to set the Menu invisible
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [editor]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuVisible]);

//   this is used to set text to Content (tiptap property)
  useEffect(() => {
    if (editor && text) {
      editor.commands.setContent(text); // Update editor content with text prop
    }
  }, [text, editor]);
 

 

  return (
    <>
      {editor && menuVisible && (
        <div
          className="bubble-menu"
          ref={menuRef} // Assign the ref to the menu element
          style={{
            position: 'absolute',
            // set the bubble menu directly on top of the highlighted text
            left: `${menuPosition.x - 570}px`,
            top: `${menuPosition.y - 180}px`,
          }} >
          <button onClick={()=>cheapSynthesizeText(window.getSelection().toString())} className='text-lg btn btn-sm'>Speak</button>
        </div>
      )}
      <EditorContent editor={editor} />
    </>
  );
}