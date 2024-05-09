import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import "../../style/flashCardTiptap.css";
import useTTStore from '../../stores/useTTStore';
import { useMediaQuery } from '@react-hook/media-query';

export default function Bubble({ text }) {

  const editor = useEditor({
    extensions: [StarterKit], 
    editable: false, // Set the initial editable state
  });

  const is1278Vp=useMediaQuery('(min-width: 1278.89px)');
  const is1023Vp=useMediaQuery('(min-width: 1023.33px)');
  const is552Vp=useMediaQuery('(max-width: 552.33px)'); 
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(""); // Create a ref for the hiding the bubble 
  const { cheapSynthesizeText}=useTTStore()
 
//setup media query
  const calculateLeftPosition = () => {
    //viewport bigger than 1278VP apply this
    if (is1278Vp) {
        return '27vw';
   //viewport bigger than 1023VP apply this
    } else if (is1023Vp) {
        return '16vw';
    //viewport smaller than 552VP apply this
    } else if (is552Vp) {
        return '11vw';
   //VP between 1023-522VP apply this
    } else {
        return '8vw';
    }
};

const leftPosition = `calc(${menuPosition.x}px - ${calculateLeftPosition()})`;

  const handleMouseUp = (event) => {
    if (!editor || !editor.view || !window.getSelection()) {
      return;
    }

    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      // const viewportWidth=window.innerWidth;
      // const viewportHeight=window.innerHeight;
  
      setMenuPosition({ 
        x: rect.x+rect.width/2 ,
        y:rect.y
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

  //this ll recalculate where the bubble show up 
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [editor]);

  //this ll remove the bubble once user click somewhere else
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
          className="bubble-menu absolute"
          ref={menuRef} // Assign the ref to the menu element
          style={{ 
            // set the bubble menu directly on top of the highlighted text
            left: leftPosition,
            top: `${menuPosition.y - 200}px`,
          }} >
          <button onClick={()=>cheapSynthesizeText(window.getSelection().toString())} className='text-lg btn btn-sm'>Speak</button>
        </div>
      )}
      <EditorContent editor={editor} />
    </>
  );
}