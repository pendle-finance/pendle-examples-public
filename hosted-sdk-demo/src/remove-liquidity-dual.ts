import { CHAIN_ID, MARKET_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callSDK, getSigner } from "./helper";
import { RemoveLiquidityDualData } from "./types";

export async function removeLiquidityDualSyAndPt() {
    // Remove 1 LP from wstETH pool to SY and PT with 1% slippage
    const res = await callSDK<RemoveLiquidityDualData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/remove-liquidity-dual`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenOut: SY_ADDRESS,
        amountIn: '1000000000000000000',
    });

    console.log('Amount SY Out: ', res.data.amountTokenOut);
    console.log('Amount PT Out: ', res.data.amountPtOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function removeLiquidityDualTokenAndPt() {
    // Remove 1 LP from wstETH pool to wstETH and PT with 1% slippage
    const res = await callSDK<RemoveLiquidityDualData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/remove-liquidity-dual`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenOut: wstETH,
        amountIn: '1000000000000000000',
    });

    console.log('Amount wstETH Out: ', res.data.amountTokenOut);
    console.log('Amount PT Out: ', res.data.amountPtOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
