from sklearn.linear_model import LinearRegression, LogisticRegression, Ridge, Lasso
from sklearn.svm import SVC, SVR
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor, GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.neighbors import KNeighborsRegressor, KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB

from sklearn.model_selection import train_test_split

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, confusion_matrix, classification_report
import ast

from joblib import dump

model_dict = {
    "LinearRegression": LinearRegression(),
    "LogisticRegression": LogisticRegression(),
    "Ridge": Ridge(),
    "Lasso": Lasso(),
    "SVC": SVC(),
    "SVR": SVR(),
    "DecisionTreeClassifier": DecisionTreeClassifier(),
    "DecisionTreeRegressor": DecisionTreeRegressor(),
    "RandomForestClassifier": RandomForestClassifier(),
    "RandomForestRegressor": RandomForestRegressor(),
    "KNeighborsClassifier": KNeighborsClassifier(),
    "KNeighborsRegressor": KNeighborsRegressor(),
    "GaussianNB": GaussianNB(),
    "GradientBoostingClassifier": GradientBoostingClassifier(),
    "GradientBoostingRegressor": GradientBoostingRegressor()
}
def convert_dtype(value, dtype):
    if value == 'None':
        return None
    if dtype == 'int':
        return int(value)

    elif dtype == 'float':
        return float(value)

    elif dtype == 'bool':
        return True if value == 'True' else False
    
    elif dtype == 'tuple':
        return ast.literal_eval(value)

    else:
        return 'err'  # If no matching dtype is found, return the value as is, this is string

def set_model(model_pipeline):
    model = model_dict[model_pipeline[1]['name']]
    for param in model_pipeline[1]['params']:
        curr_param = convert_dtype(param['value'], param['dtype'])
        if curr_param != 'err':
            model.set_params(**{param['name']: curr_param})
    return model

def load_data(data_path, output_col, test_size, random_state):
    df = pd.read_csv(data_path)
    X_train, X_test, y_train, y_test = train_test_split(df.drop(output_col, axis=1), df[output_col], test_size=test_size, random_state=random_state)
    
    return X_train, X_test, y_train, y_test

def train_model(model_pipeline, X_train, y_train):
    model = set_model(model_pipeline)
    print(model, flush=True)
    model.fit(X_train, y_train)

    return model

def save_model(model, name = 'my_model'):
    dump(model, f'api\\outputs\\{name}.joblib')

def plot_graph(model, X_test, y_test, model_type):

    if model_type == 'classification':
    
        y_pred = model.predict(X_test)

        report = classification_report(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred)

        # creating a figure with two subplots
        fig, axes = plt.subplots(1, 2, figsize=(9, 4))

        # plotting confusion matrix
        sns.heatmap(cm, annot=True, cmap='Blues', fmt='d', cbar=False, ax=axes[0])
        axes[0].set_title('Confusion Matrix')
        axes[0].set_xlabel('Predicted')
        axes[0].set_ylabel('True')

        # plotting classification report
        axes[1].axis('off')
        axes[1].text(0, 0.7, report, va='top', family='monospace')
        axes[1].set_title('Classification Report')

        plt.tight_layout()

        # saving graph
        plt.savefig('./api/outputs/graph.png', bbox_inches='tight', dpi=300)

    elif model_type == 'regression':
        
        y_pred = model.predict(X_test)

        report = f"MAE: {mean_absolute_error(y_test, y_pred)}\nMSE: {mean_squared_error(y_test, y_pred)}\nR2:  {r2_score(y_test, y_pred)}"

        # plotting the report
        fig, ax = plt.subplots(figsize=(3.7, 0.8))
        ax.axis('off')
        ax.set_title('Scoring', fontsize=16)
        ax.text(0, 0, report, va='center', family='monospace', fontsize=14)

        plt.savefig('./api/outputs/graph.png', bbox_inches='tight', dpi=300)

def run_model_train(model_pipeline):
    with open('./api/uploads/output.txt', 'r') as file:
        output_col = file.read()
    model_pipeline = [{
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
    }] + [model_pipeline]

    classifiers = ('LogisticRegression', 'SVC', 'DecisionTreeClassifier', 'RandomForestClassifier', 'KNeighborsClassifier')
    regressors = ('LinearRegression', 'Ridge', 'Lasso', 'SVR', 'DecisionTreeRegressor', 'RandomForestRegressor', 'KNeighborsRegressor')
    model_type = 'classification' if model_pipeline[1]['name'] in classifiers else 'regression'

    data_path = './api/uploads/data_preprocessed.csv'
    output_col = model_pipeline[0]['params'][2]['value']
    test_size = model_pipeline[0]['params'][0]['value']
    random_state = model_pipeline[0]['params'][1]['value']

    X_train, X_test, y_train, y_test = load_data(data_path, output_col, test_size, random_state)
    model = train_model(model_pipeline, X_train, y_train)
    save_model(model)
    plot_graph(model, X_test, y_test, model_type)

    return 1
