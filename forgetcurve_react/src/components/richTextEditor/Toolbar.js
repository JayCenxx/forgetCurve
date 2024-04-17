export const Toolbar = ({ activeEditor, setActiveEditor }) => {
    if (!activeEditor) {
      return null;
    }
  
    return (
      <div className="editor-toolbar flex border-b border-gray-300 p-2 space-x-1 bg-white ">
        <button
          onClick={() => {
            activeEditor.chain().focus().toggleBold().run();
            setActiveEditor(null); // Optionally reset the active editor after an action
          }}
          disabled={!activeEditor.can().chain().focus().toggleBold().run()}
        //isActive("bold") is a tiptap method, if <bold> format is active, then it return true, apply "is-active" to the className 
          className={`${activeEditor.isActive("bold") ? "is-active" : ""} font-medium p-2 m-1 rounded border border-gray-300 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          bold
        </button>
        {/* Add other toolbar buttons here */}
      </div>
    );
  };

