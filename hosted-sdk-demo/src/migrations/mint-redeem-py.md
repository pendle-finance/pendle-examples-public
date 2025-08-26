# Mint and Redeem PY
The examples below will mint PT and YT from SY, and redeem PT and YT to USDC.

| Token | Address |
|--------|---------|
| SY | `0xcbc72d92b2dc8187414f6734718563898740c0bc` |
| PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |
| YT | `0x04b7fa1e727d7290d6e24fa9b426d0c940283a95` |
| USDC | `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` |

## Mint PY

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_mintV2

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| yt | `<YT>` |
| tokenIn | `<TOKEN_IN>` |
| amountIn | `<AMOUNT_IN>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<TOKEN_IN>` |
| amountsIn | `<AMOUNT_IN>` |
| tokensOut | `<PT_ADDRESS>,<YT_ADDRESS>` |


Example: Mint PT and YT from 1 SY.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/mint?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&yt=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&tokenIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountIn=1000000000000000000`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xcbc72d92b2dc8187414f6734718563898740c0bc&amountsIn=1000000000000000000&tokensOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c,0x04b7fa1e727d7290d6e24fa9b426d0c940283a95`

## Redeem PY

Old API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_redeemV2

Parameter changes:

- Old parameters

| Parameter | Value |
|-----------|-------|
| yt | `<YT>` |
| amountIn | `<AMOUNT_IN>` |
| tokenOut | `<TOKEN_OUT>` |

- New parameters:

| Parameter | Value |
|-----------|-------|
| tokensIn | `<PT_ADDRESS>,<YT_ADDRESS>` |
| amountsIn | `<AMOUNT_IN>,<AMOUNT_IN>` |
| tokensOut | `<TOKEN_OUT>` |


Example: Redeem 1 YT + 1 PT to get USDC.

Old query: `https://api-v2.pendle.finance/core/v2/sdk/1/redeem?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&yt=0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountIn=1000000000000000000&tokenOut=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&enableAggregator=true`

New query: `http://localhost:9000/v1/sdk/1/router-actions?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&tokensIn=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c,0x04b7fa1e727d7290d6e24fa9b426d0c940283a95&amountsIn=1000000000000000000,1000000000000000000&tokensOut=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&enableAggregator=true`