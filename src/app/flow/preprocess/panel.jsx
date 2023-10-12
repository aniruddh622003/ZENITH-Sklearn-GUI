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

const NodePanel = () => {
  const [col, setCol] = useState(false);

  return (
    <Card sx={{ p: 2 }}>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mr: 1,
        }}
      >
        <Grid item xs={10}>
          <Typography variant="h6">Node Panel</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => setCol(!col)}>
            {!col ? <AiFillDownCircle /> : <AiFillCloseCircle />}
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={col}>
        {preprocessNodes.map((node) => (
          <PanelItem key={node.id} />
        ))}
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
      sx={{ p: 1 }}
      onDragStart={(event) => onDragStart(event, "default")}
      draggable
    >
      <Typography variant="h6">Panel Item</Typography>
    </Box>
  );
};
