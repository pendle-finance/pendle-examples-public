import { CHAIN_ID, RECEIVER_ADDRESS, SY_ADDRESS, wstETH, YT_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { RedeemPyData } from "./types";

export async function redeemPyToSy() {
    // Redeem 1 PT and 1 YT to SY with 1% slippage
    const res = await callSDK<RedeemPyData>(`/v1/sdk/${CHAIN_ID}/redeem`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        yt: YT_ADDRESS,
        amountIn: '1000000000000000000',
        tokenOut: SY_ADDRESS,
    });

    console.log('Amount SY Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function redeemPyToToken() {
    // Redeem 1 PT and 1 YT to wstETH with 1% slippage
    const res = await callSDK<RedeemPyData>(`/v1/sdk/${CHAIN_ID}/redeem`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        yt: YT_ADDRESS,
        amountIn: '1000000000000000000',
        tokenOut: wstETH,
    });

    console.log('Amount wstETH Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
