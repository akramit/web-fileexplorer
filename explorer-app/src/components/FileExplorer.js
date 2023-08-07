import React, { useEffect, useState } from "react"
import TreeNode from "./TreeNode"
import "./fileExplorer.css"

const FileExplorer = () => {
	const [fileSystem, setFileSystem] = useState(null)

	useEffect(() => {
		getDirectory()
	}, [])

	const getDirectory = () => {
		fetch("http://127.0.0.1:5432/directory")
			.then(res => res.json())
			.then(data => {
				setFileSystem(data)
			})
	}

	const handleAddFolder = async () => {
		const folderName = prompt("Enter the folder name:")
		if (folderName) {
			const updatedPath =   "./"
			const response = await fetch("http://127.0.0.1:5432/newdir", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ dir_name: folderName, path: updatedPath }),
			})
			console.log({ folderName, response })
			getDirectory()
		}
	}

	return (
		<div className='file-explorer'>
			<h1>File Explorer</h1>
			<button onClick={handleAddFolder} > + New Folder</button>
			{fileSystem &&
				fileSystem.map(file => {
					return (
						<TreeNode
							key={file.name}
							node={file}
							level={0}
							filePath={file.name}
							getDirectory={getDirectory}
						/>
					)
				})}
			
		</div>
	)
}

export default FileExplorer
