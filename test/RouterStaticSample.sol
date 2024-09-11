// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 as console } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";
import "@pendle/core-v2/contracts/interfaces/IPAllActionV3.sol";
import "@pendle/core-v2/contracts/interfaces/IPRouterStatic.sol";
import "@pendle/core-v2/contracts/interfaces/IPMarket.sol";
import "../src/StructGen.sol";

contract RouterStaticSample is PRBTest, StdCheats, StructGen {
    IPRouterStatic public constant router = IPRouterStatic(0x263833d47eA3fA4a30f269323aba6a107f9eB14C);
    IPMarket public constant market = IPMarket(0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2);
    address public constant wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;

    IStandardizedYield public SY;
    IPPrincipalToken public PT;
    IPYieldToken public YT;

    function setUp() public virtual {
        vm.createSelectFork({ urlOrAlias: "mainnet", blockNumber: 19_405_040 });
        (SY, PT, YT) = IPMarket(market).readTokens();
    }

    /// @dev RouterStatic is not audited, to be used for off-chain purposes only
    function test_swap_SY_and_PT_YT() external view {
        (uint256 netPtOut,,,) = router.swapExactSyForPtStatic(address(market), 1e18);
        console.log("swapExactSyForPtStatic: exactSyIn: %s netPtOut: %s", 1e18, netPtOut);

        (uint256 netSyOut,,,) = router.swapExactPtForSyStatic(address(market), 1e18);
        console.log("swapExactPtForSyStatic: exactPtIn: %s netSyOut: %s", 1e18, netSyOut);

        (uint256 netYtOut,,,) = router.swapExactSyForYtStatic(address(market), 1e18);
        console.log("swapExactSyForYtStatic: exactSyIn: %s netYtOut: %s", 1e18, netYtOut);

        (uint256 netSyOut2,,,,,,) = router.swapExactYtForSyStatic(address(market), 1e18);
        console.log("swapExactYtForSyStatic: exactYtIn: %s netSyOut: %s", 1e18, netSyOut2);
    }

    /// @dev SY-wstETH and wstETH is 1-1 wrap so all functions on wstETH will return same results as SY. If you really
    /// need token to PT-YT, it's only recommended to use the ibToken (that SY wraps 1-1)
    /// @dev RouterStatic is not audited, to be used for off-chain purposes only
    function test_swap_ibToken_and_PT_YT() external view {
        (uint256 netPtOut,,,,) = router.swapExactTokenForPtStatic(address(market), wstETH, 1e18);
        console.log("swapExactTokenForPtStatic: exactTokenIn: %s wstETH netPtOut: %s", 1e18, netPtOut);

        (uint256 netTokenOut,,,,) = router.swapExactPtForTokenStatic(address(market), 1e18, wstETH);
        console.log("swapExactPtForTokenStatic: exactPtIn: %s netTokenOut: %s wstETH", 1e18, netTokenOut);

        (uint256 netYtOut,,,,) = router.swapExactTokenForYtStatic(address(market), wstETH, 1e18);
        console.log("swapExactTokenForYtStatic: exactTokenIn: %s wstETH netYtOut: %s", 1e18, netYtOut);

        (uint256 netTokenOut2,,,,,,,) = router.swapExactYtForTokenStatic(address(market), 1e18, wstETH);
        console.log("swapExactYtForTokenStatic: exactYtIn: %s netTokenOut: %s wstETH", 1e18, netTokenOut2);
    }

    /// @dev As most underlying protocols do not provide previewMint / previewRedeem for their yield tokens, all swaps
    /// involving these tokens are a best effort estimation. This is strictly intended for off-chain purposes in Pendle.
    /// For more information, please refer to the StandardizedYield document on docs.pendle.finance.
    /// @dev RouterStatic is not audited, to be used for off-chain purposes only
    function test_swap_raw_token_and_PT_YT() external view {
        (uint256 netPtOut,,,,) = router.swapExactTokenForPtStatic(address(market), address(0), 1e18);
        console.log("swapExactTokenForPtStatic: exactTokenIn: %s ETH netPtOut: %s", 1e18, netPtOut);

        // wstETH can't be redeemed directly to ETH
        // (uint256 netTokenOut,,,,) = router.swapExactPtForTokenStatic(address(market), 1e18, address(0));

        (uint256 netYtOut,,,,) = router.swapExactTokenForYtStatic(address(market), address(0), 1e18);
        console.log("swapExactTokenForYtStatic: exactTokenIn: %s ETH netYtOut: %s", 1e18, netYtOut);

        // wstETH can't be redeemed directly to ETH
        // (uint256 netTokenOut2,,,,,,,) = router.swapExactYtForTokenStatic(address(market), 1e18, address(0));
    }
}
