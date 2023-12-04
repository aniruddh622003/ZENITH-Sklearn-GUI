import matplotlib
matplotlib.use('Agg')

from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, Normalizer, OneHotEncoder, OrdinalEncoder, LabelEncoder, PolynomialFeatures
from sklearn.impute import SimpleImputer
import pandas as pd
import numpy as np
import ast
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import os

# this dictionary contains the preprocessing objects
preprocess_dict = {
    'StandardScaler': StandardScaler(),
    'MinMaxScaler': MinMaxScaler(),
    'RobustScaler': RobustScaler(),
    'Normalizer': Normalizer(),
    'OneHotEncoder': OneHotEncoder(),
    'OrdinalEncoder': OrdinalEncoder(),
    'LabelEncoder': LabelEncoder(),
    'PolynomialFeatures': PolynomialFeatures(),
    'Imputer': SimpleImputer()
}

# this dictionary contains the dtypes that are allowed for each preprocessing object
preprocess_dtype_req = {
    'LabelEncoder' : [np.dtype('object')],
    'OneHotEncoder': [np.dtype('object')],
    'OrdinalEncoder': [np.dtype('object')],
    'PolynomialFeatures': [np.dtype('int'), np.dtype('float')],
    'SimpleImputer': [np.dtype('int'), np.dtype('float')],
    'StandardScaler': [np.dtype('int'), np.dtype('float')],
    'MinMaxScaler': [np.dtype('int'), np.dtype('float')],
    'RobustScaler': [np.dtype('int'), np.dtype('float')],
    'Normalizer': [np.dtype('int'), np.dtype('float')]
}

# this function converts the value to the specified dtype
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

# this function returns the columns that are allowed for the preprocessing object
def get_allowed_columns(df, preprocess):
    return df.columns[df.dtypes.isin(preprocess_dtype_req[preprocess])]

# this function sets the parameters of the preprocessing object with parameters specified by the user
def set_preprocess(preprocessing):
    preprocess = preprocess_dict[preprocessing['name']]
    for param in preprocessing['params']:
        # Set the parameter value using set_params
        curr_param = convert_dtype(param['value'], param['dtype'])
        if curr_param != 'err':
            preprocess.set_params(**{param['name']: curr_param})
    return preprocess

# this function applies the preprocessing to the dataframe
def apply_preprocessing(df, selected_preprocessing):
    for preprocessing in selected_preprocessing:
        # set the preprocessing object
        preprocess = set_preprocess(preprocessing)
        allowed_columns = get_allowed_columns(df, preprocessing['name'])
        # apply the preprocessing to the dataframe
        if preprocessing['name'][-7:] == 'Encoder':
            for col in allowed_columns:
                df[col] = pd.DataFrame(preprocess.fit_transform(df[col]))
        else:
            df[allowed_columns] = pd.DataFrame(preprocess.fit_transform(df[allowed_columns]))
    return df

def save_sf_snapshot(df, loc='api/outputs/', label='default'):
    df_head = df.head(8)
    df_describe = df.describe().round(4).reset_index()  # round to 4 decimal places

    fig = plt.figure(figsize=(13, 2))

    gs = gridspec.GridSpec(1, 2, width_ratios=[5, 6])  # specify width ratios

    ax0 = plt.subplot(gs[0])
    ax1 = plt.subplot(gs[1])

    # Hide axes
    ax0.axis('off')
    ax1.axis('off')

    # Plot df_head
    tabla1 = ax0.table(cellText=df_head.values, colLabels=df_head.columns, cellLoc = 'center', loc='center')
    tabla1.auto_set_font_size(False)
    tabla1.set_fontsize(10)
    tabla1.scale(1.2, 1.2)

    # Change color of first row
    for i in range(len(df_head.columns)):
        tabla1.get_celld()[(0, i)].set_facecolor('#98FB98')  # light green

    # Plot df_describe
    tabla2 = ax1.table(cellText=df_describe.values, colLabels=df_describe.columns, cellLoc = 'center', loc='center')
    tabla2.auto_set_font_size(False)
    tabla2.set_fontsize(10)
    tabla2.scale(1.2, 1.2)

    # Change color of first row
    for i in range(len(df_describe.columns)):
        tabla2.get_celld()[(0, i)].set_facecolor('#98FB98')  # light green

    plt.subplots_adjust(wspace=0.25)  # add spacing between subplots

    plt.savefig(f'{loc}df_{label}.png')

def apply_pipeline(preprocess_pipeline):
    df = pd.read_csv('api/uploads/data.csv')
    if not os.path.exists('api/outputs'):
        os.mkdir('api/outputs')
    save_sf_snapshot(df, 'api/outputs/', 'pre')
    df = apply_preprocessing(df, preprocess_pipeline)
    save_sf_snapshot(df, 'api/outputs/', 'post')
    df.to_csv('api/uploads/data_preprocessed.csv', index=False)