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

interface NotificationNodeMetadata {
    id: string,
    type: string,
    email: string,
    key: string,
    onChange: (
        id: string,
        type: string,
        nodeMetaDateField: string,
        nodeMetaDateFieldValue: string | number
    ) => void
}

const NotificationActionNode = ({ data, isConnectable }: { data: NotificationNodeMetadata, isConnectable: boolean }) => {
    console.log("notifi... node data :", data);
    const context = useContext(Context);

    const [isActionNodeOpen, setisActionNodeOpen] = React.useState<boolean>(false);

    function handleActionNodeDelete() {
        if (!context) { throw new Error("context is empty !"); }
        const newNodes = context.nodes.filter(n => n.id !== data.id)
        context.setNodes(newNodes)
    }

    return (
        <div className="boxShadow">
            <div className='rounded-md w-50 border-2 p-2 flex flex-col gap-2'>
                <div className="flex justify-between items-center px-1 ">
                    <h1>Notification Node</h1>
                    <div className="flex gap-2">
                        <h1 onClick={handleActionNodeDelete} className="border rounded-md px-1.5 hover:bg-gray-700 hover:cursor-pointer">X</h1>
                        <h1 onClick={() => { isActionNodeOpen ? setisActionNodeOpen(false) : setisActionNodeOpen(true) }} className="border rounded-md px-1.5 hover:bg-gray-700 hover:cursor-pointer  ">{"<"}</h1>
                    </div>
                </div>
                <div>
                    <Input
                        id="email"
                        type="string"
                        placeholder="kenny@gmail.com"
                        value={data.email}
                        onChange={(e) => { data.onChange(data.id, data.type, "email", e.target.value) }}
                    />
                </div>

                <div>
                    <Input
                        id="api-key"
                        type="string"
                        placeholder="api-key"
                        value={data.key}
                        onChange={(e) => { data.onChange(data.id, data.type, "api-key", e.target.value) }}
                    />
                </div>
            </div>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    )
}

export default NotificationActionNode