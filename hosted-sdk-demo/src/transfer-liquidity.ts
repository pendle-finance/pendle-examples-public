import { CHAIN_ID, MARKET_ADDRESS, RECEIVER_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { TransferLiquidityData } from "./types";

const eETH_MARKET_ADDRESS = '0x7d372819240d14fb477f17b964f95f33beb4c704';

export async function transferLiquidity() {
    // Transfer 1 LP from eETH pool to wstETH pool with 1% slippage
    const resp = await callSDK<TransferLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${eETH_MARKET_ADDRESS}/transfer-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        dstMarket: MARKET_ADDRESS,
        lpAmount: '1000000000000000000',
        ptAmount: '0',
        ytAmount: '0',
        // if not specified, it will use all aggregators, which costs more computing unit
        aggregators: 'kyberswap',
    });

    console.log('Amount LP Out: ', resp.data.data.amountLpOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(resp.data.tx);
}

export async function transferLiquidityKeepYt() {
    // Transfer 1 LP from eETH pool to wstETH pool (zero price impact mode) with 1% slippage
    const resp = await callSDK<TransferLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${eETH_MARKET_ADDRESS}/transfer-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        dstMarket: MARKET_ADDRESS,
        lpAmount: '1000000000000000000',
        ptAmount: '0',
        ytAmount: '0',
        zpi: true,
        // if not specified, it will use all aggregators, which costs more computing unit
        aggregators: 'kyberswap',
    });

    console.log('Amount LP Out: ', resp.data.data.amountLpOut);
    console.log('Amount YT Out: ', resp.data.data.amountYtOut);
    console.log('Price impact: ', resp.data.data.priceImpact);
    console.log('Computing unit: ', resp.headers['x-computing-unit']);

    // Send tx
    // getSigner().sendTransaction(res.tx);
}


transferLiquidity();
transferLiquidityKeepYt();
