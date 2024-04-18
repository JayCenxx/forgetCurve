
import { buttonStyle } from "../../style/styles";

// Toolbar.js
export const Toolbar = ({ activeEditor }) => {
  if (!activeEditor) return null;

  const handleBoldClick = () => {
    activeEditor.chain().focus().toggleBold().run();
  };

  const handleBulletListClick = () => {
    activeEditor.chain().focus().toggleBulletList().run();
  };

  return (
    <div className="editor-toolbar flex  border-gray-300  space-x-1 bg-white">
      <button
        onClick={handleBoldClick}
        disabled={!activeEditor.isActive('bold')}
        className={` ${activeEditor.isActive("bold") ? 'is-active' : ''} ${buttonStyle.round_container} ${buttonStyle.round_span} h-10 w-10`}
      >
        bold
      </button>

      <button
        onClick={handleBulletListClick}
        className={activeEditor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet List
      </button>

    </div>
  );
};
