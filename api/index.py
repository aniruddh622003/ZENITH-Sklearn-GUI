from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import json
from api.model import run_model_train
from helper import allowed_file, upload_and_process_file
import os
import pandas as pd
from preprocessing import apply_pipeline
from helper import preprocess_data
import base64
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

app.config['Upload_Folder'] = 'api//uploads'
app.config['Output_Folder'] = 'api//outputs'
existing_num_rows = 0
existing_num_columns = 0

@app.route("/api/available-preprocess", methods=["GET"])
def get_available_preprocess():
    f = open("api/available-preprocess.json")
    return json.load(f)

@app.route("/api/preprocess", methods=["POST"])
def preprocess_data_route():
    try:
        preprocessing_pipeline = request.get_json()
        if preprocessing_pipeline['nodes'][-1]['name'] == 'Processed Data':
            apply_pipeline(preprocessing_pipeline['nodes'][1:-1])
        else:
            apply_pipeline(preprocessing_pipeline['nodes'][1:]) # this should be error as processed data node is not connected to anything
        with open('api/outputs/df_post.png', 'rb') as f:
            x = base64.b64encode(f.read())
        with open('api/outputs/df_pre.png', 'rb') as f:
            y = base64.b64encode(f.read())
        return jsonify({"message": "Sucessfully Pre-processed Data", "df_post": x.decode('utf-8'), "df_pre": y.decode('utf-8')})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/start-train", methods=["POST"])
def start_train_route():
    try:
        x = request.get_json()
        run_model_train(x)
        with open('api/outputs/graph.png', 'rb') as f:
            x = base64.b64encode(f.read())
        return jsonify({"message": "Sucessfully Trained Model", "graph": x.decode('utf-8')})
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
 

@app.route("/api/upload_and_process_file", methods=["POST"])
def upload_and_process_file_route():
    return upload_and_process_file(app)()

@app.route("/api/predict", methods=["POST"])
def predict():
    return jsonify({"message": "Sucessfully Predicted"})

if __name__ == "__main__":
    app.run(port=8000)
