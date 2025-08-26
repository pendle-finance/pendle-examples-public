# Remove Liquidity
The examples below will remove liquidity from the stETH (30 Dec 2027) Pool on Ethereum.

| Token | Address |
|--------|---------|
| Pool/LP | `0x34280882267ffa6383b363e278b027be083bbe3b` |
| SY | `0xcbc72d92b2dc8187414f6734718563898740c0bc` |
| PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |
| stETH | `0xae7ab96520de3a18e5e111b5eaab095312d7fe84` |

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_removeLiquidityV2

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| amountIn | `<AMOUNT_IN>` |
| tokenOut | `<TOKEN_OUT>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<LP_ADDRESS>` |
| amountsIn | `<AMOUNT_IN>` |
| tokensOut | `<TOKEN_OUT>` |


Example: Remove 1 LP to get stETH.

Old query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/remove-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&amountIn=1000000000000000000&tokenOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0x34280882267ffa6383b363e278b027be083bbe3b&amountsIn=1000000000000000000&tokensOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`