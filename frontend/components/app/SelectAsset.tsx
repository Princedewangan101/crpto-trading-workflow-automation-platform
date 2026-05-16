'use client';
import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SELECT_ASSET } from '@/lib/arrayData';
import { Context } from '../context/ContextProvider';

const SelectAsset = () => {
    const context = useContext(Context)
    if (!context) { throw new Error("context not found"); }
    const SelectChangedValue = context.PriceTriggerNodeAssetValue

    function handleSelectVauleChange(selectedValue: string) {
        if (!context) { throw new Error("context not found"); }
        context.setPriceTriggerNodeAssetValue(selectedValue)
    }
    return (
        <Select name='asset' value={SelectChangedValue} onValueChange={handleSelectVauleChange}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="select a asset" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {SELECT_ASSET.map(({ value, text }, idx) => (
                        <SelectItem key={idx} value={value}>
                            {text}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectAsset