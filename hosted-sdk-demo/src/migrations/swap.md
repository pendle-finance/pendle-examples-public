# Swap
The examples below will swap tokens on Ethereum.

| Token | Address |
|--------|---------|
| stETH | `0xae7ab96520de3a18e5e111b5eaab095312d7fe84` |
| WETH | `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` |
| PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |
| YT | `0x04b7fa1e727d7290d6e24fa9b426d0c940283a95` |

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_swapV2

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| tokenIn | `<TOKEN_IN>` |
| tokenOut | `<TOKEN_OUT>` |
| amountIn | `<AMOUNT_IN>` |
| additionalData | `<ADDITIONAL_DATA>` |
| needScale | `<NEED_SCALE>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<TOKEN_IN>` |
| amountsIn | `<AMOUNT_IN>` |
| tokensOut | `<TOKEN_OUT>` |


Example: Swap 1 stETH for PT.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokenIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountIn=1000000000000000000&tokenOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&amountsIn=1000000000000000000&tokensOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c`