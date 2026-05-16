"use client"
import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Context } from '../context/ContextProvider'

const WorkFlowCard = ({ id, title, description }) => {

    const context = useContext(Context);

    function handleSelectedWorkFlow() {
        if (!context) {
            throw new Error("useWorkflowContext must be used within a ContextProvider");
        }
        context.setNodes()
    }

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={() => { handleSelectedWorkFlow }} className="w-full">see</Button>
            </CardFooter>
        </Card>
    )
}

export default WorkFlowCard