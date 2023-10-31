"use client";
import React, { useState, useEffect } from "react";
import ComboBox from "../../../components/AutoComplete";
import { Grid, Box, Button } from "@mui/material";
import TextBox from "@/components/TextBox";
// import {
//   RadioGroup,
//   FormControl,
//   FormLabel,
//   FormControlLabel,
// } from "@mui/material";

const Parameters = () => {
  const [data, setData] = useState(null);
  // const [value, setValue] = useState("true");

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  useEffect(() => {
    async function fetchParam() {
      try {
        const resp = await fetch("/api/available-models");
        console.log(resp.status);
        if (resp.status == 200) {
          let dataF = await resp.json();
          console.log(dataF);
          setData(dataF);
        } else {
          //error
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchParam();
  }, []);
  return data;
};

const ModelPage = () => {
  const fetchedData = Parameters();
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
          <ComboBox sx={{ width: "100%" }} />
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
          display="flex"
          flexDirection="column"
          height="100%"
          width="100%"
          pr="50px"
        >
          {fetchedData &&
            fetchedData["available-preprocess"].map((model) => (
              <div key={model.name}>
                {model.params.map((param) =>
                  param.type == "int" || param.type == "float" ? (
                    <div key={param.name}>
                      <TextBox sx={{ height: "100%", width: "100%" }} />
                      <Box mb="10px"></Box>
                    </div>
                  ) : param.type == "bool" ? (
                    <div key={param.name}>
                      {/* <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                          Value
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={value}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="True"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="False"
                          />
                        </RadioGroup>
                      </FormControl> */}
                    </div>
                  ) : null
                )}
              </div>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ModelPage;
