from sklearn.linear_model import LinearRegression, LogisticRegression, Ridge, Lasso
from sklearn.svm import SVC, SVR
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.neighbors import KNeighborsRegressor, KNeighborsClassifier

from sklearn.model_selection import train_test_split

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, confusion_matrix, classification_report

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
    "KNeighborsRegressor": KNeighborsRegressor()
}

def load_data(data_path, output_col, test_size, random_state):
    df = pd.read_csv(data_path)
    X_train, X_test, y_train, y_test = train_test_split(df.drop(output_col, axis=1), df[output_col], test_size=test_size, random_state=random_state)
    
    return X_train, X_test, y_train, y_test

def train_model(model_pipeline, X_train, y_train):
    model = model_dict[model_pipeline[1]['name']]
    model.fit(X_train, y_train)

    return model

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

def run(model_pipeline):
    classifiers = ('LogisticRegression', 'SVC', 'DecisionTreeClassifier', 'RandomForestClassifier', 'KNeighborsClassifier')
    regressors = ('LinearRegression', 'Ridge', 'Lasso', 'SVR', 'DecisionTreeRegressor', 'RandomForestRegressor', 'KNeighborsRegressor')
    model_type = 'classification' if model_pipeline[1]['name'] in classifiers else 'regression'

    data_path = './api/uploads/data_preprocessed.csv'
    output_col = model_pipeline[0]['params'][2]['value']
    test_size = model_pipeline[0]['params'][0]['value']
    random_state = model_pipeline[0]['params'][1]['value']

    X_train, X_test, y_train, y_test = load_data(data_path, output_col, test_size, random_state)
    model = train_model(model_pipeline, X_train, y_train)
    plot_graph(model, X_test, y_test, model_type)

    return 1
