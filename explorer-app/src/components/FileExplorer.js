import React, { useState } from 'react';
import TreeNode from './TreeNode';


const FileExplorer = () => {
  // Define the initial file system state using useState
  const [fileSystem, setFileSystem] = useState({
    name: 'root',
    type: 'folder',
    children: [
      {
        name: 'folder1',
        type: 'folder',
        children: [
          {
            name: 'subfolder1',
            type: 'folder',
            children: [
              { name: 'file1.txt', type: 'file' },
              { name: 'file2.txt', type: 'file' },
            ],
          },
        ],
      },
      { name: 'file3.txt', type: 'file' },
      { name: 'file4.txt', type: 'file' },
    ],
  });

  // Function to update the file system when a new folder is added or renamed
  const updateFileSystem = (oldName, newName, type = 'folder') => {
    setFileSystem((prevFileSystem) => {
      const updateTree = (node) => {
        if (node.name === oldName) {
          return { ...node, name: newName, type };
        }
        if (node.children) {
          return { ...node, children: node.children.map(updateTree) };
        }
        return node;
      };

      return updateTree(prevFileSystem);
    });
  };

  return (
    <div>
      <h1>File Explorer</h1>
      <TreeNode node={fileSystem} level={0} updateFileSystem={updateFileSystem} />
    </div>
  );
};

export default FileExplorer;
