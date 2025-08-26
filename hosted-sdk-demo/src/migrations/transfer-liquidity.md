# Transfer Liquidity
The examples below will transfer liquidity between markets on Ethereum.

| Token | Address |
|--------|---------|
| Source LP | `0xa36b60a14a1a5247912584768c6e53e1a269a9f7` |
| Source PT | `0x9f56094c450763769ba0ea9fe2876070c0fd5f77` |
| Source YT | `0x029d6247adb0a57138c62e3019c92d3dfc9c1840` |
| Destination LP | `0x34280882267ffa6383b363e278b027be083bbe3b` |
| Destination PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |
| Destination YT | `0x04b7fa1e727d7290d6e24fa9b426d0c940283a95` |

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_transferLiquidityV2

## Transfer Liquidity no ZPI

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| dstMarket | `<DST_MARKET>` |
| lpAmount | `<LP_AMOUNT>` |
| ptAmount | `<PT_AMOUNT>` |
| ytAmount | `<YT_AMOUNT>` |
| redeemRewards | `<REDEEM_REWARDS>` |
| zpi | `false` or `undefined` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<SOURCE_PT_ADDRESS>,<SOURCE_YT_ADDRESS>,<SOURCE_LP_ADDRESS>` |
| amountsIn | `<PT_AMOUNT>,<YT_AMOUNT>,<LP_AMOUNT>` |
| tokensOut | `<DESTINATION_LP_ADDRESS>` |


Example: Transfer 1 PT, 1 YT, and 1 LP to new market.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/markets/0xa36b60a14a1a5247912584768c6e53e1a269a9f7/transfer-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&dstMarket=0x34280882267ffa6383b363e278b027be083bbe3b&ptAmount=1000000000000000000&ytAmount=1000000000000000000&lpAmount=1000000000000000000`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0x9f56094c450763769ba0ea9fe2876070c0fd5f77,0x029d6247adb0a57138c62e3019c92d3dfc9c1840,0xa36b60a14a1a5247912584768c6e53e1a269a9f7&amountsIn=1000000000000000000,1000000000000000000,1000000000000000000&tokensOut=0x34280882267ffa6383b363e278b027be083bbe3b`


## Transfer Liquidity ZPI

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| dstMarket | `<DST_MARKET>` |
| lpAmount | `<LP_AMOUNT>` |
| ptAmount | `<PT_AMOUNT>` |
| ytAmount | `<YT_AMOUNT>` |
| redeemRewards | `<REDEEM_REWARDS>` |
| zpi | `true` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<SOURCE_PT_ADDRESS>,<SOURCE_YT_ADDRESS>,<SOURCE_LP_ADDRESS>` |
| amountsIn | `<PT_AMOUNT>,<YT_AMOUNT>,<LP_AMOUNT>` |
| tokensOut | `<DESTINATION_LP_ADDRESS>,<DESTINATION_YT_ADDRESS>` |


Example: Transfer 1 PT, 1 YT, and 1 LP to new market, keep YT.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/markets/0xa36b60a14a1a5247912584768c6e53e1a269a9f7/transfer-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&dstMarket=0x34280882267ffa6383b363e278b027be083bbe3b&ptAmount=1000000000000000000&ytAmount=1000000000000000000&lpAmount=1000000000000000000&zpi=true`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0x9f56094c450763769ba0ea9fe2876070c0fd5f77,0x029d6247adb0a57138c62e3019c92d3dfc9c1840,0xa36b60a14a1a5247912584768c6e53e1a269a9f7&amountsIn=1000000000000000000,1000000000000000000,1000000000000000000&tokensOut=0x34280882267ffa6383b363e278b027be083bbe3b,0x04b7fa1e727d7290d6e24fa9b426d0c940283a95`