import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const MyEditor = ({ editorContent, onEditorFocus }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      // ... any other extensions you need
    ],
    content: editorContent,
  });

  // Notify the parent when this editor is focused
  const handleFocus = () => {
    onEditorFocus(editor);
  };

  return editor ? (
    <div onFocus={handleFocus}>
      <EditorContent editor={editor} />
    </div>
  ) : null;
};