'use client'
import { useCallback, useContext } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, SelectionMode } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Context } from '@/components/context/ContextProvider';
import { PriceTriggerNode } from '@/components/nodes/PriceTriggerNode';
import ExchangeActionNode from '@/components/nodes/ExchangeNode';
import SelectNode from '@/components/app/SelectNode';
import TimeTriggerNode from '@/components/nodes/TimeTriggerNode';
import NotificationActionNode from '@/components/nodes/NotificationNode';
import AgentNode from '@/components/nodes/AgentNode';
import { NODE_KIND } from '@/lib/arrayData';
import SelectModel from '@/components/app/SelectModel';
import Gemini from '@/components/nodes/model/gemini-2.5-flash';
import SelectTool from '@/components/app/SelectTool';
import technicalAnalysisFetcherNode from '@/components/nodes/tool/technicalAnalysis';
import AgentPrompt from '@/components/app/AgentPrompt';


// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export default function Workflow() {


  const context = useContext(Context);
  if (!context) { throw new Error("useWorkflowContext must be used within a ContextProvider"); }

  const onConnectEnd = (event: any, connectionState: any) => {
    console.log("connectionState :", connectionState);

    // SELECTION AND CREATION ON NODE IS ON (components > app > SelectNode.tsx)
    context.setconnectionState(connectionState)

    switch (connectionState.fromNode.data.kind) {
      case NODE_KIND.TRIGGER:
      case NODE_KIND.ACTION:
        context.setSelectNodeDropdown("NODE")
        break;

      case NODE_KIND.AGENT:
        console.log(1);
        if (connectionState.fromPosition === "right") {
          context.setSelectNodeDropdown("NODE")
        } else if (connectionState.fromHandle.id === "output-1") {
          context.setSelectNodeDropdown("MODEL")
        } else if (connectionState.fromHandle.id === "output-2" || "output-3") {
                  console.log(2);
          context.setSelectNodeDropdown("TOOL")
        }
        break;

      case NODE_KIND.TOOL:
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
    agent: AgentNode,
    gemini2p0flash: Gemini,
    gemini2p5flash: Gemini,
    gemini3p0flash: Gemini,
    gemini3p5flash: Gemini,
    technical_indicator_fetcher:technicalAnalysisFetcherNode,
    // sentimental_analysis:,
    // order_book_depth_finder:,
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
      <SelectModel />
      <SelectTool />
      <AgentPrompt/>
    </div>
  );
}