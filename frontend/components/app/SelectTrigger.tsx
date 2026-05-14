'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



import React from "react";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';

const Trigger = () => {
    const router = useRouter();

    function handleSelectValue(value: string) {
        value === "price" ? router.push('/price-dialog') : router.push('/time-dialog')
    }

    return (
        <Select onValueChange={handleSelectValue}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="select a trigger" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="time">
                        Time-Trigger
                    </SelectItem>
                    <SelectItem value="price">
                        Price-Trigger
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default Trigger