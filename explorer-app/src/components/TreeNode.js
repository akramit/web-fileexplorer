import React, { useState } from "react"
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa"
import { TiTickOutline } from "react-icons/ti"
import {
	AiOutlineEdit,
	AiOutlineFile,
	AiOutlineFolder,
	AiOutlineDelete,
} from "react-icons/ai"

import "./treeNode.css"

const TreeNode = ({ node, level, filePath, getDirectory }) => {
	const [isCollapsed, setCollapsed] = useState(true)
	const [isRenaming, setRenaming] = useState(false)
	const [newName, setNewName] = useState(node.name)
	const [hover, setHover] = useState(false)

	const onHover = () => {
		setHover(true)
	}

	const onLeave = () => {
		setHover(false)
	}

	const handleToggle = () => {
		if (node.type === "folder") {
			setCollapsed(!isCollapsed)
		}
	}

	const handleRename = () => {
		setRenaming(true)
	}

	const handleRenameSubmit = async e => {
		e.preventDefault()
		const updatedPath = filePath.split("/").slice(0, -1).join("/")
		await fetch("http://127.0.0.1:5432/rename", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				old_name: node.name,
				new_name: newName,
				path: updatedPath,
				type: node.type,
			}),
		})
		getDirectory()
		setRenaming(false)
	}

	const handleAddFile = async () => {
		const fileName = prompt("Enter the file name:")
		if (fileName && fileName.includes(".")) {
			const updatedPath = filePath.split("/").join("/")
			const response = await fetch("http://127.0.0.1:5432/newfile", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ file_name: fileName, path: updatedPath }),
			})
			console.log({ fileName, response })
			getDirectory()
		} else {
			alert("Filename doesn't have an extension")
		}
	}

	const handleAddFolder = async () => {
		const folderName = prompt("Enter the folder name:")
		if (folderName) {
			const updatedPath = filePath + "/"
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

	const handleDelete = async () => {
		let updatedPath
		if (node.type === "file")
			updatedPath = filePath.split("/").slice(0, -1).join("/")
		else updatedPath = filePath.split("/").join("/")

		await fetch("http://127.0.0.1:5432/delete", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				file_name: node.name,
				path: updatedPath,
				type: node.type,
			}),
		})
		getDirectory()
	}

	return (
		<div style={{ marginLeft: `${level * 20}px` }}>
			<div
				className='explorer-row-div'
				onMouseEnter={onHover}
				onMouseLeave={onLeave}
			>
				{node.type === "folder" ? (
					<span onClick={handleToggle} className='collapse-icon'>
						{isCollapsed ? <FaFolder /> : <FaFolderOpen />}
					</span>
				) : (
					<span>
						<FaFile />{" "}
					</span>
				)}
				{isRenaming ? (
					<form onSubmit={handleRenameSubmit}>
						<input
							type='text'
							value={newName}
							onChange={e => setNewName(e.target.value)}
							onBlur={handleRenameSubmit}
							autoFocus
						/>
						<button type='submit' className='icon-btn'>
							<TiTickOutline />
						</button>
					</form>
				) : (
					<span className='file-folder-name'>{node.name}</span>
				)}
				{hover &&
					(node.type === "file" ? (
						<>
							<button onClick={handleRename} className='icon-btn'>
								{!isRenaming && <AiOutlineEdit />}
							</button>
							<button onClick={handleDelete} className='icon-btn'>
								<AiOutlineDelete />
							</button>
						</>
					) : (
						<>
							<button onClick={handleRename} className='icon-btn'>
								{!isRenaming && <AiOutlineEdit />}
							</button>
							<button onClick={handleAddFile} className='icon-btn'>
								<AiOutlineFile />
							</button>
							<button onClick={handleAddFolder} className='icon-btn'>
								<AiOutlineFolder />
							</button>
							<button onClick={handleDelete} className='icon-btn'>
								<AiOutlineDelete />
							</button>
						</>
					))}
			</div>
			{!isCollapsed && node.children && (
				<div>
					{node.children.map(child => (
						<TreeNode
							key={child.name}
							node={child}
							level={level + 1}
							filePath={filePath.concat("/" + child.name)}
							getDirectory={getDirectory}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default TreeNode
