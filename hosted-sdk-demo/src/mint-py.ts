import { CHAIN_ID, RECEIVER_ADDRESS, SY_ADDRESS, wstETH, YT_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { MintPyData } from "./types";

export async function mintPyFromSy() {
    // Use 1 SY to mint PT and YT with 1% slippage
    const resp = await callSDK<MintPyData>(`/v2/sdk/${CHAIN_ID}/mint`, {
        receiver: RECEIVER_ADDRESS,
        yt: YT_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        amountIn: '1000000000000000000',
    });

    console.log('Amount PT & YT Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function mintPyFromToken() {
    // Use 1 wstETH to mint PT and YT with 1% slippage
    const resp = await callSDK<MintPyData>(`/v2/sdk/${CHAIN_ID}/mint`, {
        receiver: RECEIVER_ADDRESS,
        yt: YT_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        amountIn: '1000000000000000000',
    });

    console.log('Amount PT & YT Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}


// mintPyFromSy();
// mintPyFromToken();
