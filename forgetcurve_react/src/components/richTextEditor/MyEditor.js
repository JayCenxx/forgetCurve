// MyEditor.js

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

export const MyEditor = ({ editorContent, onEditorFocus, changeContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent,
  });

  // Update editor content when `editorContent` prop changes
  useEffect(() => {
    if (editor && editorContent !== editor.getHTML()) {
        // use to update backText, when user click the translate translation button
      editor.commands.setContent(editorContent);
    }
  }, [editor, editorContent]);


  
  useEffect(() => {
    if (!editor) return;

    const unsub = editor.on("update", data => {
        // notify the parent component about the change, trigger whenever user type in front & back editor
      changeContent(data.editor.getHTML());
    });
  
    // Only store unsub if it's a function
    if (typeof unsub === 'function') {
      return () => unsub();
    }
  }, [editor, changeContent]);

  return editor ? (
    <div onFocus={() => onEditorFocus(editor)} className="flex flex-col basis-6/12" >
      <EditorContent editor={editor} className="mr-2 p-1 border-b-2 border-dash focus:outline-none flex-grow"/>
    </div>
  ) : null;
};