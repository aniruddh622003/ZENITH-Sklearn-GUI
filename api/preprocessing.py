# this file is under WIP and is highly experimental
# for manual testing only

from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, Normalizer, OneHotEncoder, OrdinalEncoder, LabelEncoder, PolynomialFeatures
from sklearn.impute import SimpleImputer
import pandas as pd
import numpy as np
import ast

# this is for manual testing only
# actual data will come from frontend by user input
selected_preprocessing = [
    {
        "name": "LabelEncoder",
        "params": [
            # {"name": "categories", "default": 'auto', 'dtype': 'string', "value": "auto"}
        ]
    },
    {
        "name": "MinMaxScaler",
        "params": [
            {"name": "feature_range", "default": "(0, 1)", 'dtype': 'tuple', "value": "(0, 1)"},
            # {"name": "copy", "default": "True"}
        ]
    }
    # {
    #     'name': 'StandardScaler',
    #     'params': [
    #         {"name": "copy", 'dtype': 'bool', "default": "True", "value": "True"},
    #         {"name": "with_mean", 'dtype': 'bool', "default": "True", "value": "True"},
    #         {"name": "with_std", 'dtype': 'bool', "default": "True", "value": "False"}
    #     ]
    # }

]


df = pd.read_csv('api/uploads/data.csv')
print(df.head())
# print(df['variety'].dtype, df['sepal.width'].dtype)
# print(df.head())
# df['variety'] = LabelEncoder().fit_transform(df['variety'])

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
    'Imputer': [np.dtype('int'), np.dtype('float')],
    'StandardScaler': [np.dtype('int'), np.dtype('float')],
    'MinMaxScaler': [np.dtype('int'), np.dtype('float')],
    'RobustScaler': [np.dtype('int'), np.dtype('float')],
    'Normalizer': [np.dtype('int'), np.dtype('float')]
}

# this function converts the value to the specified dtype
def convert_dtype(value, dtype):
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
        print(convert_dtype(param['default'] if param['value'] == '' else param['value'], param['dtype']))
        preprocess.set_params(**{param['name']: convert_dtype(param['default'] if param['value'] == '' else param['value'], param['dtype'])})
    return preprocess

# this function applies the preprocessing to the dataframe
def apply_preprocessing(df, selected_preprocessing):
    for preprocessing in selected_preprocessing:
        # set the preprocessing object
        preprocess = set_preprocess(preprocessing)
        allowed_columns = get_allowed_columns(df, preprocessing['name'])
        # apply the preprocessing to the dataframe
        df[allowed_columns] = pd.DataFrame(preprocess.fit_transform(df[allowed_columns]))
    return df
    

df = apply_preprocessing(df, selected_preprocessing)
print(df.describe())
df.to_csv('api/uploads/data_preprocessed.csv', index=False)
