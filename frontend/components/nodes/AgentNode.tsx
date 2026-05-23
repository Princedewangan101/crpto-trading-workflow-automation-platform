import { Handle, Position } from '@xyflow/react'
import React from 'react'

interface AgentNodeMetadata {
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

const AgentNode = ({ data, isConnectable }: { data: AgentNodeMetadata, isConnectable: boolean }) => {
    return (
        <div>
            <main className='border-2 boxShadow w-50 rounded-lg py-7 flex justify-center items-center'>
                <div className='flex gap-6 justify-center items-center'>
                    <h1 className='text-lg'>AI-Agent</h1>
                </div>
                <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
                <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

                <div className='realtive'>
                    <span className='absolute top-24 right-3 text-xs text-zinc-500'>tools</span>
                    <Handle id="output-1" style={{ left: '25%' }} type="source" position={Position.Bottom} isConnectable={isConnectable} />
                </div>
                <div className='realtive'>
                    <span className='absolute top-24 right-20 text-xs text-zinc-500'>tools</span>
                    <Handle id="output-3" style={{ left: '75%' }} type="source" position={Position.Bottom} isConnectable={isConnectable} />
                </div>
                <div className='realtive'>
                    <span className='absolute top-24 right-38 text-xs text-zinc-500'>models</span>
                    <Handle id="output-2" style={{ left: '50%' }} type="source" position={Position.Bottom} isConnectable={isConnectable} />
                </div>
            </main>
        </div>
    )
}

export default AgentNode