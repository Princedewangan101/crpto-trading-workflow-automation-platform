"use client";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React, { useContext } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Context } from '@/components/context/ContextProvider';
import SelectAsset from '@/components/app/SelectAsset';
import { NODE_KIND, NODE_TYPE } from "@/lib/arrayData";

const TimeDialog = () => {
    const router = useRouter();
    const context = useContext(Context);

    function updateNode(id: string, type: string, kind: string, nodeMetaDataField: "asset" | "time", nodeMetaDataFieldValue: string | number) {
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

    function handlePriceTriggerNodeCreation(e: any) {
        console.log("form submitting");

        e.preventDefault();

        const formData = new FormData(e.currentTarget)

        const asset = (formData.get('asset') as string).toUpperCase();
        const time = formData.get('time') as string;
        // console.log("asset :", formData.get("asset"));
        console.log("time :", formData.get("time"));

        if (!asset || !time) return console.log("not get");
        if (!context) { throw new Error("context not found"); }

        const nodeId = crypto.randomUUID()

        // PRICE-TRIGGER NODE CREATION
        context.setNodes(() => [
            {
                id: nodeId,
                type: NODE_TYPE.TIME_TRIGGER,
                position: { x: 0, y: 0 },
                data: {
                    id: nodeId,
                    type: NODE_TYPE.TIME_TRIGGER,
                    kind: NODE_KIND.TRIGGER,
                    asset: asset,
                    time: time,
                    onChange: (
                        id: string,
                        type: string,
                        kind: string,
                        nodeMetaDataField: "asset" | "time",
                        nodeMetaDataFieldValue: string | number
                    ) => updateNode(id, type, kind, nodeMetaDataField, nodeMetaDataFieldValue)
                }
            }
        ])
        router.push('/workflow');
    }

    return (
        <div className='w-screen h-screen  flex justify-center items-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Time Trigger</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePriceTriggerNodeCreation} className='flex-col flex gap-4'>
                        <div className="flex flex-col gap-6">
                            <SelectAsset from={"priceDialog"} />
                            <Input
                                id="time"
                                name="time"
                                // value={78200.30}
                                type="number"
                                placeholder="time in seconds"
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                required
                            />
                        </div>
                        <div className="flex-col flex gap-2 ">
                            <Button type="submit" className="w-full">
                                create
                            </Button>
                            <Button onClick={() => { router.push('/dashboard') }} variant="outline" className="w-full">
                                cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default TimeDialog