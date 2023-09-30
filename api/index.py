import os
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename  

ALLOWED_EXTENSIONS = {'csv', 'xls', 'xlsx'}

app = Flask(__name__)
CORS(app)

Upload_Folder = 'api//uploads'
app.config['Upload_Folder'] = Upload_Folder

#checking if extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#if api running or not
@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

@app.route("/api/upload_and_process_file", methods=["GET","POST"])
def upload_and_process_file():

    if not os.path.exists(app.config['Upload_Folder']):
        os.makedirs(app.config['Upload_Folder'])

    if 'file' not in request.files:#no file
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':#empty filename 
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):#extension checking
        return jsonify({"error": "Invalid file format"}), 400

    # in order to track harmful content
    filename = secure_filename("data.csv")
    file_path = os.path.join(app.config['Upload_Folder'], filename)

    if os.path.exists(file_path):
        os.remove(file_path)

    try:
        file.save(file_path)
        df = pd.read_csv(file_path)#reading file

#checking info

        num_rows, num_columns = df.shape

        return jsonify({"message": "File uploaded and processed successfully",
                        "filename": filename, "rows": num_rows, "columns": num_columns}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000)
