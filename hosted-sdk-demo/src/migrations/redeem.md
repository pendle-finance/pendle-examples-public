# Redeem PT & YT
Examples below will redeem PT stETH (30 Dec 2027) and YT stETH (30 Dec 2027) on Ethereum

| Token | Address |
|--------|---------|
|SY|`0xcbc72d92b2dc8187414f6734718563898740c0bc`|
|PT|`0xb253eff1104802b97ac7e3ac9fdd73aece295a2c`|
|YT|`0x04b7fa1e727d7290d6e24fa9b426d0c940283a95`|
|stETH|`0xae7ab96520de3a18e5e111b5eaab095312d7fe84`|

## redeemPyToSy
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_redeem

- Pass SY stETH address into `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |ytAddr|yt|
    |amountPyToRedeem|amountIn|

Example: Redeem 1 PT and 1 YT to SY

Old query: `https://api-v2.pendle.finance/sdk/api/v1/redeemPyToSy?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&ytAddr=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountPyToRedeem=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/redeem?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&yt=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountIn=1000000000000000000&tokenOut=0xcbc72d92b2dc8187414f6734718563898740c0bc`

## redeemPyToToken
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_redeem

- Pass token address into `tokenOut` parameter.
- If `tokenOut` is not a output tokens of SY stETH, set `enableAggregator` to `true`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |ytAddr|yt|
    |amountPyIn|amountIn|

Example: Redeem 1 PT and 1 YT from to stETH

Old query: `https://api-v2.pendle.finance/sdk/api/v1/redeemPyToToken?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&ytAddr=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountPyIn=1000000000000000000&tokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&slippage=0.001`


New query: `https://api-v2.pendle.finance/core/v1/sdk/1/redeem?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&yt=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountIn=1000000000000000000&tokenOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`