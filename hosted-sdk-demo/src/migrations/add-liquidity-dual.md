# Add Liquidity Dual
The examples below will add liquidity to the stETH (30 Dec 2027) Pool on Ethereum.

| Token | Address |
|--------|---------|
| Pool/LP | `0x34280882267ffa6383b363e278b027be083bbe3b` |
| SY | `0xcbc72d92b2dc8187414f6734718563898740c0bc` |
| PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |
| stETH | `0xae7ab96520de3a18e5e111b5eaab095312d7fe84` |

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidityDual

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| tokenIn | `<TOKEN_IN>` |
| amountTokenIn | `<AMOUNT_TOKEN_IN>` |
| amountPtIn | `<AMOUNT_PT_IN>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<TOKEN_IN>,<PT_ADDRESS>` |
| amountsIn | `<AMOUNT_TOKEN_IN>,<AMOUNT_PT_IN>` |
| tokensOut | `<MARKET_ADDRESS>` |


Example: Add liquidity 1 SY and 1 PT to the pool.

Old query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity-dual?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountTokenIn=1000000000000000000&amountPtIn=1000000000000000000`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xcbc72d92b2dc8187414f6734718563898740c0bc,0xb253eff1104802b97ac7e3ac9fdd73aece295a2c&amountsIn=1000000000000000000,1000000000000000000&tokensOut=0x34280882267ffa6383b363e278b027be083bbe3b`