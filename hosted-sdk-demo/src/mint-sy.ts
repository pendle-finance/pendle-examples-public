import { CHAIN_ID, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callConvertAPI, getSigner, printConvertOutput } from "./helper";

export async function mintSyFromToken() {
    // Mint SY from 1 wstETH with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: wstETH,
        amountsIn: '1000000000000000000',
        tokensOut: SY_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

// mintSyFromToken();
