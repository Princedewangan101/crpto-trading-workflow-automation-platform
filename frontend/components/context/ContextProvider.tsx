"use client";
import { Node, Edge } from '@xyflow/react';
import React, { createContext } from 'react';

interface WorkflowContextType {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    PriceTriggerNodeAssetValue: string;
    setPriceTriggerNodeAssetValue: React.Dispatch<React.SetStateAction<string>>;
    selectedNode: string;
    setselectedNode: React.Dispatch<React.SetStateAction<string>>;
    UserPromptForAgent: string;
    setUserPromptForAgent: React.Dispatch<React.SetStateAction<string>>;
    SelectNodeDropdown: "NODE" | "MODEL" | "TOOL"  | null;
    setSelectNodeDropdown: React.Dispatch<React.SetStateAction<"NODE" | "MODEL" | "TOOL" | null>>;
    promptArea: "open" | "close";
    setpromptArea: React.Dispatch<React.SetStateAction<"open" | "close">>;
    connectionState: {};
    setconnectionState: React.Dispatch<React.SetStateAction<{}>>;
}

export type SelectNodeDropdown = "open" | "close"

export const Context = createContext<WorkflowContextType | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [edges, setEdges] = React.useState<Edge[]>([]);
    const [PriceTriggerNodeAssetValue, setPriceTriggerNodeAssetValue] = React.useState<string>("");

    // this state carry the selected node of the user from select dropdown ,  <SelectItem> value's string  
    const [selectedNode, setselectedNode] = React.useState<string>("");
    const [SelectNodeDropdown, setSelectNodeDropdown] = React.useState<SelectNodeDropdown>(null);

    const [connectionState, setconnectionState] = React.useState({});

    const [UserPromptForAgent, setUserPromptForAgent] = React.useState<string>("");
    const [promptArea, setpromptArea] = React.useState<"open" | "close">("close");
    


    return <Context.Provider value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        PriceTriggerNodeAssetValue, setPriceTriggerNodeAssetValue,
        selectedNode, setselectedNode,
        SelectNodeDropdown, setSelectNodeDropdown,
        connectionState, setconnectionState,
        UserPromptForAgent, setUserPromptForAgent,
        promptArea, setpromptArea,
    }}>
        {children}
    </Context.Provider>
}
