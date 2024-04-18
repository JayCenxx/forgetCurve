import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import '../style/tipTapStyle.css'

const TextEditor = () => {
  const { editor } = useCurrentEditor();
  const [isVisible, setIsVisible] = useState(false);

  if (!editor) {
    return null;
  }
  
const showUp=()=>{
  setIsVisible(!isVisible)
}

  return (
    <>
    {isVisible&& <main className="editor-toolbar flex border-b border-gray-300 p-2 space-x-1 bg-white ">
        <button
      
          onClick={() =>editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${editor.isActive("bold") ? "is-active" : ""}  font-medium p-2 m-1 rounded border
          border-gray-300  transition  duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        > bold </button>
      </main>}
      <button onClick={showUp}>touch me</button>
  
    </>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>

`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <>
    <EditorProvider
      slotBefore={<TextEditor />}
      extensions={extensions}
      content={content}
    ></EditorProvider>


    </>
  );
};
