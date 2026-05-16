'use client'
import React from 'react';
import { useCallback, useContext } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, EdgeChange, Background, Controls, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Context } from '@/components/context/ContextProvider';
import { PriceTriggerNode } from '@/components/nodes/PriceTriggerNode';
import ExchangeActionNode from '@/components/nodes/ActionNode';


// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export default function Workflow() {
  const context = useContext(Context);
  const { screenToFlowPosition } = useReactFlow();

  function updateNode(id: string, type: string, nodeMetaDataField: string, nodeMetaDataFieldValue: string | number) {
    if (!context) { throw new Error("context not found"); }

    context.setNodes((prevNode) => {
      const filterForType = prevNode.filter(n => n.type === type)
      return filterForType.map((n) => {
        if (n.id !== id) return n;
        return {
          ...n, data: { ...n.data, [nodeMetaDataField]: nodeMetaDataFieldValue }
        }
      })
    })
  }

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
  const onConnectEnd = (event: any, connectionState: any) => {
    // console.log("connectionState :", connectionState);
    const flowPosition = screenToFlowPosition({
      x: connectionState.to.x,
      y: connectionState.to.y,
    });
    const nodeId = crypto.randomUUID()
    const edgeId = crypto.randomUUID()
    const type = "exchangeAction"
    const newNode = {
      id: nodeId,
      type,
      position: flowPosition,
      data: {
        id: nodeId,
        type,
        exchange: "Excness",
        asset: "BTC_USDC",
        side: "LONG",
        onChange: (
          id: string, type: string, nodeMetaDateField: string, nodeMetaDateFieldValue: string | number
        ) => { updateNode(id, type, nodeMetaDateField, nodeMetaDateFieldValue) }
      }
    }

    const newEdge = { id: edgeId, source: connectionState.fromNode.id, target: nodeId, }

    context.setNodes((prevNodes) => [...prevNodes, newNode])
    context.setEdges((prevEdges) => [...prevEdges, newEdge])
  }

  const nodeTypes = {
    priceTrigger: PriceTriggerNode,
    exchangeAction: ExchangeActionNode,
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }} className='dark'>
      <ReactFlow
        colorMode="dark"
        nodes={context.nodes}
        edges={context.edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}