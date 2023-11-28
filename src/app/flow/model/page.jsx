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
  const [paramValue, setParamValue] = useState("");
  const [selectedModelParameters, setSelectedModelParameters] = useState(null);

  useEffect(() => {
    async function fetchParam() {
      try {
        const resp = await fetch("/api/available-models");
        if (resp.status == 200) {
          const dataF = await resp.json();
          console.log(dataF["available-model"]);
          setData(dataF["available-model"]);
          setSelectedModel(data[0].name);
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
            <Button variant="contained">Start Train</Button>
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
          {selectedModelParameters &&
            selectedModelParameters?.map((k) => {
              console.log(k);
              const paramName = k.name;
              const paramType = k.dtype;
              const paramComment = k.comment;
              const defaultV = k.default;
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
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={
                                    paramValue[paramName] == true ||
                                    paramValue[paramName] == undefined
                                  }
                                  onChange={() =>
                                    setParamValue((prevValues) => ({
                                      ...prevValues,
                                      [paramName]: !prevValues[paramName],
                                    }))
                                  }
                                />
                              }
                              label="True"
                            />
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={paramValue[paramName] == false}
                                  onChange={() =>
                                    setParamValue((prevValues) => ({
                                      ...prevValues,
                                      [paramName]: !prevValues[paramName],
                                    }))
                                  }
                                />
                              }
                              label="False"
                            />
                          </Box>
                          <IconButton title={paramComment}>
                            <HiInformationCircle />
                          </IconButton>
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
                            defaultValue={defaultV}
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
