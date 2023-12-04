"use client";
import React, { useState, useEffect } from "react";
import ComboBox from "../../../components/AutoComplete";
import {
  Grid,
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Tooltip,
  CircularProgress,
  Collapse,
  Modal,
  Typography,
} from "@mui/material";
import TextBox from "@/components/TextBox";
import { HiInformationCircle } from "react-icons/hi";
import {
  Close,
  OnlinePredictionSharp,
  StayPrimaryLandscape,
} from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "15px",
};

const options = [
  "LinearRegression",
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

const ModelPage = () => {
  // const [value, setValue] = useState(options[0]);
  const [selectedModel, setSelectedModel] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [paramValue, setParamValue] = useState([]);
  const [selectedModelParameters, setSelectedModelParameters] = useState(null);
  const [graph, setGraph] = useState(null);
  const [loading, setLoading] = useState(false);
  const [codeHelper, setCodeHelper] = useState(false);

  useEffect(() => {
    async function fetchParam() {
      try {
        const resp = await fetch("/api/available-models");
        if (resp.status == 200) {
          const dataF = await resp.json();
          console.log(dataF["available-model"]);
          setData(dataF["available-model"]);
          setSelectedModel(dataF["available-model"][0].name);
        } else {
          //error
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchParam();
  }, []);

  // useEffect(() => console.log(data), [data]);

  useEffect(() => {
    let x = data?.filter((ele) => ele.name == selectedModel)?.[0];
    console.log(x, x?.params);
    setSelectedModelParameters(x?.params);
    setGraph(null);
  }, [data, selectedModel]);

  useEffect(() => {
    console.log("a", selectedModelParameters);
    if (selectedModelParameters) {
      setParamValue(selectedModelParameters);
    }
  }, [selectedModelParameters]);

  const startTrain = async () => {
    setLoading(true);
    setGraph(null);
    try {
      const resp = await fetch("/api/start-train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedModel,
          params: paramValue.map((ele) => {
            return {
              name: ele.name,
              value: ele.default,
              dtype: ele.dtype,
            };
          }),
        }),
      });
      if (resp.status == 200) {
        const dataF = await resp.json();
        console.log(dataF);
        setGraph(dataF["graph"]);
      } else {
        //error
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const downloadModelWeights = async () => {
    try {
      const resp = await fetch("/api/download-weights", {
        method: "GET",
      });
      // Make a downloadable as file
      if (resp.status != 200) {
        return;
      }
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my_model.joblib";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setCodeHelper(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={4}>
      <Modal open={codeHelper} onClose={() => setCodeHelper(false)}>
        <Box sx={style}>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography variant="h6">
                <b>You have downloaded the model weights!</b>
                <br />
                To use the model weights in your code, you can use the following
                code snippet as a reference:
              </Typography>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <IconButton onClick={() => setCodeHelper(false)}>
                <Close />
              </IconButton>
            </Box>
          </Box>
          <br />
          <CopyBlock
            language="python"
            text={`from joblib import load

model_path = "my_model.joblib" # path to your model weights
X = [[5.7,2.9,4.2,1.3],
        [6.2,2.9,4.3,1.3],
        [5.1,2.5,3.0,1.1]] # input data (you can also use pandas dataframe)

def load_model(model_path):
    model = load(model_path)
    return model

def predict(model_path, X):
    model = load_model(model_path)
    y_pred = model.predict(X)
    return y_pred`}
            showLineNumbers={true}
            theme={dracula}
            codeBlock={{ lineNumbers: false, wrapLines: true }}
          />
        </Box>
      </Modal>
      <Grid item xs={6}>
        <Box
          display="flex"
          flexDirection="column"
          pl="50px"
          // height="100vh"
          width="100%"
        >
          <ComboBox
            options={data ? data.map((ele) => ele.name) : options}
            value={selectedModel}
            setValue={setSelectedModel}
            inputValue={inputValue}
            setInputValue={setInputValue}
            sx={{ width: "100%" }}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            py="25px"
            pr="10px"
          >
            <Button variant="contained" onClick={startTrain}>
              Run Model
            </Button>
            <Box>
              <Button
                variant="contained"
                disabled={graph ? false : true}
                onClick={() => downloadModelWeights()}
              >
                Download Model Weights
              </Button>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: "white.main",
              flex: 0.6,
            }}
          >
            {loading && <CircularProgress />}
            {graph && (
              <img
                style={{ width: "100%" }}
                src={`data:image/png;base64, ${graph}`}
              />
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            pr: "20px",
          }}
        >
          {/* {data && console.log(data?.[value]?.Parameters)}
          {data &&
            Object.entries(data?.[value]?.Parameters)?.map((k) => { */}
          {paramValue &&
            paramValue?.map((k) => {
              // console.log(k);
              const paramName = k.name;
              const paramType = k.dtype;
              const paramComment = k.comment;
              const defaultV = k.default;
              if (paramName == "n_jobs") {
                return;
              }
              if (defaultV == "None") {
                return;
              }
              return (
                <React.Fragment key={paramName}>
                  <Box
                    mb="10px"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {paramType === "bool" ? (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                              ml: "20px",
                            }}
                          >
                            <InputLabel sx={{ fontSize: "small" }}>
                              {paramName}
                            </InputLabel>
                            {console.log("b", paramValue)}
                            <RadioGroup
                              value={defaultV}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setParamValue((prev) => {
                                  let x = prev.map((ele) => {
                                    if (ele.name == paramName) {
                                      ele.default = e.target.value;
                                    }
                                    return ele;
                                  });
                                  return x;
                                });
                              }}
                            >
                              <Box sx={{ display: "flex" }}>
                                <FormControlLabel
                                  control={<Radio />}
                                  label="True"
                                  value="True"
                                />
                                <FormControlLabel
                                  control={<Radio />}
                                  label="False"
                                  value="False"
                                />
                              </Box>
                            </RadioGroup>
                          </Box>
                          <Tooltip title={paramComment}>
                            <IconButton>
                              <HiInformationCircle />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : paramType === "int" ||
                        paramType === "float" ||
                        paramType === "str" ? (
                        <>
                          <TextField
                            sx={{ height: "100%", width: "100%" }}
                            label={paramName}
                            type={
                              ["int", "float"].includes(paramType)
                                ? "number"
                                : "text"
                            }
                            value={defaultV}
                            onChange={(e) => {
                              setParamValue((prev) => {
                                let x = prev.map((ele) => {
                                  if (ele.name == paramName) {
                                    ele.default = e.target.value;
                                  }
                                  return ele;
                                });
                                return x;
                              });
                            }}
                          />
                          <IconButton title={paramComment}>
                            <HiInformationCircle />
                          </IconButton>
                        </>
                      ) : null}
                    </Box>
                  </Box>
                </React.Fragment>
              );
            })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ModelPage;
