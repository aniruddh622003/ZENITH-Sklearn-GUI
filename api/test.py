# this is for manual testing only
# actual data will come from frontend by user input
preprocess_pipeline = [
    {
        "name": "LabelEncoder",
        "params": []
    },
    {
        "name": "MinMaxScaler",
        "params": [
            {'name': 'feature_range', 'dtype': 'tuple', "value": "(0, 1)"}
        ]
    }
]

from preprocessing import apply_pipeline
apply_pipeline(preprocess_pipeline)