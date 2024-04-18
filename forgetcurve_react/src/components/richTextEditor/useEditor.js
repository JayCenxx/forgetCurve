// import { Color } from '@tiptap/extension-color'
// import TextStyle from '@tiptap/extension-text-style'
// import ListItem from '@tiptap/extension-list-item'
// import StarterKit from "@tiptap/starter-kit";

// export const useEdit=useEditor=>({
//     extensions: [
//         Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle.configure({ types: [ListItem.name] }),
//         StarterKit.configure({
//         bulletList: {
//           keepMarks: true,
//           keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//         },
//         orderedList: {
//           keepMarks: true,
//           keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//         },
//       })],
//     content: editorContent,
    
//   });