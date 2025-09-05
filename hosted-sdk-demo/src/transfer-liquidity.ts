import { CHAIN_ID, MARKET_ADDRESS, RECEIVER_ADDRESS, YT_ADDRESS } from "./constants";
import { callConvertAPI, getSigner, printConvertOutput } from "./helper";

const sUSDe_MARKET_ADDRESS = '0xa36b60a14a1a5247912584768c6e53e1a269a9f7';
const sUSDe_PT_ADDRESS = '0x9f56094c450763769ba0ea9fe2876070c0fd5f77';
const sUSDe_YT_ADDRESS = '0x029d6247adb0a57138c62e3019c92d3dfc9c1840';

export async function transferLiquidity() {
    // Transfer 1 LP + 1 PT + 1 YT from sUSDe pool to wstETH pool with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: `${sUSDe_MARKET_ADDRESS},${sUSDe_PT_ADDRESS},${sUSDe_YT_ADDRESS}`, // LP + PT + YT
        amountsIn: '1000000000000000000,1000000000000000000,1000000000000000000',
        tokensOut: MARKET_ADDRESS, // Target LP
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        enableAggregator: true,
        aggregators: 'kyberswap',
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function transferLiquidityKeepYt() {
    // Transfer 1 LP from sUSDe pool to wstETH pool (zero price impact mode) with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: `${sUSDe_MARKET_ADDRESS},${sUSDe_PT_ADDRESS},${sUSDe_YT_ADDRESS}`, // LP + PT + YT
        amountsIn: '1000000000000000000,0,0',
        tokensOut: `${MARKET_ADDRESS},${YT_ADDRESS}`, // Target LP + YT (ZPI mode)
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        enableAggregator: true,
        aggregators: 'kyberswap',
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}


// transferLiquidity();
// transferLiquidityKeepYt();
