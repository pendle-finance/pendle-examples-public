# Exit Market
The examples below will exit the market for stETH (30 Dec 2027) Pool on Ethereum.

| Token | Address |
|--------|---------|
| Pool/LP | `0x34280882267ffa6383b363e278b027be083bbe3b` |
| SY | `0xcbc72d92b2dc8187414f6734718563898740c0bc` |
| PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |
| YT | `0x04b7fa1e727d7290d6e24fa9b426d0c940283a95` |
| stETH | `0xae7ab96520de3a18e5e111b5eaab095312d7fe84` |

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_exitMarketV2

## Exit Market

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| ptAmount | `<PT_AMOUNT>` |
| ytAmount | `<YT_AMOUNT>` |
| lpAmount | `<LP_AMOUNT>` |
| tokenOut | `<TOKEN_OUT>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<PT_ADDRESS>,<YT_ADDRESS>,<LP_ADDRESS>` |
| amountsIn | `<PT_AMOUNT>,<YT_AMOUNT>,<LP_AMOUNT>` |
| tokensOut | `<TOKEN_OUT>` |


Example: Exit market with 1 PT, 1 YT, and 1 LP to get stETH.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/exit-positions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&ptAmount=1000000000000000000&ytAmount=1000000000000000000&lpAmount=1000000000000000000&tokenOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`

New query: `https://api-v2.pendle.finance/core/v2/sdk/1/convert?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c,0x04b7fa1e727d7290d6e24fa9b426d0c940283a95,0x34280882267ffa6383b363e278b027be083bbe3b&amountsIn=1000000000000000000,1000000000000000000,1000000000000000000&tokensOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`

## Exit Market Only PT + LP

If the amount of an input token is `0`, the token and the corresponding amount can be omitted from `tokensIn` and `amountsIn` respectively.

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| ptAmount | `<PT_AMOUNT>` |
| ytAmount | `0` |
| lpAmount | `<LP_AMOUNT>` |
| tokenOut | `<TOKEN_OUT>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<PT_ADDRESS>,<LP_ADDRESS>` |
| amountsIn | `<PT_AMOUNT>,<LP_AMOUNT>` |
| tokensOut | `<TOKEN_OUT>` |


Example: Exit market with 1 PT, 1 YT, and 1 LP to get stETH.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/exit-positions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&ptAmount=1000000000000000000&ytAmount=0&lpAmount=1000000000000000000&tokenOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`

New query: `https://api-v2.pendle.finance/core/v2/sdk/1/convert?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c,0x34280882267ffa6383b363e278b027be083bbe3b&amountsIn=1000000000000000000,1000000000000000000&tokensOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`