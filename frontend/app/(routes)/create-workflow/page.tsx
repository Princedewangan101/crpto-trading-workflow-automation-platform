'use client'
import { useState, useCallback, useContext } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';
import SelectTrigger from '@/components/app/SelectTrigger';
import { Context } from '@/components/context/ContextProvider';
import { PriceTriggerNode } from '@/components/app/PriceTriggerNode';

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export default function CreateWorkflow() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useWorkflowContext must be used within a ContextProvider");
  }

  const onNodesChange = useCallback(
    (changes: any) => context.setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => context.setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => context.setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const nodeTypes = { priceTrigger: PriceTriggerNode }

  return (
    <div style={{ width: '100vw', height: '100vh' }} className='dark'>
      {context.nodes.length === 0 ? <SelectTrigger /> :
        <ReactFlow
          colorMode="dark"
          nodes={initialNodes}
          edges={context.edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
      }
    </div>
  );
}