import { CHAIN_ID, MARKET_ADDRESS, RECEIVER_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { TransferLiquidityData } from "./types";

const eETH_MARKET_ADDRESS = '0x7d372819240d14fb477f17b964f95f33beb4c704';

export async function transferLiquidity() {
    // Transfer 1 LP from eETH pool to wstETH pool with 1% slippage
    const res = await callSDK<TransferLiquidityData>(`/v1/sdk/${CHAIN_ID}/markets/${eETH_MARKET_ADDRESS}/transfer-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        dstMarket: MARKET_ADDRESS,
        lpAmount: '1000000000000000000',
        ptAmount: '0',
        ytAmount: '0',
    });

    console.log('Amount LP Out: ', res.data.amountLpOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function transferLiquidityKeepYt() {
    // Transfer 1 LP from eETH pool to wstETH pool (zero price impact mode) with 1% slippage
    const res = await callSDK<TransferLiquidityData>(`/v1/sdk/${CHAIN_ID}/markets/${eETH_MARKET_ADDRESS}/transfer-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        dstMarket: MARKET_ADDRESS,
        lpAmount: '1000000000000000000',
        ptAmount: '0',
        ytAmount: '0',
        zpi: true,
    });

    console.log('Amount LP Out: ', res.data.amountLpOut);
    console.log('Amount YT Out: ', res.data.amountYtOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
