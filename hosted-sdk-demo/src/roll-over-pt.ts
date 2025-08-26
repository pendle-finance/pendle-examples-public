import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS } from "./constants";
import { callAllRouterActionsAPI, getSigner, printRouterActionsOutput } from "./helper";

const sUSDe_PT_ADDRESS = '0x9f56094c450763769ba0ea9fe2876070c0fd5f77';

export async function rollOverPt() {
    // Roll over 1 sUSDe PT to wstETH PT with 1% slippage
    const resp = await callAllRouterActionsAPI(CHAIN_ID, {
        tokensIn: sUSDe_PT_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: PT_ADDRESS, // Target PT
        receiver: RECEIVER_ADDRESS,
        enableAggregator: true,
        slippage: 0.01,
    });

    printRouterActionsOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

// rollOverPt();
