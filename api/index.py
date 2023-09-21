#how to handle null value in data in the data client is sending for data processing
import os
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'csv', 'xls', 'xlsx'}

app = Flask(__name__)
CORS(app)

Upload_Folder = 'api\\uploads'
app.config['Upload_Folder'] = Upload_Folder

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

@app.route("/api/file_uploader", methods=["GET", "POST"])
def file_uploader():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = "data.csv"  

    file_path = os.path.join(app.config['Upload_Folder'], filename)
    
    file.save(file_path)

    try:
        df = pd.read_csv(file_path)
      
        #df.fillna(0, inplace=True)

        num_rows, num_columns = df.shape

        return jsonify({"message": "File uploaded and processed successfully", "filename": filename}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=8000)
