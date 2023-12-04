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
import { Button } from "@mui/material";

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
    console.log(outnodes);
    await fetch("/api/preprocess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes: outnodes }),
    });
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
              Submit
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
