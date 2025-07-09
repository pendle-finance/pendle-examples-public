import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callSDK, getSigner } from "./helper";
import { RemoveLiquidityData } from "./types";

export async function removeLiquiditySinglePt() {
    // Remove 1 LP from wstETH pool to PT with 1% slippage
    const resp = await callSDK<RemoveLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/remove-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenOut: PT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount PT Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function removeLiquiditySingleSy() {
    // Remove 1 LP from wstETH pool to SY with 1% slippage
    const resp = await callSDK<RemoveLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/remove-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenOut: SY_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount SY Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function removeLiquiditySingleToken() {
    // Remove 1 LP from wstETH pool to wstETH with 1% slippage
    const resp = await callSDK<RemoveLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/remove-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenOut: wstETH,
        amountIn: '1000000000000000000'
    });

    console.log('Amount wstETH Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}


// removeLiquiditySinglePt();
// removeLiquiditySingleSy();
// removeLiquiditySingleToken();
