import { CHAIN_ID, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callSDK, getSigner } from "./helper";
import { MintSyData } from "./types";

export async function mintSyFromToken() {
    // Use 1 wstETH to mint SY with 1% slippage
    const res = await callSDK<MintSyData>(`/v1/sdk/${CHAIN_ID}/mint-sy`, {
        receiver: RECEIVER_ADDRESS,
        sy: SY_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        amountIn: '1000000000000000000',
    });

    console.log('Amount SY Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}