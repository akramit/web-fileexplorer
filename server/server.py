from flask import Flask, request, jsonify
import services


app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/directory",methods=['GET'])
def get_directory():
      pass
    
if __name__ == '__main__':
	app.run(host='0.0.0.0',port=5432)