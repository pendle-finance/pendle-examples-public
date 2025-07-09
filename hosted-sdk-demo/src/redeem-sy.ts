import { CHAIN_ID, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callSDK, getSigner } from "./helper";
import { RedeemSyData } from "./types";

export async function redeemSyToToken() {
    // Redeem 1 SY to wstETH with 1% slippage
    const resp = await callSDK<RedeemSyData>(`/v2/sdk/${CHAIN_ID}/redeem-sy`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        sy: SY_ADDRESS,
        amountIn: '1000000000000000000',
        tokenOut: wstETH,
    });

    console.log('Amount wstETH Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

// redeemSyToToken();
