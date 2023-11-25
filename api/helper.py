import os
import pandas as pd
from flask import jsonify, request
from werkzeug.utils import secure_filename
import json
from preprocessing import apply_pipeline
from flask import jsonify

ALLOWED_EXTENSIONS = {'csv', 'xls', 'xlsx'}

def preprocess_data():
    try:
        preprocess_pipeline = request.get_json()  
        preprocessed_data = apply_pipeline(preprocess_pipeline)
        return jsonify({"message": "Data preprocessed successfully", "filename": "data_preprocessed.csv"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_and_process_file(app):
    def inner_upload_and_process_file(): # Upload and process file route
        
        global existing_num_rows
        global existing_num_columns
        
        if not os.path.exists(app.config['Upload_Folder']):
            os.makedirs(app.config['Upload_Folder'])

        if not os.path.exists(app.config['Output_Folder']):
            os.makedirs(app.config['Output_Folder'])
        
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']

        if file.filename == '': #empty filename
            return jsonify({"error": "No selected file"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file format"}), 400

        filename = secure_filename("data.csv")
        file_path = os.path.join(app.config['Upload_Folder'], filename)

        if os.path.exists(file_path): 
            os.remove(file_path)

        try:
            file.save(file_path)
            df = pd.read_csv(file_path) #reading file
            outcol = request.form.get('outputColumn')
            f = open(os.path.join(app.config['Upload_Folder'], "output.txt"), "w")
            f.write(outcol)
            f.close()
            num_rows, num_columns = df.shape

            existing_num_rows = num_rows
            existing_num_columns = num_columns

            return jsonify({"message": "File uploaded and processed successfully",
                            "filename": filename, "rows": num_rows, "columns": num_columns, 'outcol' : outcol}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner_upload_and_process_file
