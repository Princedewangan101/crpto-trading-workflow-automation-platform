import { Handle, Position } from '@xyflow/react'
import React, { useContext } from 'react'
import { Context } from '../context/ContextProvider'

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
    const context = useContext(Context)
    if (!context) { throw new Error("context not found !"); }

    return (
        <>

            <div className='group'>
                <div onClick={() => { context.setpromptArea("open") }} className='group-hover:opacity-100 opacity-0 hover:text-white hover:cursor-pointer text-zinc-400 mb-2 text-right'>
                    edit prompt
                </div>
                <main className='border-2 boxShadow w-50 rounded-lg py-7 flex justify-center items-center'>
                    <div className='flex gap-6 justify-center items-center'>
                        <h1 className='text-lg'>AI-Agent</h1>
                    </div>
                    <Handle style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#777777', top:"75px"
                    }} type="target" position={Position.Left} isConnectable={isConnectable} />
                    <Handle style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: '#777777', top:"75px"
                    }} type="source" position={Position.Right} isConnectable={isConnectable} />

                    <div className='realtive'>
                        <span className='absolute top-31 right-3 text-xs text-zinc-500'>tools</span>
                        <Handle style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: '#777777',
                            left: '25%'
                        }} id="output-1" type="source" position={Position.Bottom} isConnectable={isConnectable} />
                    </div>
                    <div className='realtive'>
                        <span className='absolute top-31 right-20 text-xs text-zinc-500'>memory</span>
                        <Handle style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: '#777777',
                            left: '75%'
                        }} id="output-3" type="source" position={Position.Bottom} isConnectable={isConnectable} />
                    </div>
                    <div className='realtive'>
                        <span className='absolute top-31 right-38 text-xs text-zinc-500'>models</span>
                        <Handle style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: '#777777',
                            left: '50%'
                        }} id="output-2" type="source" position={Position.Bottom} isConnectable={isConnectable} />
                    </div>
                </main>
            </div>
        </>
    )
}

export default AgentNode