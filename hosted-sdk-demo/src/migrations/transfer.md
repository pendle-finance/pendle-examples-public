# Transfer

## Transfer liquidity

New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_transferLiquidity

- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |dstMarketAddr|dstMarket|
    |zeroPriceImpact|zpi|

Example: Transfer 1 LP, 1 PT and 1 YT from stETH (26 Dec 2024) `0xd0354d4e7bcf345fb117cabe41acadb724eccca2` to LP stETH (30 Dec 2027) `0x34280882267ffa6383b363e278b027be083bbe3b`

Old query: `https://api-v2.pendle.finance/sdk/api/v1/transferLiquidity?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&srcMarketAddr=0xd0354d4e7bcf345fb117cabe41acadb724eccca2&dstMarketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&lpAmount=1000000000000000000&ptAmount=1000000000000000000&ytAmount=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0xd0354d4e7bcf345fb117cabe41acadb724eccca2/transfer-liquidity?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&dstMarket=0x34280882267ffa6383b363e278b027be083bbe3b&lpAmount=1000000000000000000&ptAmount=1000000000000000000&ytAmount=1000000000000000000&redeemRewards=false&zpi=false`

## Roll over PT

New API docs: https://api-v2.pendle.finance/core/docs#/SDK/SdkController_rollOverPt

- Parameter changes:

    | Old | New |
    |-----|-----|
    |receiverAddr|receiver|
    |dstMarketAddr|dstMarket|
    |zeroPriceImpact|zpi|

Example: Roll over 1 PT from stETH (29 Jun 2023) `0x9ec4c502d989f04ffa9312c9d6e3f872ec91a0f9` to PT stETH (30 Dec 2027) `0x34280882267ffa6383b363e278b027be083bbe3b`

Old query: `https://api-v2.pendle.finance/sdk/api/v1/rollOverPt?chainId=1&receiverAddr=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&srcMarketAddr=0x9ec4c502d989f04ffa9312c9d6e3f872ec91a0f9&dstMarketAddr=0x34280882267ffa6383b363e278b027be083bbe3b&ptAmount=1000000000000000000&slippage=0.001`

New query: `https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x9ec4c502d989f04ffa9312c9d6e3f872ec91a0f9/roll-over-pt?receiver=0xbD525dfF925DF9c063C77B29d5Eec8f977B79476&slippage=0.001&dstMarket=0x34280882267ffa6383b363e278b027be083bbe3b&ptAmount=1000000000000000000`