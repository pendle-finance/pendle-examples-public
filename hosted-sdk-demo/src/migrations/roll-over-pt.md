# Roll Over PT
The examples below will roll over PT from sUSDe market to stETH market.

| Token | Address |
|--------|---------|
| Source LP | `0xa36b60a14a1a5247912584768c6e53e1a269a9f7` |
| Source PT | `0x9f56094c450763769ba0ea9fe2876070c0fd5f77` |
| Destination LP | `0x34280882267ffa6383b363e278b027be083bbe3b` |
| Destination PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_rollOverPtV2

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| dstMarket | `<DST_MARKET>` |
| ptAmount | `<PT_AMOUNT>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<SOURCE_PT_ADDRESS>` |
| amountsIn | `<PT_AMOUNT>` |
| tokensOut | `<DESTINATION_PT_ADDRESS>` |


Example: Roll over 1 PT to new market.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/markets/0xa36b60a14a1a5247912584768c6e53e1a269a9f7/roll-over-pt?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&dstMarket=0x34280882267ffa6383b363e278b027be083bbe3b&ptAmount=1000000000000000000`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0x9f56094c450763769ba0ea9fe2876070c0fd5f77&amountsIn=1000000000000000000&tokensOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c`