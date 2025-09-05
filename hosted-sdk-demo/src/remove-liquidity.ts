import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callConvertAPI, getSigner, printConvertOutput } from "./helper";

export async function removeLiquiditySinglePt() {
    // Remove 1 LP from wstETH pool to PT with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: MARKET_ADDRESS, // LP token address
        amountsIn: '1000000000000000000',
        tokensOut: PT_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function removeLiquiditySingleSy() {
    // Remove 1 LP from wstETH pool to SY with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: MARKET_ADDRESS, // LP token address
        amountsIn: '1000000000000000000',
        tokensOut: SY_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function removeLiquiditySingleToken() {
    // Remove 1 LP from wstETH pool to wstETH with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: MARKET_ADDRESS, // LP token address
        amountsIn: '1000000000000000000',
        tokensOut: wstETH,
        receiver: RECEIVER_ADDRESS,
        enableAggregator: true,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}


removeLiquiditySinglePt();
removeLiquiditySingleSy();
removeLiquiditySingleToken();
