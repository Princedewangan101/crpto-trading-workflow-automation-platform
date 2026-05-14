"use client";
import React, { useContext } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { Context } from '@/components/context/ContextProvider';
import { REQUIRED } from '@/lib/arrayData';

const PriceDialog = () => {
    const router = useRouter();
    const context = useContext(Context);

    ///  STATE MUTATION ( OR DIRECT-MUTATION) BUG : LEARNING-101 (z.learning.txt)
    function updateNode(id: string, field: string, fieldValue: string) {
        if (!context) { throw new Error("context not found"); }

        context.setNodes((prevNode) => {
            prevNode.map((n) => {
                if (n.id !== id) return n;
                return {
                    ...n, data: { ...n.data, [field]: fieldValue }
                }
            })
        })


    }

    function handlePriceTriggerNodeCreation(e: any) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)

        const asset = (formData.get('asset') as string).toUpperCase();
        const price = formData.get('price') as string;

        if (!asset || !price) return console.log("not get");
        if (!context) { throw new Error("context not found"); }

        context.setNodes((prev) => [
            ...prev,
            {
                id: `${crypto.randomUUID}`,
                type: 'priceTrigger',
                position: { x: 0, y: 0 },
                data: { asset: asset, price: price, onChange: (id: string, field: string, fieldValue: string) => updateNode(id, field, fieldValue) }
            }
        ])
        router.push('/create-workflow');
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Price Trigger</CardTitle>
                <CardDescription>
                    enter detail for when to trigger price
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePriceTriggerNodeCreation} className='flex-col flex gap-4'>
                    <div className="flex flex-col gap-6">
                        {REQUIRED.map(({ label, inputId, inputType, inputPlaceholder }, idx) => (
                            <div key={idx} className="grid gap-2">
                                <Label htmlFor="email">{label}</Label>
                                <Input
                                    id={inputId}
                                    name={inputId}
                                    type={inputType}
                                    placeholder={inputPlaceholder}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex-col flex gap-2 ">
                        <Button type="submit" className="w-full">
                            create
                        </Button>
                        <Button onClick={() => { router.push('/create-workflow') }} variant="outline" className="w-full">
                            cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default PriceDialog