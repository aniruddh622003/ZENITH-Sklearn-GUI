import React from "react";
import ComboBox from "../../../components/AutoComplete";
import { Grid, Box, Button } from "@mui/material";
import TextBox from "@/components/TextBox";

const ModelPage = () => {
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
          <TextBox sx={{ height: "100%", width: "100%" }} />
          <Box mb="10px"></Box>
          <TextBox sx={{ height: "100%", width: "100%" }} />
          <Box mb="10px"></Box>
          <TextBox sx={{ height: "100%", width: "100%" }} />
          <Box mb="10px"></Box>
          <TextBox sx={{ height: "100%", width: "100%" }} />
          <Box mb="10px"></Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ModelPage;
