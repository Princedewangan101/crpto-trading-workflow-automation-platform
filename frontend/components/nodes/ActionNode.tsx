'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useContext } from 'react'
import { SELECT_ASSET, SELECT_EXCHANGE } from "@/lib/arrayData";
import { Position, Handle } from '@xyflow/react';
import { Input } from "../ui/input";
import { Context } from "../context/ContextProvider";

interface ActionNodeMetadata {
    id: string, type: string, exchange: string, asset: string, side: string, quantity: number, key: string, onChange: (id: string, type: string, nodeMetaDateField: string, nodeMetaDateFieldValue: string | number) => void
}

const ExchangeActionNode = ({ data, isConnectable }: { data: ActionNodeMetadata, isConnectable: boolean }) => {
    console.log("action node data :", data);
    const context = useContext(Context);

    const [isActionNodeOpen, setisActionNodeOpen] = React.useState<boolean>(false);

    function handleActionNodeDelete() {
        if (!context) { throw new Error("context is empty !"); }
        const newNodes = context.nodes.filter(n => n.id !== data.id)
        context.setNodes(newNodes)

        // 2nd way
        // const { deleteElements } = useReactFlow();?
        // deleteElements({ nodes: [{ id: data.id }] }); 
    }

    return (
        <>
            <div className="boxShadow">
                <div className='rounded-md w-50 border-2 p-2 flex flex-col gap-2'>
                    <div className="flex justify-between items-center px-1 ">
                        <h1>Action Node</h1>
                        <div className="flex gap-2">
                            <h1 onClick={handleActionNodeDelete} className="border rounded-md px-1.5 hover:bg-gray-700 hover:cursor-pointer">X</h1>
                            <h1 onClick={() => { isActionNodeOpen ? setisActionNodeOpen(false) : setisActionNodeOpen(true) }} className="border rounded-md px-1.5 hover:bg-gray-700 hover:cursor-pointer  ">{"<"}</h1>
                        </div>
                    </div>

                    {/* SELECT EXCHANGE */}
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="select a action" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SELECT_EXCHANGE.map(({ value, text }, idx) => (
                                    <SelectItem key={idx} value={value}>
                                        {text}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* SELECT ASSET */}
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
                            <SelectValue placeholder="select a asset" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SELECT_ASSET.map(({ value, text }, idx) => (
                                    <SelectItem key={idx} value={value}>
                                        {text}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {isActionNodeOpen && (
                        <>
                            {/* SELECT SIDE */}
                            < Select >
                                <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="select side" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="long">LONG</SelectItem>
                                        <SelectItem value="short">SHORT</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <div>
                                <Input
                                    id="quantity"
                                    type="number"
                                    placeholder="quantity : 100"
                                    value={data.quantity}
                                    onChange={(e) => { data.onChange(data.id, data.type, "asset", e.target.value) }}
                                />
                            </div>

                            <div>
                                <Input
                                    id="api-key"
                                    type="string"
                                    placeholder="api-key"
                                    value={data.key}
                                    onChange={(e) => { data.onChange(data.id, data.type, "asset", e.target.value) }}
                                />
                            </div>
                        </>
                    )}
                </div>
                <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
                <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
            </div >
        </>
    )
}

export default ExchangeActionNode