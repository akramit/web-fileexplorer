# README
A web based file explorer app that  lets you create a new directory, new file, rename a directory, rename a file, delete a directory, delete a file and view the entire directory tree structure.

## Run the App
1. Clone the directory
3. Run ```npm install``` inside the directory to create node_modules
4. Go to directory ```server``` and run ```python3 server.py``` to start the server
5. Go to directory ```explorer-app```
6. Run ```npm install``` to create node_modules.
7. Run ```npm start``` to start the app
8. Verify the creation and deletion of files under directory ```server/myfiles/root```

## Demo
<img src="demo/file-explorer.png" width="300" height="300" alt="File Explorer" > <img src="demo/rename.png" width="300" height="300" alt="Rename a file">

<img src="demo/hover-folder.png" width="300" height="300"  alt="Highlight folder on hover"> <img src="demo/hover-file.png" width="300" height="300"  alt ="Highlight file on hover">

## View Directory
1. Do a GET request ```0.0.0.0:5432/directory```
2. Output :
   ```json
   [
    {
        "name": "ex.txt",
        "type": "file"
    },
    {
        "name": "test",
        "type": "folder"
        "children": [
            {
                "name": "test.txt",
                "type": "file"
            }
        ],
    }]
   ```

## Create a New File
1. Do a POST Request ```0.0.0.0:5432/newfile``` with below json body
```json
{
  "file_name":"test.txt",
  "path":""
}
```

## Create a New Directory
1. Do a POST request ```0.0.0.0:5432/newfile``` with below json body
```json
{
  "dir_name":"test",
  "path":""
}
```

