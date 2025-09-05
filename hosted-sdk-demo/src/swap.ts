import { CHAIN_ID, PT_ADDRESS, RECEIVER_ADDRESS, SY_ADDRESS, USDC, wstETH, YT_ADDRESS } from "./constants";
import { callConvertAPI, getSigner, printConvertOutput } from "./helper";

export async function swapPtToSy() {
    // Swap 1 PT to SY in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: PT_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: SY_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function swapPtToToken() {
    // Swap 1 PT to wstETH in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: PT_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: wstETH,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function swapSyToPt() {
    // Swap 1 SY to PT in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: SY_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: PT_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function swapSyToYt() {
    // Swap 1 SY to YT in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: SY_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: YT_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function swapTokenToYt() {
    // Swap 1 wstETH to YT in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: wstETH,
        amountsIn: '1000000000000000000',
        tokensOut: YT_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function swapTokenToPt() {
    // Swap 1 wstETH to PT in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: wstETH,
        amountsIn: '1000000000000000000',
        tokensOut: PT_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function swapYtToSy() {
    // Swap 1 YT to SY in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: YT_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: SY_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

export async function swapYtToToken() {
    // Swap 1 YT to wstETH in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: YT_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: wstETH,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}

// enable aggregator

export async function swapTokenToPtUsingAggregation() {
    // Swap 1000 USDC to PT in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: USDC,
        // USDC has 6 decimals
        amountsIn: (1000n * 10n ** 6n).toString(),
        tokensOut: PT_ADDRESS,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        // enable aggregator, else it will throw an error because USDC could not be directly swapped to PT
        enableAggregator: true,
        // if not specified, it will use all aggregators, which costs more computing unit
        aggregators: 'kyberswap',
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
}


export async function swapPtToTokenUsingAggregation() {
    // Swap 1 PT to USDC in wstETH market with 1% slippage
    const resp = await callConvertAPI(CHAIN_ID, {
        tokensIn: PT_ADDRESS,
        amountsIn: '1000000000000000000',
        tokensOut: USDC,
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        // enable aggregator
        enableAggregator: true,
        additionalData: 'impliedApy,effectiveApy'
    });

    printConvertOutput(resp);

    // Send tx
    // getSigner().sendTransaction(resp.data.routes[0].tx);
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
