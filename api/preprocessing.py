# this file is under WIP and is highly experimental
# for manual testing only


from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, Normalizer, OneHotEncoder, OrdinalEncoder, LabelEncoder, PolynomialFeatures
from sklearn.impute import SimpleImputer
import pandas as pd


selected_preprocessing = [
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
print(LabelEncoder().fit_transform(df['variety']))

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

def convert_dtype(value, dtype):
    if dtype == 'int':
        return int(value)

    elif dtype == 'float':
        return float(value)

    elif dtype == 'bool':
        return True if value == 'True' else False

    else:
        return value  # If no matching dtype is found, return the value as is, this is string

def apply_preprocessing(df, selected_preprocessing):
    for preprocessing in selected_preprocessing:
        preprocess = preprocess_dict[preprocessing['name']]
        for param in preprocessing['params']:
            # Set the parameter value using set_params
            print(convert_dtype(param['default'] if param['value'] == '' else param['value'], param['dtype']))
            preprocess.set_params(**{param['name']: convert_dtype(param['default'] if param['value'] == '' else param['value'], param['dtype'])})
        df = pd.DataFrame(preprocess.fit_transform(df))
        print(df.head())
        break
    return df
    

df = apply_preprocessing(df, selected_preprocessing)
# df.to_csv('./uploads/data_preprocessed.csv', index=False)
