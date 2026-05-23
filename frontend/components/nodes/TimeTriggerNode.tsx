import { Position, Handle } from '@xyflow/react';
import { Input } from '../ui/input';
import SelectAsset from '../app/SelectAsset';

export interface TimeNodeMetadata {
    id: string,
    type: string,
    kind: string,
    asset: string,
    time: number,
    onChange: (
        id: string,
        type: string,
        kind: string,
        nodeMetaDataField: "asset" | "time",
        nodeMetaDataFieldValue: string | number
    ) => void
}

const TimeTriggerNode = ({ data, isConnectable }: { data: TimeNodeMetadata, isConnectable: boolean }) => {
    console.log("time triggered data :", data);
    
    return (
        <div className='border-2 boxShadow w-50 rounded-lg p-3 flex-col flex gap-2'>
            <div className='flex-col flex gap-2'>
                <div className="flex justify-between items-center px-1 ">
                    <h1>Trigger Node</h1>
                </div>
                {/* SELECT ASSSET */}
                <SelectAsset data={data} from={"priceTriggerNode"} />
            </div>
            <div className='flex-col flex gap-1'>
                <Input
                    id="price"
                    type="number"
                    placeholder="time in seconds"
                    // value="30000"
                    value={data.time}
                    onChange={(e) => { data.onChange(data.id, data.type, data.kind, "time", e.target.value) }}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    )
}

export default TimeTriggerNode