import * as z from "zod";

export const MODEL = "google-genai:gemini-2.5-flash-lite"

export const SYSTEM_PROMPT = `You are an expert crypto trading agent. Your job is to look at the RSI tool data provided and make a concrete decision. Always output your final answer strictly matching the requested JSON schema.`;

export const AGENT_FINAL_RESPONSE_FORMATE = z.object({
    shouldTrade: z.boolean().describe("True if response met the user prompt otherwise False"),
    action: z.enum(["BUY", "SELL", "HOLD"]).describe("The trading action to take"),
    reason: z.string().describe("Short explanation of why this decision was made"),
    toolName: z.array(z.string()).describe("all the tool that get called"),
    toolvalue: z.array(z.number()).describe("The response value extracted from the tool")
});