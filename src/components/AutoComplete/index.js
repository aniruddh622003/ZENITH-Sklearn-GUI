"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

const options = [
  "Linear Regression",
  "Logistic Regression",
  "Ridge Regression",
  "Lasso Regression",
  "SVM",
  "Decision Tree",
  "Random Forest",
  "KNN",
  "K Means",
  "Naive Bayes",
  "Gradient Boosting",
  "XGBoost",
  "DBSCAN",
  "Birch Algorithm",
  "Isolation Forest",
];
export default function ComboBox() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      disablePortal
      id="combo-box-demo"
      renderInput={(params) => <TextField {...params} label="Model" />}
    />
  );
}
