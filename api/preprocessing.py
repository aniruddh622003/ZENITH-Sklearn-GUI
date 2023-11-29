from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, Normalizer, OneHotEncoder, OrdinalEncoder, LabelEncoder, PolynomialFeatures
from sklearn.impute import SimpleImputer
import pandas as pd
import numpy as np
import ast

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
        return value  # If no matching dtype is found, return the value as is, this is string

# this function returns the columns that are allowed for the preprocessing object
def get_allowed_columns(df, preprocess):
    return df.columns[df.dtypes.isin(preprocess_dtype_req[preprocess])]

# this function sets the parameters of the preprocessing object with parameters specified by the user
def set_preprocess(preprocessing):
    preprocess = preprocess_dict[preprocessing['name']]
    for param in preprocessing['params']:
        # Set the parameter value using set_params
        preprocess.set_params(**{param['name']: convert_dtype(param['value'], param['dtype'])})
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

def apply_pipeline(preprocess_pipeline):
    df = pd.read_csv('api/uploads/data.csv')
    df = apply_preprocessing(df, preprocess_pipeline)
    df.to_csv('api/uploads/data_preprocessed.csv', index=False)
