import { CHAIN_ID, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH, YT_ADDRESS } from "./constants";
import { callConvertAPI, getSigner, printConvertOutput } from "./helper";

export async function mintPyFromSy() {
    // Mint PT & YT from 1 SY with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: SY_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: `${PT_ADDRESS},${YT_ADDRESS}`,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function mintPyFromToken() {
    // Mint PT & YT from 1 wstETH with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: wstETH,
        amountsIn: '1000000000000000000',
        tokensOut: `${PT_ADDRESS},${YT_ADDRESS}`,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}


// mintPyFromSy();
// mintPyFromToken();
