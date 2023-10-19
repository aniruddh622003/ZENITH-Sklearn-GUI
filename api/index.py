import os
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename  

ALLOWED_EXTENSIONS = {'csv', 'xls', 'xlsx'}

app = Flask(__name__)
CORS(app)

available_preprocess = [
    {
        "name": "StandardScaler",
        "params": [
            {"name": "copy", "default": "True"},
            {"name": "with_mean", "default": "True"},
            {"name": "with_std", "default": "True"}
        ]
    },
    {
        "name": "MinMaxScaler",
        "params": [
            {"name": "feature_range", "default": "(0, 1)"},
            {"name": "copy", "default": "True"}
        ]
    },
    {
        "name": "RobustScaler",
        "params": [
            {"name": "with_centering", "default": "True"},
            {"name": "with_scaling", "default": "True"},
            {"name": "copy", "default": "True"}
        ]
    },
    {
        "name": "Normalizer",
        "params": [
            {"name": "norm", "default": "l2"},
            {"name": "copy", "default": "True"}
        ]
    },
    {
        "name": "Imputer",
        "params": [
            {"name": "missing_values", "default": "'NaN'"},
            {"name": "strategy", "default": "'mean'"},
            {"name": "fill_value", "default": "None"}
        ]
    },
    {
        "name": "OneHotEncoder",
        "params": [
            {"name": "handle_unknown", "default": "'ignore'"},
            {"name": "categories", "default": "'auto'"},
            {"name": "sparse", "default": "True"}
        ]
    },
    {
        "name": "OrdinalEncoder",
        "params": [
            {"name": "categories", "default": "'auto'"}
        ]
    },
    {
        "name": "LabelEncoder",
        "params": [
            {"name": "categories", "default": "'auto'"}
        ]
    },
    {
        "name": "PolynomialFeatures",
        "params": [
            {"name": "degree", "default": "2"},
            {"name": "interaction_only", "default": "False"},
            {"name": "include_bias", "default": "True"}
        ]
    }
]


@app.route("/api/available-preprocess", methods=["GET"])
def get_available_preprocess():
    return jsonify(available_preprocess)


Upload_Folder = 'api//uploads'
app.config['Upload_Folder'] = Upload_Folder

# dataset presence and details
dataset_present = False
existing_num_rows = 0
existing_num_columns = 0

# if extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Health checker route
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
        }) , 200#200

    return jsonify({"message": "No dataset is present"}), 404


        
# Upload and process file route
@app.route("/api/upload_and_process_file", methods=["GET","POST"])
def upload_and_process_file():
    global dataset_present
    global existing_num_rows
    global existing_num_columns

    if not os.path.exists(app.config['Upload_Folder']):
        os.makedirs(app.config['Upload_Folder'])

    if 'file' not in request.files:#no file
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':#empty filename
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):#extension checking
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename("data.csv")
    file_path = os.path.join(app.config['Upload_Folder'], filename)

    if dataset_present:
        # Dataset is already present, return its details
        return jsonify({"message": "Dataset already present",
                        "filename": filename,
                        "rows": existing_num_rows,
                        "columns": existing_num_columns}), 200

    if os.path.exists(file_path):
        os.remove(file_path)

    try:
        file.save(file_path)
        df = pd.read_csv(file_path)#reading file

        num_rows, num_columns = df.shape

        # Update the dataset_present flag
        dataset_present = True

        # Store the details of the uploaded dataset
        existing_num_rows = num_rows
        existing_num_columns = num_columns

        return jsonify({"message": "File uploaded and processed successfully",
                        "filename": filename, "rows": num_rows, "columns": num_columns}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000)#8000
