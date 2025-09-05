import { CHAIN_ID, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callConvertAPI, getSigner, printConvertOutput } from "./helper";

export async function redeemSyToToken() {
    // Redeem 1 SY to wstETH with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: SY_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: wstETH,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

// redeemSyToToken();
