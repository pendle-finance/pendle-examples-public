import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, USDC, wstETH, YT_ADDRESS } from "./constants";
import { callConvertAPI, getSigner, printConvertOutput } from "./helper";

export async function addLiquiditySinglePt() {
    // Add liquidity with 1 PT to wstETH pool with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: PT_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: MARKET_ADDRESS, // LP token address
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function addLiquiditySingleSy() {
    // Add liquidity with 1 SY to wstETH pool with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: SY_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: MARKET_ADDRESS, // LP token address
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function addLiquiditySingleSyKeepYt() {
    // Add liquidity with 1 SY to wstETH pool (zero price impact mode) with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: SY_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: `${MARKET_ADDRESS},${YT_ADDRESS}`, // LP + YT (ZPI mode)
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function addLiquiditySingleToken() {
    // Add liquidity with 1 wstETH to wstETH pool with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: wstETH,
        amountsIn: '1000000000000000000',
        tokensOut: MARKET_ADDRESS, // LP token address
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function addLiquiditySingleTokenKeepYt() {
    // Add liquidity with 1 wstETH to wstETH pool (zero price impact mode) with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: wstETH,
        amountsIn: '1000000000000000000',
        tokensOut: `${MARKET_ADDRESS},${YT_ADDRESS}`, // LP + YT (ZPI mode)
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}


// addLiquiditySinglePt();
// addLiquiditySingleSy();
// addLiquiditySingleSyKeepYt();
// addLiquiditySingleToken();
// addLiquiditySingleTokenKeepYt();
