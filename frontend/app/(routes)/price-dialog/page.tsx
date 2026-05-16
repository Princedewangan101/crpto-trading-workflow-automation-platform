"use client";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React, { useContext } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Context } from '@/components/context/ContextProvider';
import SelectAsset from '@/components/app/SelectAsset';

const PriceDialog = () => {
    const router = useRouter();
    const context = useContext(Context);

    function updateNode(id: string, type: string, nodeMetaDataField: string, nodeMetaDataFieldValue: string) {
        if (!context) { throw new Error("context not found"); }

        context.setNodes((prevNode) => {
            const filterForType = prevNode.filter(n => n.type === type)
            return filterForType.map((n) => {
                if (n.id !== id) return n;
                return {
                    ...n, data: { ...n.data, [nodeMetaDataField]: nodeMetaDataFieldValue }
                }
            })
        })
    }

    function handlePriceTriggerNodeCreation(e: any) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)

        const asset = (formData.get('asset') as string).toUpperCase();
        const price = formData.get('price') as string;
        // console.log("asset :", formData.get("asset"));
        // console.log("price :", formData.get("price"));

        if (!asset || !price) return console.log("not get");
        if (!context) { throw new Error("context not found"); }

        const nodeId = crypto.randomUUID()
        const type = 'priceTrigger'
        context.setNodes(() => [
            {
                id: nodeId,
                type,
                position: { x: 0, y: 0 },
                data: {
                    id: nodeId,
                    type,
                    asset: asset,
                    price: price,
                    onChange: (
                        id: string,
                        type: string,
                        nodeMetaDataField: string,
                        nodeMetaDataFieldValue: string
                    ) => updateNode(id, type, nodeMetaDataField, nodeMetaDataFieldValue)
                }
            }
        ])
        router.push('/workflow');
    }

    return (
        <div className='w-vw h-vh'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Price Trigger</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePriceTriggerNodeCreation} className='flex-col flex gap-4'>
                        <div className="flex flex-col gap-6">
                            <SelectAsset />
                            <Input
                                id="price"
                                name="price"
                                // value={222}
                                type="number"
                                placeholder="price at which action trigger"
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

export default PriceDialog