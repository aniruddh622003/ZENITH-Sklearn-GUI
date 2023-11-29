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
} from "@mui/material";
import TextBox from "@/components/TextBox";
import { HiInformationCircle } from "react-icons/hi";
import {
  OnlinePredictionSharp,
  StayPrimaryLandscape,
} from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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
  }, [data, selectedModel]);

  useEffect(() => {
    console.log("a", selectedModelParameters);
    if (selectedModelParameters) {
      setParamValue(selectedModelParameters);
    }
  }, [selectedModelParameters]);

  const startTrain = async () => {
    try {
      const resp = await fetch("/api/start-train", {
        method: "POST",
        body: JSON.stringify({
          model: selectedModel,
          params: paramValue.map((ele) => {
            return {
              name: ele.name,
              value: ele.default,
            };
          }),
        }),
      });
      if (resp.status == 200) {
        const dataF = await resp.json();
        console.log(dataF);
      } else {
        //error
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={4}>
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
              Start Train
            </Button>
            <Button variant="contained">Test Model</Button>
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
            <div style={{ fontSize: "10vw" }}>Graph</div>
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
