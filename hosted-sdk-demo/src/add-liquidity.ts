import { CHAIN_ID, MARKET_ADDRESS, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, USDC, wstETH } from "./constants";
import { callSDK, getSigner } from "./helper";
import { AddLiquidityData } from "./types";

export async function addLiquiditySinglePt() {
    // Use 1 PT to add liquidity to wstETH pool with 1% slippage
    const resp = await callSDK<AddLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: PT_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount LP Out: ', resp.data.data.amountLpOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function addLiquiditySingleSy() {
    // Use 1 SY to add liquidity to wstETH pool with 1% slippage
    const resp = await callSDK<AddLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        amountIn: '1000000000000000000',
    });

    console.log('Amount LP Out: ', resp.data.data.amountLpOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function addLiquiditySingleSyKeepYt() {
    // Use 1 SY to add liquidity to wstETH pool (zero price impact mode) with 1% slippage
    const resp = await callSDK<AddLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: SY_ADDRESS,
        amountIn: '1000000000000000000',
        zpi: true,
    });

    console.log('Amount LP Out: ', resp.data.data.amountLpOut);
    console.log('Amount YT Out: ', resp.data.data.amountYtOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function addLiquiditySingleToken() {
    // Use 1 wstETH to add liquidity to wstETH pool with 1% slippage
    const resp = await callSDK<AddLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        amountIn: '1000000000000000000'
    });

    console.log('Amount LP Out: ', resp.data.data.amountLpOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function addLiquiditySingleTokenKeepYt() {
    // Use 1 wstETH to add liquidity to wstETH pool (zero price impact mode) with 1% slippage
    const resp = await callSDK<AddLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: wstETH,
        amountIn: '1000000000000000000',
        zpi: true,
    });

    console.log('Amount LP Out: ', resp.data.data.amountLpOut);
    console.log('Amount YT Out: ', resp.data.data.amountYtOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}


// addLiquiditySinglePt();
// addLiquiditySingleSy();
// addLiquiditySingleSyKeepYt();
// addLiquiditySingleToken();
// addLiquiditySingleTokenKeepYt();
