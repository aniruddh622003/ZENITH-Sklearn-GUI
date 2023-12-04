"use client";
import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  ReactFlowProvider,
  getOutgoers,
} from "reactflow";

import "reactflow/dist/style.css";
import NodePanel from "./panel";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "15px",
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: -500, y: 0 },
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Raw Data" },
  },
  {
    id: "2",
    type: "output",
    position: { x: 500, y: 0 },
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Processed Data" },
  },
];

let id = 3;
const getId = () => `${id++}`;

const initialEdges = [];

export default function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [previewPreprocess, setPreviewPreprocess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preprocessRes, setPreprocessRes] = useState(null);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const router = useRouter();

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      console.log(type);

      // check if the dropped element is valid
      // if (typeof type === "undefined" || !type) {
      //   return;
      // }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: "default",
        position,
        sourcePosition: "right",
        targetPosition: "left",
        data: { label: `${type?.name}`, params: type?.params },
      };
      console.log(newNode);

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const startPreProcess = async () => {
    setLoading(true);
    const outnodes = [];
    let n = nodes[0];
    outnodes.push({ name: n?.data?.label, params: n.params ?? "" });
    while (getOutgoers(n, nodes, edges).length > 0) {
      const out = getOutgoers(n, nodes, edges);

      outnodes.push({
        name: out[0]?.data?.label,
        params:
          out[0]?.data?.params?.map((ele) => {
            let out = {
              ...ele,
              value: ele.default,
            };
            delete out.default;
            return out;
          }) ?? "",
      });
      n = out[0];
    }
    const res = await fetch("/api/preprocess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes: outnodes }),
    });
    const statusCode = res.status;
    const data = await res.json();
    if (statusCode != 200) {
      setLoading(false);
      console.log(data);
      setError({
        error: true,
        message:
          data?.error.length > 100
            ? data?.error?.slice(0, 100) + "..."
            : data?.error ?? "Error occured!",
      });
      return;
    }
    setPreprocessRes(data);
    setPreviewPreprocess(true);
    setLoading(false);
    // router.push("/flow/model");
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100%", height: "100%" }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          fitView
        >
          <Controls />
          <MiniMap pannable={true} />
          <Background variant="dots" gap={12} size={1} />
          <Panel>
            <NodePanel />
            <Button
              onClick={startPreProcess}
              variant="contained"
              sx={{ width: "100%", mt: "10px" }}
            >
              {loading ? (
                <CircularProgress sx={{ color: "white.main" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Panel>
        </ReactFlow>
      </div>
      <Modal
        open={previewPreprocess}
        onClose={() => setPreviewPreprocess(false)}
        aria-labelledby="preview-preprocess"
        aria-describedby="preview-preprocess"
      >
        <Box sx={style}>
          <Typography variant="h4">Preprocessing Result</Typography>
          <Typography variant="h6">
            Your data was successfully preprocessed! Here is the result:
          </Typography>
          <br />
          <Typography variant="h5">Before preprocessing:</Typography>
          <img
            style={{ width: "100%" }}
            src={`data:image/png;base64, ${preprocessRes?.df_pre}`}
          />
          <br />
          <Typography variant="h5">After preprocessing:</Typography>
          <img
            style={{ width: "100%" }}
            src={`data:image/png;base64, ${preprocessRes?.df_post}`}
          />
          <Box sx={{ display: "flex", mt: "30px" }}>
            <Button
              onClick={() => setPreviewPreprocess(false)}
              variant="contained"
              color="error"
              sx={{ m: "10px" }}
            >
              Redo Preprocessing
            </Button>
            <Button
              onClick={() => router.push("/flow/model")}
              variant="contained"
              sx={{ m: "10px" }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error.error}
        autoHideDuration={5000}
        onClose={() => setError({ error: false, message: "" })}
      >
        <Alert
          onClose={() => setError({ error: false, message: "" })}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </ReactFlowProvider>
  );
}
