import SelectModel from '@/components/app/SelectModel'
import { Context } from '@/components/context/ContextProvider'
import { SELECT_MODEL } from '@/lib/arrayData'
import { Handle, Position } from '@xyflow/react'
import React, { useContext } from 'react'

interface ModelNodeMetadata {
    id: string,
    type: string,
    kind: string,
    onChange: (
        id: string,
        type: string,
        kind: string,
        nodeMetaDateField: string,
        nodeMetaDateFieldValue: string | number
    ) => void
}

const Gemini = ({ data, isConnectable }: { data: ModelNodeMetadata, isConnectable: boolean }) => {
    const obj = (SELECT_MODEL.find(x => x.value === data.type))
    // console.log(obj);

    const context = useContext(Context);

    function handleActionNodeDelete() {
        if (!context) { throw new Error("context is empty !"); }
        const newNodes = context.nodes.filter(n => n.id !== data.id)
        context.setNodes(newNodes)
    }

    return (
        <div className='group'>
            <main className='border-2 boxShadow w-20 h-20 text-sm rounded-lg py-7 flex items-center'>
                <h1 className='text-center'>{obj?.text}</h1>
            </main>
            <h1 onClick={handleActionNodeDelete} className="border boxShadow rounded-full py-2 px-2 mt-2 text-center w-10 mx-auto hover:bg-gray-700 hover:cursor-pointer hidden group-hover:block">X</h1>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
        </div>
    )
}

export default Gemini