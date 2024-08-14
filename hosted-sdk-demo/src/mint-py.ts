import { CHAIN_ID, RECEIVER_ADDRESS, SY_ADDRESS, wstETH, YT_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { MintPyData } from "./types";

export async function mintPyFromSy() {
    // Use 1 SY to mint PT and YT with 1% slippage
    const res = await callSDK<MintPyData>(`/v1/sdk/${CHAIN_ID}/mint`, {
        receiver: RECEIVER_ADDRESS,
        yt: YT_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        amountIn: '1000000000000000000',
    });

    console.log('Amount PT & YT Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function mintPyFromToken() {
    // Use 1 wstETH to mint PT and YT with 1% slippage
    const res = await callSDK<MintPyData>(`/v1/sdk/${CHAIN_ID}/mint`, {
        receiver: RECEIVER_ADDRESS,
        yt: YT_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        amountIn: '1000000000000000000',
    });

    console.log('Amount PT & YT Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
