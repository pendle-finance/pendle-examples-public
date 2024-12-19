import { CHAIN_ID, MARKET_ADDRESS, RECEIVER_ADDRESS } from "./constants";
import { callSDK, getSigner } from "./helper";
import { RollOverPtData } from "./types";

const eETH_MARKET_ADDRESS = '0xe1f19cbda26b6418b0c8e1ee978a533184496066';

export async function rollOverPt() {
    // Transfer 1 PT eETH to wstETH PT with 1% slippage
    const res = await callSDK<RollOverPtData>(`/v1/sdk/${CHAIN_ID}/markets/${eETH_MARKET_ADDRESS}/roll-over-pt`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        dstMarket: MARKET_ADDRESS,
        ptAmount: '1000000000000000000',
    });

    console.log('Amount PT Out: ', res.data.amountPtOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
