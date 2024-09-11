# Add Liquidity
Examples below will add liquidity to stETH (30 Dec 2027) Pool on Ethereum

| Token | Address |
|--------|---------|
|Pool/LP|`0x34280882267ffa6383b363e278b027be083bbe3b`|
|SY|`0xcbc72d92b2dc8187414f6734718563898740c0bc`|
|PT|`0xb253eff1104802b97ac7e3ac9fdd73aece295a2c`|
|stETH|`0xae7ab96520de3a18e5e111b5eaab095312d7fe84`|


## addLiquidityDualSyAndPt
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidityDual

- Pass SY address into `tokenIn` parameter
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountSyDesired|amountTokenIn|
    |amountPtDesired|amountPtIn|

Example: Add liquidity 1 SY and 1 PT to the pool

Old query: `https://api-v2.pendle.finance/sdk/api/v1/addLiquidityDualSyAndPt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountSyDesired=1000000000000000000&amountPtDesired=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity-dual?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountTokenIn=1000000000000000000&amountPtIn=1000000000000000000`

## addLiquidityDualTokenAndPt
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidityDual

- Pass token address into `tokenIn` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |tokenInAddr|tokenIn|
    |amountTokenDesired|amountTokenIn|
    |amountPtDesired|amountPtIn|

Example: Add liquidity 1 stETH and 1 PT to the pool

Old query: `https://api-v2.pendle.finance/sdk/api/v1/addLiquidityDualTokenAndPt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&tokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountTokenDesired=1000000000000000000&amountPtDesired=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity-dual?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountTokenIn=1000000000000000000&amountPtIn=1000000000000000000`

## addLiquiditySinglePt
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidity

- Pass PT address into `tokenIn` parameter.
- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountPtIn|amountIn|

Example: Add liquidity 1 PT to the pool

Old query: `https://api-v2.pendle.finance/sdk/api/v1/addLiquiditySinglePt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountPtIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c&amountIn=1000000000000000000`

## addLiquiditySingleSy
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidity

- Pass SY address into `tokenIn` parameter.
- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountSyIn|amountIn|

Example: Add liquidity 1 SY to the pool

Old query: `https://api-v2.pendle.finance/sdk/api/v1/addLiquiditySingleSy?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountSyIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountIn=1000000000000000000`

## addLiquiditySingleSyKeepYt
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidity

- Pass SY address into `tokenIn` parameter.
- Set `zpi` to `true`.
- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |amountSyIn|amountIn|


Example: Add liquidity 1 SY to the pool and keep YT

Old query: `https://api-v2.pendle.finance/sdk/api/v1/addLiquiditySingleSyKeepYt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountSyIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountIn=1000000000000000000&zpi=true`

## addLiquiditySingleToken
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidity

- Pass token address into `tokenIn` paramter.
- If `tokenIn` is not a input tokens of the pool, set `enableAggregator` to `true`.
- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |tokenInAddr|tokenIn|
    |amountTokenIn|amountIn|

Example: Add liquidity 1 stETH to the pool

Old query: `https://api-v2.pendle.finance/sdk/api/v1/addLiquiditySingleToken?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&tokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountTokenIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000&zpi=false`

## addLiquiditySingleTokenKeepYt
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidity

- Pass token address into `tokenIn` paramter.
- Set `zpi` to `true`. 
- If `tokenIn` is not a input tokens of the pool, set `enableAggregator` to `true`.
- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |tokenInAddr|tokenIn|
    |amountTokenIn|amountIn|

Example: Add liquidity 1 stETH to the pool and keep YT

Old query: `https://api-v2.pendle.finance/sdk/api/v1/addLiquiditySingleTokenKeepYt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&tokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountTokenIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000&zpi=true`