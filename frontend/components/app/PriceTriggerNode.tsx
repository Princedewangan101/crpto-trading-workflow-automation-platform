import { Position, Handle } from '@xyflow/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export function PriceTriggerNode({ data, isConnectable }) {
    console.log("data :", data);

    return (
        <div className="custom-node">
            <div className='border-2 rounded-lg p-3 flex-col flex gap-3'>
                <div className='flex-col flex gap-1'>
                    <Label htmlFor="asset">Asset</Label>
                    <Input
                        id="asset"
                        type="text"
                        placeholder="SOL"
                        value={data.asset}
                        onChange={(e) => {data.onChange(data.id, "asset", e.target.value)}}
                    />
                </div>
                <div className='flex-col flex gap-1'>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" value={data.price} type="number" placeholder="100" />
                </div>

                <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
            </div>
        </div>
    );
}