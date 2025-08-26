# Add Liquidity
The examples below will add liquidity to the stETH (30 Dec 2027) Pool on Ethereum.

| Token | Address |
|--------|---------|
| Pool/LP | `0x34280882267ffa6383b363e278b027be083bbe3b` |
| SY | `0xcbc72d92b2dc8187414f6734718563898740c0bc` |
| PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |
| YT | `0x04b7fa1e727d7290d6e24fa9b426d0c940283a95` |
| stETH | `0xae7ab96520de3a18e5e111b5eaab095312d7fe84` |

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidityV2

## AddLiquidity no ZPI

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| tokenIn | `<TOKEN_IN>` |
| amountIn | `<AMOUNT_IN>` |
| zpi | `false` or `undefined` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<TOKEN_IN>` |
| amountsIn | `<AMOUNT_IN>` |
| tokensOut | `<LP_ADDRESS>` |


Example: Add liquidity 1 stETH to the pool.

Old query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000&zpi=false`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountsIn=1000000000000000000&tokensOut=0x34280882267ffa6383b363e278b027be083bbe3b`

## AddLiquidity ZPI

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| tokenIn | `<TOKEN_IN>` |
| amountIn | `<AMOUNT_IN>` |
| zpi | `true` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<TOKEN_IN>` |
| amountsIn | `<AMOUNT_IN>` |
| tokensOut | `<LP_ADDRESS>,<YT_ADDRESS>` |


Example: Add liquidity 1 stETH to the pool, keep YT.

Old query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000&zpi=true`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountsIn=1000000000000000000&tokensOut=0x34280882267ffa6383b363e278b027be083bbe3b,0x04b7fa1e727d7290d6e24fa9b426d0c940283a95`