import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callConvertAPI, getSigner, printConvertOutput } from "./helper";

export async function addLiquidityDualSyAndPt() {
    // Add liquidity dual with 1 SY and 1 PT to wstETH pool with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: `${SY_ADDRESS},${PT_ADDRESS}`,
        amountsIn: '1000000000000000000,1000000000000000000',
        tokensOut: MARKET_ADDRESS, // LP token address
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function addLiquidityDualTokenAndPt() {
    // Add liquidity dual with 1 wstETH and 1 PT to wstETH pool with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: `${wstETH},${PT_ADDRESS}`,
        amountsIn: '1000000000000000000,1000000000000000000',
        tokensOut: MARKET_ADDRESS, // LP token address
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

// addLiquidityDualSyAndPt();
// addLiquidityDualTokenAndPt();
