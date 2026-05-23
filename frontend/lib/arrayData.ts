// export const REQUIRED = [
//     { label: "Assest", inputId: "asset", inputType: "string", inputPlaceholder: "SOL_USDC" },
//     { label: "Price", inputId: "price", inputType: "number", inputPlaceholder: "105" },
// ]

export const SELECT_EXCHANGE = [
    { value: "hyperliquid", text: "Hyper-Liquid" },
    { value: "excness", text: "Excness" },
    { value: "backpack", text: "Backpack" },
]

export const SELECT_ASSET = [
    { value: "sol", text: "SOL_USDC" },
    { value: "btc", text: "BTC_USDC" },
    { value: "eth", text: "ETH_USDC" },
    { value: "pepe", text: "PEPE_USDC" },
]

export const SELECT_NODE = [
    { value: "exchange", text: "Exchange Node" },
    { value: "notification", text: "Notification Node" },
]

export const SELECT_MODEL = [
    { value: "gemini2p0flash", text: "gemini-2.0-flash" },
    { value: "gemini2p5flash", text: "gemini-2.5-flash" },
    { value: "gemini3p0flash", text: "gemini-3.0-flash" },
    { value: "gemini3p5flash", text: "gemini-3.5-flash" },
]

export const SELECT_TOOL = [
    { value: "sentimental_analysis", text: "sentimental_analysis" },
    { value: "technical_indicator_fetcher", text: "technical_indicator_fetcher" },
    { value: "order_book_depth_finder", text: "order_book_depth_finder" },
]

export const NODE_TYPE = {
    "PRICE_TRIGGER": "priceTrigger",
    "TIME_TRIGGER": "timeTrigger",
    "EXCHANGE": "exchange",
    "NOTIFICATION": "notification",
    "AGENT": "agent",
}

export const NODE_KIND = {
    "ACTION": "ACTION",
    "TRIGGER": "TRIGGER",
    "AGENT": "AGENT",
    "MODEL": "MODEL",
    "TOOL": "TOOL",
}

