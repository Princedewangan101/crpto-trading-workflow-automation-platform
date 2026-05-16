import { Position, Handle } from '@xyflow/react';
import { Input } from '../ui/input';
import SelectAsset from '../app/SelectAsset';

interface PriceNodeMetadata {
    id: string,
    type: string
    asset: string,
    price: number,
    onChange: (
        id: string,
        type: string,
        nodeMetaDataField: "asset" | "price",
        nodeMetaDataFieldValue: string | number
    ) => void
}

export function PriceTriggerNode({ data, isConnectable }: { data: PriceNodeMetadata, isConnectable: boolean }) {
    // console.log("data :", data);

    return (
        <div className='border-2 boxShadow w-50 rounded-lg p-3 flex-col flex gap-2'>
            <div className='flex-col flex gap-2'>
                <div className="flex justify-between items-center px-1 ">
                    <h1>Trigger Node</h1>
                </div>
                {/*  */}
                <SelectAsset />
            </div>
            <div className='flex-col flex gap-1'>
                <Input
                    id="price"
                    type="number"
                    placeholder="price"
                    value={data.price}
                    onChange={(e) => { data.onChange(data.id, data.type, "price", e.target.value) }}
                />
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    );
}