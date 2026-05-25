

const apiKey = "GpOjGW8MudOgRdmbpGFI66sBLnWKu4hP";
const ticker = "X:BTCUSD"
const timespan = "minute"
const window = "14"
const ema_number = "200"


export async function getRSI() {
    const response = await fetch(`https://api.massive.com/v1/indicators/rsi/${ticker}?timespan=${timespan}&adjusted=true&window=${window}&series_type=close&order=desc&limit=10&apiKey=${apiKey}`);

    const data = await response.json();

    if (data.results && data.results.values) {
        console.log("LATEST RSI VALUES:", data.results.values[0]);
        return data.results.values[0]
    }
}

export async function getEMA() {
    const response = await fetch(`https://api.massive.com/v1/indicators/ema/${ticker}?timespan=${timespan}&adjusted=true&window=${ema_number}&series_type=close&order=desc&limit=10&apiKey=${apiKey}`);

    const data = await response.json();

    if (data.results && data.results.values) {
        console.log("LATEST EMA VALUES:", data.results.values[0]);
        return data.results.values[0]
    }
}


// getRSI()
// getEMA()


// LATEST EMA VALUES: [
//   { timestamp: 1779580680000, value: 76506.64421579785 },
//   { timestamp: 1779580620000, value: 76505.02948429833 },
//   { timestamp: 1779580560000, value: 76503.09008213047 },
//   { timestamp: 1779580500000, value: 76501.21159049359 },
//   { timestamp: 1779580440000, value: 76499.54185773473 },
//   { timestamp: 1779580380000, value: 76496.48197690795 },
//   { timestamp: 1779580320000, value: 76494.95013747989 },
//   { timestamp: 1779580260000, value: 76493.38008861034 },
//   { timestamp: 1779580200000, value: 76491.72722517929 },
//   { timestamp: 1779580140000, value: 76489.06116714088 }
// ]