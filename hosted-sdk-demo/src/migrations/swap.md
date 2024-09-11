# Swap

Examples below will swap tokens in stETH (30 Dec 2027) market on Ethereum: 

| Token | Address |
|--------|---------|
|Pool/LP|`0x34280882267ffa6383b363e278b027be083bbe3b`|
|SY|`0xcbc72d92b2dc8187414f6734718563898740c0bc`|
|PT|`0xb253eff1104802b97ac7e3ac9fdd73aece295a2c`|
|stETH|`0xae7ab96520de3a18e5e111b5eaab095312d7fe84`|

New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_swap

- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- If `effectiveApy` is required in the API response, set `additionalData` to `effectiveApy`.

## swapExactPtForSy

- Pass PT address into `tokenIn` parameter.
- Pass SY address into `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountPtIn|amountIn|

Example: Swap 1 PT to SY

Old query: `https://api-v2.pendle.finance/sdk/api/v1/swapExactPtForSy?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountPtIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c&tokenOut=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountIn=1000000000000000000`

## swapExactPtForToken

- Pass PT address into `tokenIn` parameter.
- Pass token address into `tokenOut` parameter.
- If `tokenOut` is not a output tokens of SY stETH, set `enableAggregator` to `true`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountPtIn|amountIn|

Example: Swap 1 PT to stETH

Old query: `https://api-v2.pendle.finance/sdk/api/v1/swapExactPtForToken?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountPtIn=1000000000000000000&tokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c&tokenOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000`

## swapExactSyForPt

- Pass SY address into `tokenIn` parameter.
- Pass PT address into `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountSyIn|amountIn|

Example: Swap 1 SY to PT

Old query: `https://api-v2.pendle.finance/sdk/api/v1/swapExactSyForPt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountSyIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&tokenOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c&amountIn=1000000000000000000`

## swapExactSyForYt

- Pass SY address into `tokenIn` parameter.
- Pass YT address into `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountSyIn|amountIn|

Example: Swap 1 SY to YT

Old query: `https://api-v2.pendle.finance/sdk/api/v1/swapExactSyForYt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountSyIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&tokenOut=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountIn=1000000000000000000`

## swapExactTokenForPt

- Pass token address into `tokenIn` parameter.
- If `tokenIn` is not a input tokens of the pool, set `enableAggregator` to `true`.
- Pass PT address into `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |tokenInAddr|tokenIn|
    |amountTokenIn|amountIn|

Example: Swap 1 stETH to PT

Old query: `https://api-v2.pendle.finance/sdk/api/v1/swapExactTokenForPt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&tokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountTokenIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&tokenOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c&amountIn=1000000000000000000`

## swapExactTokenForYt

- Pass token address into `tokenIn` parameter.
- If `tokenIn` is not a input tokens of the pool, set `enableAggregator` to `true`.
- Pass YT address into `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |tokenInAddr|tokenIn|
    |amountTokenIn|amountIn|

Example: Swap 1 stETH to YT

Old query: `https://api-v2.pendle.finance/sdk/api/v1/swapExactTokenForYt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&tokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountTokenIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&tokenOut=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountIn=1000000000000000000`

## swapExactYtForSy

- Pass YT address into `tokenIn` parameter.
- Pass SY address into `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountYtIn|amountIn|

Example: Swap 1 YT to SY

Old query: `https://api-v2.pendle.finance/sdk/api/v1/swapExactYtForSy?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountYtIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&tokenOut=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountIn=1000000000000000000`

## swapExactYtForToken

- Pass YT address into `tokenIn` parameter.
- Pass token address into `tokenOut` parameter.
- If `tokenOut` is not a output tokens of SY stETH, set `enableAggregator` to `true`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountYtIn|amountIn|
    |tokenOutAddr|tokenOut|

Example: Swap 1 YT to stETH

Old query: `https://api-v2.pendle.finance/sdk/api/v1/swapExactYtForToken?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountYtIn=1000000000000000000&tokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&tokenOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000`