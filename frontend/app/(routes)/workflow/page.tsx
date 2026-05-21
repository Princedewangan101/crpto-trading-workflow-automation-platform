'use client'
import { useCallback, useContext } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Context } from '@/components/context/ContextProvider';
import { PriceTriggerNode } from '@/components/nodes/PriceTriggerNode';
import ExchangeActionNode from '@/components/nodes/ExchangeNode';
import SelectNode from '@/components/app/SelectNode';
import TimeTriggerNode from '@/components/nodes/TimeTriggerNode';
import NotificationActionNode from '@/components/nodes/NotificationNode';


// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export default function Workflow() {


  const context = useContext(Context);
  if (!context) { throw new Error("useWorkflowContext must be used within a ContextProvider"); }

  const onConnectEnd = (event: any, connectionState: any) => {
    // console.log("connectionState :", connectionState);

    // SELECTION AND CREATION ON NODE IS ON (components > app > SelectNode.tsx)
    switch (connectionState.fromNode.data.type) {
      case "priceTrigger":
      case "timeTrigger":
        context.setSelectNodeDropdown("open")
        context.setconnectionState(connectionState)
        break;

      default:
        break;
    }
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

  const nodeTypes = {
    timeTrigger: TimeTriggerNode,
    priceTrigger: PriceTriggerNode,
    exchange: ExchangeActionNode,
    notification: NotificationActionNode,
    // agent:
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
        className='relative'
      >
        <Background />
        <Controls />
      </ReactFlow>
      <SelectNode />
    </div>
  );
}