"use client";
import { Node, Edge } from '@xyflow/react';
import React, { createContext } from 'react';

interface WorkflowContextType {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export const Context = createContext<WorkflowContextType | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [edges, setEdges] = React.useState<Edge[]>([]);

    return <Context.Provider value={{ nodes, setNodes, edges, setEdges }}>
        {children}
    </Context.Provider>
}
