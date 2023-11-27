preprocess_pipeline = [
    {
        "name": "LabelEncoder",
        "params": []
    }
]

from preprocessing import apply_pipeline
apply_pipeline(preprocess_pipeline)