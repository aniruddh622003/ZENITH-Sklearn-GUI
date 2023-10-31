from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from helper import allowed_file, upload_and_process_file
import os
import pandas as pd
from preprocessing import apply_pipeline
from helper import preprocess_data

app = Flask(__name__)
CORS(app)

app.config['Upload_Folder'] = 'api//uploads'

dataset_present = False
existing_num_rows = 0
existing_num_columns = 0

@app.route("/api/available-preprocess", methods=["GET"])
def get_available_preprocess():
    f = open("api/available-preprocess.json")
    return json.load(f)

@app.route("/api/preprocess", methods=["POST"])
def preprocess_data():
    try:
        preprocessing_pipeline = request.get_json()
        raw_data = pd.read_csv('api/uploads/data.csv')
        preprocessed_data = apply_preprocessing(raw_data, preprocessing_pipeline)
        return preprocessed_data.to_json(orient='records')
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/available-models", methods=["GET"])
def get_available_models():
    g = open("api/available-model.json")
    return json.load(g)

@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return {"status": "success", "message": "Integrate Flask Framework with Next.js"}

@app.route("/api/existing-dataset", methods=["GET"])
def dataset_existing():
    file_path = os.path.join(app.config['Upload_Folder'], "data.csv")

    if os.path.exists(file_path):
        df = pd.read_csv(file_path)
        num_rows, num_columns = df.shape
        return jsonify({
            "message": "Dataset is present",
            "filename": "data.csv",
            "rows": num_rows,
            "columns": num_columns
        }), 200

    return jsonify({"message": "No dataset is present"}), 404
 

@app.route("/api/upload_and_process_file", methods=["GET", "POST"])
def upload_and_process_file_route():
    return upload_and_process_file(app)()

if __name__ == "__main__":
    app.run(port=8000)
