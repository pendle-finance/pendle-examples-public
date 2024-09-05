import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callSDK, getSigner } from "./helper";
import { RemoveLiquidityData } from "./types";

export async function removeLiquiditySinglePt() {
    // Remove 1 LP from wstETH pool to PT with 1% slippage
    const res = await callSDK<RemoveLiquidityData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/remove-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenOut: PT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount PT Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function removeLiquiditySingleSy() {
    // Remove 1 LP from wstETH pool to SY with 1% slippage
    const res = await callSDK<RemoveLiquidityData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/remove-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenOut: SY_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount SY Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function removeLiquiditySingleToken() {
    // Remove 1 LP from wstETH pool to wstETH with 1% slippage
    const res = await callSDK<RemoveLiquidityData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/remove-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenOut: wstETH,
        amountIn: '1000000000000000000'
    });

    console.log('Amount wstETH Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
