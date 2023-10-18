"use client";
import { preprocessNodes } from "@/utils/preprocess-nodes";
import {
  Box,
  Card,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AiFillCloseCircle, AiFillDownCircle } from "react-icons/ai";
import styles from "./index.module.css";

const NodePanel = () => {
  const [col, setCol] = useState(true);

  return (
    <Card sx={{ p: 2, width: "25vw" }}>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mr: 1,
        }}
      >
        <Grid item xs={10}>
          <Typography variant="h6" sx={{ fontWeight: "800" }}>
            Node Panel
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton onClick={() => setCol(!col)}>
            {!col ? <AiFillDownCircle /> : <AiFillCloseCircle />}
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={col}>
        <Box sx={{ maxHeight: "45vh", overflowY: "auto" }}>
          {preprocessNodes.map((node) => (
            <PanelItem key={node.id} />
          ))}
        </Box>
      </Collapse>
    </Card>
  );
};

export default NodePanel;

const PanelItem = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Box
      sx={{ p: 1, m: 1, border: "1px solid black", borderRadius: "5px" }}
      onDragStart={(event) => onDragStart(event, "panel item")}
      draggable
    >
      <Typography variant="h6">Panel Item</Typography>
    </Box>
  );
};
