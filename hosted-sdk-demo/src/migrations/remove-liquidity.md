# Remove Liquidity

The examples below will remove liquidity from the stETH (30 Dec 2027) Pool on Ethereum:

| Token | Address |
|--------|---------|
| Pool/LP | `0x34280882267ffa6383b363e278b027be083bbe3b` |
| SY | `0xcbc72d92b2dc8187414f6734718563898740c0bc` |
| PT | `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` |
| stETH | `0xae7ab96520de3a18e5e111b5eaab095312d7fe84` |

## removeLiquidityDualSyAndPt
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_removeLiquidityDual

- Pass the SY address into the `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    | receiverAddr | receiver |
    | amountLpToRemove | amountIn |

Example: Remove 1 LP to SY and PT.

Old query: `https://api-v2.pendle.finance/sdk/api/v1/removeLiquidityDualSyAndPt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountLpToRemove=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/remove-liquidity-dual?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&amountIn=1000000000000000000&tokenOut=0xcbc72d92b2dc8187414f6734718563898740c0bc`

## removeLiquidityDualTokenAndPt
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_removeLiquidityDual

- Pass the token address into the `tokenOut` parameter.
- Parameter changes:

    | Old | New |
    |-----|-----|
    | receiverAddr | receiver |
    | amountLpToRemove | amountIn |
    | tokenOutAddr | tokenOut |

Example: Remove 1 LP to stETH and PT.

Old query: `https://api-v2.pendle.finance/sdk/api/v1/removeLiquidityDualTokenAndPt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountLpToRemove=1000000000000000000&tokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/remove-liquidity-dual?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&amountIn=1000000000000000000&tokenOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`

## removeLiquiditySinglePt
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_removeLiquidity

- Pass the PT address into the `tokenOut` parameter.
- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    | receiverAddr | receiver |
    | amountLpToRemove | amountIn |

Example: Remove 1 LP to PT.

Old query: `https://api-v2.pendle.finance/sdk/api/v1/removeLiquiditySinglePt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountLpToRemove=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/remove-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&amountIn=1000000000000000000&tokenOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c`

## removeLiquiditySingleSy
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_removeLiquidity

- Pass the SY address into the `tokenOut` parameter.
- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    | receiverAddr | receiver |
    | amountLpToRemove | amountIn |

Example: Remove 1 LP to SY.

Old query: `https://api-v2.pendle.finance/sdk/api/v1/removeLiquiditySingleSy?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountLpToRemove=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/remove-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&amountIn=1000000000000000000&tokenOut=0xcbc72d92b2dc8187414f6734718563898740c0bc`

## removeLiquiditySingleToken
New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_removeLiquidity

- Pass the token address into the `tokenOut` parameter.
- If `tokenOut` is not an output token of SY stETH, set `enableAggregator` to `true`.
- If `impliedApy` is required in the API response, set `additionalData` to `impliedApy`.
- Parameter changes:

    | Old | New |
    |-----|-----|
    | receiverAddr | receiver |
    | amountLpToRemove | amountIn |
    | tokenOutAddr | tokenOut |

Example: Remove 1 LP to stETH.

Old query: `https://api-v2.pendle.finance/sdk/api/v1/removeLiquiditySingleToken?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&marketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&amountLpToRemove=1000000000000000000&tokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&syTokenOutAddr=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/remove-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&amountIn=1000000000000000000&tokenOut=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`