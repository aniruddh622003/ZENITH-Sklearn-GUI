"use client";
// import { preprocessNodes } from "@/utils/preprocess-nodes";
import {
  Box,
  Card,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiFillDownCircle } from "react-icons/ai";
import styles from "./index.module.css";

const NodePanel = () => {
  const [col, setCol] = useState(false);
  const [preprocessNodes, setPreprocessNodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("/api/available-preprocess");
      const body = await resp.json();
      setPreprocessNodes(body["available-preprocess"]);
    };
    fetchData();
  }, []);

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
        {preprocessNodes.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {preprocessNodes.length > 0 && (
          <Box sx={{ maxHeight: "45vh", overflowY: "auto" }}>
            {preprocessNodes.map((node, idx) => (
              <PanelItem key={`pre-node-${idx}`} name={node.name} data={node} />
            ))}
          </Box>
        )}
      </Collapse>
    </Card>
  );
};

export default NodePanel;

const PanelItem = ({ name, data }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Box
      sx={{ p: 1, m: 1, border: "1px solid black", borderRadius: "5px" }}
      onDragStart={(event) => onDragStart(event, JSON.stringify(data))}
      draggable
    >
      <Typography variant="h6">{name}</Typography>
    </Box>
  );
};
