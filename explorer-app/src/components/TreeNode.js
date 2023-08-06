import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaPlus } from 'react-icons/fa';

const TreeNode = ({ node, level, updateFileSystem }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const [isRenaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleToggle = () => {
    if (node.type === 'folder') {
      setCollapsed(!isCollapsed);
    }
  };

  const handleRename = () => {
    setRenaming(true);
  };

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    // Save the renamed name using an appropriate function or server API
    setRenaming(false);
  };

  const handleAddFolder = () => {
    const folderName = prompt('Enter the folder name:');
    if (folderName) {
      // Simulate the folder creation by updating the state (replace this with backend logic)
      updateFileSystem(node.name,folderName,'folder');
    }
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>

      <div>
        {node.type === 'folder' && (
          <span onClick={handleToggle}>
            {isCollapsed ? <FaFolder /> : <FaFolderOpen />}
          </span>
        )}
        {node.type === 'folder' && (
          <button onClick={handleAddFolder} className="icon-btn">
            <FaPlus />
          </button>
        )}
        {isRenaming ? (
          <form onSubmit={handleRenameSubmit}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRenameSubmit}
              autoFocus
            />
          </form>
        ) : (
          <span onDoubleClick={handleRename}>
            {node.name} {node.type === 'file' ? <FaFile /> : ''}
          </span>
        )}
      </div>
      {!isCollapsed && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.name} node={child} level={level + 1} updateFileSystem={updateFileSystem} />
          ))}
        </div>
      )}

    </div>
  );
};

export default TreeNode;
