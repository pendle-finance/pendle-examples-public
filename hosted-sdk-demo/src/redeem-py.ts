import { CHAIN_ID, RECEIVER_ADDRESS, SY_ADDRESS, wstETH, YT_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { RedeemPyData } from "./types";

export async function redeemPyToSy() {
    // Redeem 1 PT and 1 YT to SY with 1% slippage
    const resp = await callSDK<RedeemPyData>(`/v2/sdk/${CHAIN_ID}/redeem`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        yt: YT_ADDRESS,
        amountIn: '1000000000000000000',
        tokenOut: SY_ADDRESS,
    });

    console.log('Amount SY Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function redeemPyToToken() {
    // Redeem 1 PT and 1 YT to wstETH with 1% slippage
    const resp = await callSDK<RedeemPyData>(`/v2/sdk/${CHAIN_ID}/redeem`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        yt: YT_ADDRESS,
        amountIn: '1000000000000000000',
        tokenOut: wstETH,
    });

    console.log('Amount wstETH Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

// redeemPyToSy();
// redeemPyToToken();
