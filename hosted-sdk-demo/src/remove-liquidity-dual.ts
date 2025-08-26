import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callAllRouterActionsAPI, getSigner, printRouterActionsOutput } from "./helper";

export async function removeLiquidityDualSyAndPt() {
    // Remove liquidity dual: 1 LP to SY and PT with 1% slippage
    const resp = await callAllRouterActionsAPI(CHAIN_ID, {
        tokensIn: MARKET_ADDRESS, // LP token address
        amountsIn: '1000000000000000000',
        tokensOut: `${PT_ADDRESS},${SY_ADDRESS}`, // PT + SY
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printRouterActionsOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function removeLiquidityDualTokenAndPt() {
    // Remove liquidity dual: 1 LP to wstETH and PT with 1% slippage
    const resp = await callAllRouterActionsAPI(CHAIN_ID, {
        tokensIn: MARKET_ADDRESS, // LP token address
        amountsIn: '1000000000000000000',
        tokensOut: `${PT_ADDRESS},${wstETH}`, // PT + wstETH
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printRouterActionsOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

// removeLiquidityDualSyAndPt();
// removeLiquidityDualTokenAndPt();
