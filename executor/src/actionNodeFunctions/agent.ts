import { MemorySaver } from "@langchain/langgraph";
import { context, createAgent, toolStrategy } from "langchain";
import type { Workflow } from "../../types.js";
import { redis } from "../redis.js";
import { MODEL, SYSTEM_PROMPT, AGENT_FINAL_RESPONSE_FORMATE } from "./agentConfig.js";

const iagent = createAgent({
    model: MODEL,
    tools: [],
    checkpointer: new MemorySaver(),
    systemPrompt: SYSTEM_PROMPT,
    responseFormat: toolStrategy(AGENT_FINAL_RESPONSE_FORMATE)
});

const config = { configurable: { thread_id: crypto.randomUUID() } };

export async function agent(workflow: Workflow, prompt: string) {
    const agentStream = await iagent.stream(
        { messages: [{ role: "user", content: prompt }] },
        { ...config, streamMode: "updates" },
    )

    const structuredResponse = []

    for await (const chunk of agentStream) {
        if (chunk.model_request?.structuredResponse) {
            structuredResponse.push(chunk.model_request.structuredResponse)
        }

        if (chunk.model_request?.messages) {
            const messages = chunk.model_request.messages;
            const lastMessage = messages[messages.length - 1];

            if (lastMessage?.tool_calls && lastMessage.tool_calls.length > 0) {
                const toolCall = lastMessage.tool_calls[0];

                // FOR REALTIME SERVICE : WE WILL UPDATE THE UI AS THE AGENT WORK
                await redis.lpush(
                    "realtime",
                    JSON.stringify({
                        type: "modelRequest", workflowInfo: { workflowId: workflow.id, userId: workflow.userId },
                        modelRequest: { toolName: toolCall.name, toolArgs: toolCall.args }
                    })
                );
            };
        };

        if (chunk.tools?.messages) {
            const messages = chunk.tools.messages[0];

            if (messages) {
                // FOR REALTIME SERVICE : WE WILL UPDATE THE UI AS THE AGENT WORK
                await redis.lpush(
                    "realtime",
                    JSON.stringify({
                        type: "toolResult",
                        workflowInfo: { workflowId: workflow.id, userId: workflow.userId },
                        toolResult: { toolName: messages.name, toolResponse: messages.content }
                    })
                );
            };
        };
    }
    return structuredResponse
}