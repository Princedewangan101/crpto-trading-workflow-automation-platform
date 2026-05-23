import React, { useContext } from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { NODE_KIND, SELECT_MODEL } from '@/lib/arrayData'
import { Context } from '../context/ContextProvider'
import { useReactFlow } from '@xyflow/react'

const SelectModel = () => {
    const { screenToFlowPosition } = useReactFlow();

    const context = useContext(Context)
    if (!context) { throw new Error("context not found !"); }

    //-------------
    // UPDATE NODE FN
    //-------------
    function updateNode(id: string, type: string, kind: string, nodeMetaDataField: "asset" | "price" | "time" | "api-key" | "email", nodeMetaDataFieldValue: string | number) {
        if (!context) { throw new Error("context not found"); }

        context.setNodes((prevNode) =>
            prevNode.map((node) => {
                if (node.id === id && node.type === type && node.kind === kind) {
                    return {
                        ...node, data: { ...node.data, [nodeMetaDataField]: nodeMetaDataFieldValue }
                    }
                }
                return node
            })
        )
    }

    //-------------
    // AFTER SELECTING ACTION NODE THIS FN RUNS
    //-------------
    function selectModel(selectedValue: string) {
        console.log(1);
        
        if (!context) {
            throw new Error("context not found !");
        }
        const connectionState = context.connectionState
        // console.log("context :", context);
        // console.log("connectionState :", connectionState);

        const flowPosition = screenToFlowPosition({
            x: connectionState.to.x,
            y: connectionState.to.y,
        });

        const nodeId = crypto.randomUUID()
        const edgeId = crypto.randomUUID()
        const type = selectedValue

        // console.log("type :", type);

        // MODEL NODE CREATION
        const newNode = {
            id: nodeId,
            type,
            position: flowPosition,
            data: {
                id: nodeId,
                type,
                kind: NODE_KIND.MODEL,
                onChange: (
                    id: string, type: string, kind: string, nodeMetaDateField: any, nodeMetaDateFieldValue: string | number
                ) => { updateNode(id, type, kind, nodeMetaDateField, nodeMetaDateFieldValue) }
            }
        }
        console.log("new node nodeID : ", nodeId);
        
        const newEdge = { id: edgeId, source: connectionState.fromNode.id, target: nodeId,  sourceHandle: connectionState.fromHandle.id,}
        console.log("newEdge:",newEdge);
        context.setNodes((prevNodes: any) => [...prevNodes, newNode])
        context.setEdges((prevEdges: any) => [...prevEdges, newEdge])
        context.setselectedNode("")
    }

    //-------------
    // HANDLER FOR CHANGE IN SELECT<>
    //-------------
    const handleNodeChange = (selectedValue: string) => {
        // console.log("handleNodeChange fn - selectedValue :", selectedValue);

        if (!context) { throw new Error("context not found !"); }
        context.setselectedNode(selectedValue)
        context.setSelectNodeDropdown(null)
        selectModel(selectedValue)
    }

    return (
        <div className={`${context.SelectNodeDropdown === "AGENT" ? "block" : "hidden"} absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-blur-[1.3px]`}>
            <div className='bg-zinc-900 rounded-lg'>
                <Select value={context.selectedNode} onValueChange={handleNodeChange}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select a Model Node" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>models</SelectLabel>
                            {SELECT_MODEL.map(({ value, text }, idx) => (
                                <div key={idx}>
                                    <SelectItem value={value}>{text}</SelectItem>
                                </div>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default SelectModel