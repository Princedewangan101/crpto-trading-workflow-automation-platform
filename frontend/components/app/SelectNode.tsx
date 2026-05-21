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
import { NODE_KIND, SELECT_NODE } from '@/lib/arrayData'
import { Context } from '../context/ContextProvider'
import { useReactFlow } from '@xyflow/react'

const SelectNode = () => {
    const { screenToFlowPosition } = useReactFlow();

    const context = useContext(Context)
    if (!context) {
        throw new Error("context not found !");
    }

    //-------------
    // UPDATE NODE FN
    //-------------
    function updateNode(id: string, type: string, kind:string, nodeMetaDataField: string, nodeMetaDataFieldValue: string | number) {
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
    function selectActionNode(selectedValue: string) {
        if (!context) {
            throw new Error("context not found !");
        }
        const connectionState = context.connectionState
        console.log("context :", context);
        console.log("connectionState :", connectionState);

        const flowPosition = screenToFlowPosition({
            x: connectionState.to.x,
            y: connectionState.to.y,
        });

        const nodeId = crypto.randomUUID()
        const edgeId = crypto.randomUUID()
        const type = selectedValue

        console.log("type :", type);

        const newNode = {
            id: nodeId,
            type,
            position: flowPosition,
            data: {
                id: nodeId,
                type,
                kind: NODE_KIND.ACTION,
                exchange: "Excness",
                asset: "BTC_USDC",
                side: "LONG",
                onChange: (
                    id: string, type: string,kind: string, nodeMetaDateField: string, nodeMetaDateFieldValue: string | number
                ) => { updateNode(id, type, kind, nodeMetaDateField, nodeMetaDateFieldValue) }
            }
        }
        const newEdge = { id: edgeId, source: connectionState.fromNode.id, target: nodeId, }
        context.setNodes((prevNodes: any) => [...prevNodes, newNode])
        context.setEdges((prevEdges: any) => [...prevEdges, newEdge])
        context.setselectedNode("")
    }

    //-------------
    // HANDLER FOR CHANGE IN SELECT<>
    //-------------
    const handleNodeChange = (selectedValue: string) => {
        console.log("handleNodeChange fn - selectedValue :", selectedValue);

        if (!context) {
            throw new Error("context not found !");
        }
        context.setselectedNode(selectedValue)
        context.setSelectNodeDropdown("close")
        selectActionNode(selectedValue)
    }

    return (
        <div className={`${context.SelectNodeDropdown === "open" ? "block" : "hidden"} absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-blur-[1.3px]`}>
            <div className='bg-zinc-900 rounded-lg'>
                <Select value={context.selectedNode} onValueChange={handleNodeChange}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select a Action Node" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>agent</SelectLabel>
                            <SelectItem value="agent">Ai-Agent</SelectItem>
                            <SelectLabel>normal</SelectLabel>
                            {SELECT_NODE.map(({ value, text }, idx) => (
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

export default SelectNode