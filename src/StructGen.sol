// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import "@pendle/core-v2/contracts/interfaces/IPAllActionV3.sol";
import "@pendle/core-v2/contracts/interfaces/IPMarket.sol";

abstract contract StructGen {
    // EmptySwap means no swap aggregator is involved
    SwapData public emptySwap;

    // EmptyLimit means no limit order is involved
    LimitOrderData public emptyLimit;

    // DefaultApprox means no off-chain preparation is involved, more gas consuming (~ 180k gas)
    ApproxParams public defaultApprox = ApproxParams(0, type(uint256).max, 0, 256, 1e14);

    /// @notice create a simple TokenInput struct without using any aggregators. For more info please refer to
    /// IPAllActionTypeV3.sol
    function createTokenInputStruct(address tokenIn, uint256 netTokenIn) internal view returns (TokenInput memory) {
        return TokenInput({
            tokenIn: tokenIn,
            netTokenIn: netTokenIn,
            tokenMintSy: tokenIn,
            pendleSwap: address(0),
            swapData: emptySwap
        });
    }

    /// @notice create a simple TokenOutput struct without using any aggregators. For more info please refer to
    /// IPAllActionTypeV3.sol
    function createTokenOutputStruct(
        address tokenOut,
        uint256 minTokenOut
    )
        internal
        view
        returns (TokenOutput memory)
    {
        return TokenOutput({
            tokenOut: tokenOut,
            minTokenOut: minTokenOut,
            tokenRedeemSy: tokenOut,
            pendleSwap: address(0),
            swapData: emptySwap
        });
    }
}
