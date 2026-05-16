"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';

export const Appbar = () => {
    const router = useRouter();

    function handleSelectValue(value: string) {
        value === "price" ? router.push('/price-dialog') : router.push('/time-dialog')
    }

    return (
        <>
            <nav className="border-b px-6 md:px-16 lg:px-24 xl:px-32 py-4 flex items-center justify-between relative">
                <div className="flex items-center gap-20">
                    <h1>NN</h1>
                </div>

                <Select onValueChange={handleSelectValue}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Create a workflow" >Create a workflow</SelectValue>
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
            </nav>
        </>
    )
}