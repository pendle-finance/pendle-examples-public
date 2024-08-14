import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, wstETH, YT_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { SwapData } from "./types";

export async function swapPtToSy() {
    // Swap 1 PT to SY in wstETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: PT_ADDRESS,
        tokenOut: SY_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount SY Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function swapPtToToken() {
    // Swap 1 PT to wstETH in wstETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: PT_ADDRESS,
        tokenOut: wstETH,
        amountIn: '1000000000000000000'
    });

    console.log('Amount wstETH Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function swapSyToPt() {
    // Swap 1 SY to PT in wstETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        tokenOut: PT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount PT Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function swapSyToYt() {
    // Swap 1 SY to YT in wstETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        tokenOut: YT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount YT Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function swapTokenToYt() {
    // Swap 1 wstETH to YT in wstETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        tokenOut: YT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount YT Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function swapTokenToPt() {
    // Swap 1 wstETH to PT in wstETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        tokenOut: PT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount PT Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function swapYtToSy() {
    // Swap 1 YT to SY in wstETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: YT_ADDRESS,
        tokenOut: SY_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount SY Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function swapYtToToken() {
    // Swap 1 YT to wstETH in wstETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: YT_ADDRESS,
        tokenOut: wstETH,
        amountIn: '1000000000000000000'
    });

    console.log('Amount wstETH Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}