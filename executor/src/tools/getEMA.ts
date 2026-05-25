import { tool } from "langchain";
import z from "zod";
import { EMA_NUMBER, INDICATOR_PROVIDER_API_KEY } from "./toolConfig.js";


export const getEMA = tool(
    async ({ ticker, timeframe }) => {

        const response = await fetch(`https://api.massive.com/v1/indicators/ema/${ticker}?timespan=${timeframe}&adjusted=true&window=${EMA_NUMBER}&series_type=close&order=desc&limit=10&apiKey=${INDICATOR_PROVIDER_API_KEY}`);

        const data = await response.json();

        if (data.results && data.results.values) {
            console.log("LATEST EMA VALUES:", data.results.values[0]);
            return data.results.values[0]
        } else {
            return `Failed to fetch EMA value`
        }
    },
    {
        name: "getEMA",
        description: "Get the latest Exponential Moving Average (EMA) values for a stock ticker.",
        schema: z.object({
            ticker: z.string().describe("The stock ticker symbol (e.g., 'X:BTCUSD', 'X:XAUUSD', 'X:SOLUSD', 'X:ETHUSD')"),
            timeframe: z.string().describe("The timeframe  (e.g., 'day', 'week', 'hour', 'minute')"),
        }),
    }
)
