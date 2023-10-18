import { Box } from "@mui/material";
import React from "react";
import Drag from "./drag";

const Preprocess = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white.main",
        border: "1px solid #ccc",
        boxShadow: 3,
        height: "100%",
        m: 4,
        mt: 0,
      }}
    >
      <Drag />
    </Box>
  );
};

export default Preprocess;
