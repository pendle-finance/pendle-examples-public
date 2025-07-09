import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, USDC, wstETH, YT_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { SwapData } from "./types";

export async function swapPtToSy() {
    // Swap 1 PT to SY in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: PT_ADDRESS,
        tokenOut: SY_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount SY Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function swapPtToToken() {
    // Swap 1 PT to wstETH in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: PT_ADDRESS,
        tokenOut: wstETH,
        amountIn: '1000000000000000000'
    });

    console.log('Amount wstETH Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function swapSyToPt() {
    // Swap 1 SY to PT in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        tokenOut: PT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount PT Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function swapSyToYt() {
    // Swap 1 SY to YT in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        tokenOut: YT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount YT Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function swapTokenToYt() {
    // Swap 1 wstETH to YT in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        tokenOut: YT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount YT Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function swapTokenToPt() {
    // Swap 1 wstETH to PT in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        tokenOut: PT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount PT Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function swapYtToSy() {
    // Swap 1 YT to SY in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: YT_ADDRESS,
        tokenOut: SY_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount SY Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function swapYtToToken() {
    // Swap 1 YT to wstETH in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: YT_ADDRESS,
        tokenOut: wstETH,
        amountIn: '1000000000000000000'
    });

    console.log('Amount wstETH Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

// enable aggregator

export async function swapTokenToPtUsingAggregation() {
    // Swap 1000 USDC to PT in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: USDC,
        tokenOut: PT_ADDRESS,
        // USDC has 6 decimals
        amountIn: (1000n * 10n ** 6n).toString(),
        // enable aggregator, else it will throw an error because USDC could not be directly swapped to PT
        enableAggregator: true,
        // if not specified, it will use all aggregators, which costs more computing unit
        aggregators: 'kyberswap',
    });

    console.log('Amount PT Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}


export async function swapPtToTokenUsingAggregation() {
    // Swap 1 PT to USDC in wstETH market with 1% slippage
    const resp = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: PT_ADDRESS,
        tokenOut: USDC,
        amountIn: '1000000000000000000',
        // enable aggregator
        enableAggregator: true,
        // if not specified, it will use all aggregators, which costs more computing unit
        aggregators: 'kyberswap',
    });

    console.log('Amount USDC Out: ', resp.data.data.amountOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}


// swapPtToSy();
// swapPtToToken();
// swapSyToPt();
// swapSyToYt();
// swapTokenToYt();
// swapTokenToPt();
// swapYtToSy();
// swapYtToToken();

// swapTokenToPtUsingAggregation();
// swapPtToTokenUsingAggregation();
