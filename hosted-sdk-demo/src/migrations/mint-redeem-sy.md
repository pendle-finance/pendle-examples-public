# Mint and Redeem SY
The examples below will mint SY from token, or redeem token from SY on Ethereum.

| Token | Address |
|--------|---------|
| SY | `0xcbc72d92b2dc8187414f6734718563898740c0bc` |
| stETH | `0xae7ab96520de3a18e5e111b5eaab095312d7fe84` |
| USDC | `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` |


## Mint SY

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_mintSyV2

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| sy | `<SY>` |
| tokenIn | `<TOKEN_IN>` |
| amountIn | `<AMOUNT_IN>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<TOKEN_IN>` |
| amountsIn | `<AMOUNT_IN>` |
| tokensOut | `<SY_ADDRESS>` |


Example: Mint SY from 1 stETH.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/mint-sy?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&sy=0xcbc72d92b2dc8187414f6734718563898740c0bc&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000`

New query: `https://api-v2.pendle.finance/core/v2/sdk/1/convert?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountsIn=1000000000000000000&tokensOut=0xcbc72d92b2dc8187414f6734718563898740c0bc`

## Redeem SY

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_redeemSyV2

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| sy | `<SY>` |
| amountIn | `<AMOUNT_IN>` |
| tokenOut | `<TOKEN_OUT>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<SY_ADDRESS>` |
| amountsIn | `<AMOUNT_IN>` |
| tokensOut | `<TOKEN_OUT>` |


Example: Redeem 1 SY to get USDC.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/redeem-sy?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&sy=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountIn=1000000000000000000&tokenOut=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&enableAggregator=true`

New query: `https://api-v2.pendle.finance/core/v2/sdk/1/convert?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountsIn=1000000000000000000&tokensOut=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&enableAggregator=true`