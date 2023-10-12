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
} from "reactflow";

import "reactflow/dist/style.css";
import NodePanel from "./panel";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "2" },
    sourcePosition: "right",
    targetPosition: "left",
  },
];

let id = 3;
const getId = () => `${id++}`;

const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

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
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition: "right",
        targetPosition: "left",
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

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
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
