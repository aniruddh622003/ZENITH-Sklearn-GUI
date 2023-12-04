from joblib import load

def load_model(model_path):
    model = load(model_path)
    return model

def convert(X):
    for i in range(len(X)):
        for j in range(len(X[i])):
            X[i][j] = float(X[i][j])
    return X

def predict(model_path, X):
    model = load_model(model_path)
    y_pred = model.predict(X)
    return y_pred
