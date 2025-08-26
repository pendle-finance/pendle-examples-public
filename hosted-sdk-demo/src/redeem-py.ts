import { CHAIN_ID, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH, YT_ADDRESS } from "./constants";
import { callAllRouterActionsAPI, getSigner, printRouterActionsOutput } from "./helper";

export async function redeemPyToSy() {
    // Redeem 1 PT and 1 YT to SY with 1% slippage
    const resp = await callAllRouterActionsAPI(CHAIN_ID, {
        tokensIn: `${PT_ADDRESS},${YT_ADDRESS}`,
        amountsIn: '1000000000000000000,1000000000000000000',
        tokensOut: SY_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printRouterActionsOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function redeemPyToToken() {
    // Redeem 1 PT and 1 YT to wstETH with 1% slippage
    const resp = await callAllRouterActionsAPI(CHAIN_ID, {
        tokensIn: `${PT_ADDRESS},${YT_ADDRESS}`,
        amountsIn: '1000000000000000000,1000000000000000000',
        tokensOut: wstETH,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printRouterActionsOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

// redeemPyToSy();
// redeemPyToToken();
