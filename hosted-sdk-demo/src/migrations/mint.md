# Mint PT & YT
Examples below will mint PT stETH (30 Dec 2027) and YT stETH (30 Dec 2027) on Ethereum

| Token | Address |
|--------|---------|
|SY|`0xcbc72d92b2dc8187414f6734718563898740c0bc`|
|PT|`0xb253eff1104802b97ac7e3ac9fdd73aece295a2c`|
|YT|`0x04b7fa1e727d7290d6e24fa9b426d0c940283a95`|
|stETH|`0xae7ab96520de3a18e5e111b5eaab095312d7fe84`|


## mintPyFromSy
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_mint

- Pass SY stETH address into `tokenIn` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |ytAddr|yt|
    |amountSyToMint|amountIn|

Example: Mint PT and YT from 1 SY

Old query: `https://api-v2.pendle.finance/sdk/api/v1/mintPyFromSy?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&ytAddr=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountSyToMint=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/mint?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&yt=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&tokenIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountIn=1000000000000000000`

## mintPyFromToken
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_mint

- Pass token address into `tokenIn` parameter.
- If `tokenIn` is not a input tokens of SY stETH, set `enableAggregator` to `true`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |ytAddr|yt|
    |tokenInAddr|tokenIn|
    |amountTokenIn|amountIn|

Example: Mint PT and YT from 1 stETH

Old query: `https://api-v2.pendle.finance/sdk/api/v1/mintPyFromToken?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&ytAddr=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&tokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenInAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountTokenIn=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/mint?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&yt=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000`