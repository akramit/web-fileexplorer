from doctest import debug
from flask import Flask, request, jsonify
import os


app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/directory",methods=['GET'])
def get_directory():
      directory_list = os.listdir('.')
      return jsonify(directory_list)

@app.route('/newdir',methods=['POST'])
def create_directory():
    data=request.json
    directory_name = data.get('directory_name')
    if not directory_name :
        return jsonify({"error": "Directory name is required"}), 400
    try:
        os.mkdir(directory_name)
        return jsonify({"message": f"Directory '{directory_name}' created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/newfile',methods=['POST'])   
def create_file():
    data = request.json
    file_name = data.get('file_name')
    path = data.get('path')

    if not file_name:
        return jsonify({"error": "File name is required"}), 400

    try:
        with open(os.path.join(path,file_name), 'w') as f:
            pass
        return jsonify({"message": f"File '{file_name}' created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
    
if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0',port=5432)