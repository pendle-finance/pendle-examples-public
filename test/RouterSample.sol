// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 as console } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";
import "@pendle/core-v2/contracts/interfaces/IPAllActionV3.sol";
import "@pendle/core-v2/contracts/interfaces/IPMarket.sol";
import "../src/StructGen.sol";

contract RouterSample is PRBTest, StdCheats, StructGen {
    IPAllActionV3 public constant router = IPAllActionV3(0x00000000005BBB0EF59571E58418F9a4357b68A0);
    IPMarket public constant market = IPMarket(0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2);
    address public constant wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;

    IStandardizedYield public SY;
    IPPrincipalToken public PT;
    IPYieldToken public YT;

    function setUp() public virtual {
        vm.createSelectFork({ urlOrAlias: "mainnet", blockNumber: 19_405_040 });

        (SY, PT, YT) = IPMarket(market).readTokens();

        deal(wstETH, address(this), 1e19);
        IERC20(wstETH).approve(address(router), type(uint256).max);
        IERC20(SY).approve(address(router), type(uint256).max);
        IERC20(PT).approve(address(router), type(uint256).max);
        IERC20(YT).approve(address(router), type(uint256).max);
        IERC20(market).approve(address(router), type(uint256).max);
    }

    function test_buy_and_sell_PT() external {
        (uint256 netPtOut,,) = router.swapExactTokenForPt(
            address(this), address(market), 0, defaultApprox, createTokenInputStruct(wstETH, 1e18), emptyLimit
        );
        console.log("netPtOut: %s", netPtOut);

        uint256 exactPtIn = netPtOut;
        (uint256 netTokenOut,,) = router.swapExactPtForToken(
            address(this), address(market), exactPtIn, createTokenOutputStruct(wstETH, 0), emptyLimit
        );

        console.log("netTokenOut: %s", netTokenOut);
    }

    function test_buy_and_sell_YT() external {
        (uint256 netYtOut,,) = router.swapExactTokenForYt(
            address(this), address(market), 0, defaultApprox, createTokenInputStruct(wstETH, 1e18), emptyLimit
        );
        console.log("netYtOut: %s", netYtOut);

        uint256 exactYtIn = netYtOut;
        (uint256 netTokenOut,,) = router.swapExactYtForToken(
            address(this), address(market), exactYtIn, createTokenOutputStruct(wstETH, 0), emptyLimit
        );

        console.log("netTokenOut: %s", netTokenOut);
    }

    function test_ZapIn_and_ZapOut() external {
        (uint256 netLpOut,,) = router.addLiquiditySingleToken(
            address(this), address(market), 0, defaultApprox, createTokenInputStruct(wstETH, 1e18), emptyLimit
        );

        console.log("netLpOut: %s", netLpOut);

        uint256 exactLpIn = netLpOut;
        (uint256 netTokenOut,,) = router.removeLiquiditySingleToken(
            address(this), address(market), exactLpIn, createTokenOutputStruct(wstETH, 0), emptyLimit
        );

        console.log("netTokenOut: %s", netTokenOut);
    }

    function test_ZeroPriceImpact_Zap() external {
        (uint256 netLpOut, uint256 netYtOut,,) = router.addLiquiditySingleTokenKeepYt(
            address(this), address(market), 0, 0, createTokenInputStruct(wstETH, 1e18)
        );

        console.log("netLpOut: %s, netYtOut: %s", netLpOut, netYtOut);
    }

    function test_swap_between_PT_and_YT() external {
        uint256 exactPtIn = 1e18;
        deal(address(PT), address(this), 1e18);

        (uint256 netYtOut,) = router.swapExactPtForYt(address(this), address(market), exactPtIn, 0, defaultApprox);

        console.log("netYtOut: %s", netYtOut);

        uint256 exactYtIn = netYtOut;

        (uint256 netPtOut,) = router.swapExactYtForPt(address(this), address(market), exactYtIn, 0, defaultApprox);

        console.log("netPtOut: %s", netPtOut);
    }

    function test_mint_redeem_SY() external {
        uint256 netSyOut = router.mintSyFromToken(address(this), address(SY), 0, createTokenInputStruct(wstETH, 1e18));

        console.log("netSyOut: %s", netSyOut);

        uint256 exactSyIn = netSyOut;

        uint256 netTokenOut =
            router.redeemSyToToken(address(this), address(SY), exactSyIn, createTokenOutputStruct(wstETH, 0));

        console.log("netTokenOut: %s", netTokenOut);
    }

    function test_mint_redeem_PT_and_YT() external {
        (uint256 netPyOut,) =
            router.mintPyFromToken(address(this), address(YT), 0, createTokenInputStruct(wstETH, 1e18));

        console.log("netPyOut: %s", netPyOut);

        uint256 exactPyIn = netPyOut;

        (uint256 netTokenOut,) =
            router.redeemPyToToken(address(this), address(YT), exactPyIn, createTokenOutputStruct(wstETH, 0));

        console.log("netTokenOut: %s", netTokenOut);
    }

    /// @dev use crvUSD market instead since wstETH doesn't have rewards
    function test_redeem_SY_YT_LP_interest_and_rewards() external {
        IStandardizedYield SYcrvUSD = IStandardizedYield(0x60D1AfD87c5Ab1a13E27638f1e75277fEbF4908C);
        IPYieldToken YTcrvUSD = IPYieldToken(0xAf86Da90A5C1e1a41Be3b944b16944081087b7Aa);
        IPMarket LPcrvUSD = IPMarket(0xBBd395D4820da5C89A3bCA4FA28Af97254a0FCBe);
        address marketCrvUSD = address(LPcrvUSD);

        deal(address(SYcrvUSD), address(this), 3e18);
        SYcrvUSD.approve(address(router), type(uint256).max);
        router.swapExactSyForYt(address(this), marketCrvUSD, 1e18, 0, defaultApprox, emptyLimit);
        router.addLiquiditySingleSy(address(this), marketCrvUSD, 1e18, 0, defaultApprox, emptyLimit);

        vm.warp(block.timestamp + 1 weeks);
        vm.roll(block.number + 1000);

        {
            // Redeem SY's rewards. No interest
            address[] memory rewardTokens = SYcrvUSD.getRewardTokens();
            uint256[] memory rewardAmounts = SYcrvUSD.claimRewards(address(this));

            assert(rewardTokens.length == 1);

            console.log("[SY] reward amount: %s %s", rewardAmounts[0], IERC20Metadata(rewardTokens[0]).symbol());
        }

        {
            // Redeem YT's rewards and interest
            address[] memory rewardTokens = YTcrvUSD.getRewardTokens();
            (uint256 interestAmount, uint256[] memory rewardAmounts) =
                YTcrvUSD.redeemDueInterestAndRewards(address(this), true, true);

            assert(rewardTokens.length == 1);

            console.log("[YT] interest amount: %s", interestAmount);
            console.log("[YT] reward amount: %s %s", rewardAmounts[0], IERC20Metadata(rewardTokens[0]).symbol());
        }

        {
            // Redeem LP's rewards and interest
            address[] memory rewardTokens = LPcrvUSD.getRewardTokens();
            uint256[] memory rewardAmounts = LPcrvUSD.redeemRewards(address(this));

            assert(rewardTokens.length == 2);
            console.log("[LP] reward amount: %s %s", rewardAmounts[0], IERC20Metadata(rewardTokens[0]).symbol());
            console.log("[LP] reward amount: %s %s", rewardAmounts[1], IERC20Metadata(rewardTokens[1]).symbol());
        }

        {
            // batch redeem

            address[] memory SYs = new address[](1);
            SYs[0] = address(SYcrvUSD);

            address[] memory YTs = new address[](1);
            YTs[0] = address(YTcrvUSD);

            address[] memory LPs = new address[](1);
            LPs[0] = address(LPcrvUSD);

            router.redeemDueInterestAndRewards(address(this), SYs, YTs, LPs);
        }
    }

    function test_multicall() external {
        bytes memory ptBuy = abi.encodeWithSelector(
            IPActionSwapPTV3.swapExactTokenForPt.selector,
            address(this),
            address(market),
            0,
            defaultApprox,
            createTokenInputStruct(wstETH, 1e18),
            emptyLimit
        );

        bytes memory ytBuy = abi.encodeWithSelector(
            IPActionSwapYTV3.swapExactTokenForYt.selector,
            address(this),
            address(market),
            0,
            defaultApprox,
            createTokenInputStruct(wstETH, 1e18),
            emptyLimit
        );

        IPActionMiscV3.Call3[] memory calls = new IPActionMiscV3.Call3[](2);
        calls[0] = IPActionMiscV3.Call3({ allowFailure: false, callData: ptBuy });
        calls[1] = IPActionMiscV3.Call3({ allowFailure: false, callData: ytBuy });

        IPActionMiscV3.Result[] memory res = router.multicall(calls);

        (uint256 netPtOut,,) = abi.decode(res[0].returnData, (uint256, uint256, uint256));
        (uint256 netYtOut,,) = abi.decode(res[1].returnData, (uint256, uint256, uint256));

        console.log("netPtOut: %s, netYtOut: %s", netPtOut, netYtOut);
    }

    function test_claim_rewards_any_tokens() external {
        address token = address(SY);

        try IPMarket(token).redeemRewards(address(this)) returns (uint256[] memory res1) {
            // it is market
        } catch {
            try IPYieldToken(token).redeemDueInterestAndRewards(address(this), true, true) returns (
                uint256, uint256[] memory res2
            ) {
                // it is YT
            } catch {
                IStandardizedYield(token).claimRewards(address(this));
                // it must be SY then
            }
        }
    }
}
