import { useContext } from 'react'
import { Context } from '../context/ContextProvider';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button';

const AgentPrompt = () => {
    const context = useContext(Context)
    if (!context) { throw new Error("context not found !"); }
    
    function handlePromptSave(prompt:string) {
        if (!context) { throw new Error("context not found !"); }
        context.setUserPromptForAgent(prompt)
    }

    return (
        <div className={`${context.promptArea === "open" ? "block" : "hidden"} absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-blur-[1.3px]`}>
            <div className=' rounded-lg '>
                <div onClick={() => { context.setpromptArea("close") }} className='text-right mr-2 text-zinc-400 hover:text-white hover:cursor-pointer'>
                    back
                </div>
                <div className='bg-zinc-950 Shadow rounded-lg mt-1'>
                    <Textarea className='w-150 min-h-40 focus-visible:ring-0' placeholder="ENTER YOUR PROMPT HERE ..." />
                </div>
                <Button onClick={() => { handlePromptSave }} className='mt-2 font-bold text-zinc-800 border'>SAVE</Button>
            </div>
        </div>
    )
}

export default AgentPrompt