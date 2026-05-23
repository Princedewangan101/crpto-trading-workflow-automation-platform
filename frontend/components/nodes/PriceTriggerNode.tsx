import { Position, Handle } from '@xyflow/react';
import { Input } from '../ui/input';
import SelectAsset from '../app/SelectAsset';

export interface PriceNodeMetadata {
    id: string,
    type: string,
    kind: string,
    asset: string,
    price: number,
    onChange: (
        id: string,
        type: string,
        kind: string,
        nodeMetaDataField: "asset" | "price",
        nodeMetaDataFieldValue: string | number
    ) => void
}

export function PriceTriggerNode({ data, isConnectable }: { data: PriceNodeMetadata, isConnectable: boolean }) {
    // console.log("(pricetriggernode.tsx) data :", data);

    return (
        <div className='border-2 boxShadow w-50 rounded-lg p-3 flex-col flex gap-2'>
            <div className='flex-col flex gap-2'>
                <div className="flex justify-between items-center px-1 ">
                    <h1>Trigger Node</h1>
                </div>
                {/*  */}
                <SelectAsset data={data} from={"priceTriggerNode"} />
            </div>
            <div className='flex-col flex gap-1'>
                <Input
                    id="price"
                    type="number"
                    placeholder="price"
                    value={data.price}
                    onChange={(e) => { data.onChange(data.id, data.type, data.kind, "price", e.target.value) }}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>
            <Handle style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#777777',
            }} type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    );
}