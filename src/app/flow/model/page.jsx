"use client";
import React, { useState, useEffect } from "react";
import ComboBox from "../../../components/AutoComplete";
import { Grid, Box, Button, TextField } from "@mui/material";
import TextBox from "@/components/TextBox";
import { OnlinePredictionSharp } from "@mui/icons-material";

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

const ModelPage = () => {
  const [value, setValue] = useState(options[0]);

  const [selectedModel, setSelectedModel] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchParam() {
      try {
        const resp = await fetch("/api/available-models");
        if (resp.status == 200) {
          const dataF = await resp.json();
          // console.log(dataF["available-model"]);
          setData(dataF["available-model"]);
        } else {
          //error
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchParam();
  }, []);

  useEffect(() => console.log(data), [data]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Box
          display="flex"
          flexDirection="column"
          pl="50px"
          height="100vh"
          width="100%"
        >
          <ComboBox
            options={data ? Object.keys(data) : options}
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
          // display="flex"
          // flexDirection="column"
          // justifyContent="start"
          // height="100%"
          // width="100%"
          // pr="50px"
          sx={{
            pr: "20px",
          }}
        >
          {data && console.log(data?.[value]?.Parameters)}
          {data &&
            Object.entries(data?.[value]?.Parameters)?.map((k) => {
              console.log(k);
              return (
                <>
                  <TextField
                    sx={{ height: "100%", width: "100%" }}
                    label={k[0]}
                  />
                  <Box mb="10px"></Box>
                </>
              );
            })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ModelPage;
