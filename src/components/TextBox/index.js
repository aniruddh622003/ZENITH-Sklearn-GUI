"use client";
import React from "react";
import { TextField, Box } from "@mui/material";

const TextBox = (props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <TextField label="parameter" variant="outlined" fullWidth {...props} />
    </Box>
  );
};

export default TextBox;
