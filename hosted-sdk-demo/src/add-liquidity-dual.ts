import { CHAIN_ID, MARKET_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH } from "./constants";
import { callSDK, getSigner } from "./helper";
import { AddLiquidityDualData } from "./types";

export async function addLiquidityDualSyAndPt() {
    // Use 1 SY and 1 PT to add liquidity to wstETH pool with 1% slippage
    const res = await callSDK<AddLiquidityDualData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity-dual`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        amountTokenIn: '1000000000000000000',
        amountPtIn: '1000000000000000000',
    });

    console.log('Amount LP Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function addLiquidityDualTokenAndPt() {
    // USe 1 wstETH and 1 PT to add liquidity to wstETH pool with 1% slippage
    const res = await callSDK<AddLiquidityDualData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity-dual`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        amountTokenIn: '1000000000000000000',
        amountPtIn: '1000000000000000000',
    });

    console.log('Amount LP Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
