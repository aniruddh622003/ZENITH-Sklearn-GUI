preprocess_pipeline = [
    {
        "name": "LabelEncoder",
        "params": []
    }
]

with open('./api/uploads/output.txt', 'r') as file:
    output_col = file.read()


model_pipeline_R = [
    {
        "name": "TrainTestSplit",
        "params": [
            {
                "name": "test_size",
                "value": 0.2
            },
            {
                "name": "random_state",
                "value": 42
            },
            {
                "name": "output",
                "value": output_col
            }
        ]
    },
    {
        "name": "RandomForestRegressor",
        "params": []
    }
]

model_pipeline_C = [
    {
        "name": "TrainTestSplit",
        "params": [
            {
                "name": "test_size",
                "value": 0.2
            },
            {
                "name": "random_state",
                "value": 42
            },
            {
                "name": "output",
                "value": output_col
            }
        ]
    },
    # get below part from front end
    {
        "name": "RandomForestClassifier",
        "params": []
    }
]



from preprocessing import apply_pipeline
from model import run
apply_pipeline(preprocess_pipeline)
run(model_pipeline_C)