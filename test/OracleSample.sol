// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 as console } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";
import "@pendle/core-v2/contracts/interfaces/IPAllActionV3.sol";
import "@pendle/core-v2/contracts/interfaces/IPMarket.sol";
import "@pendle/core-v2/contracts/oracles/PendlePtLpOracle.sol";
import "../src/StructGen.sol";
import { AggregatorV2V3Interface as IChainlinkAggregator } from
    "@chainlink/contracts/src/v0.8/interfaces/AggregatorV2V3Interface.sol";

contract OracleSample is PRBTest, StdCheats, StructGen {
    using PendlePtOracleLib for IPMarket;
    using PendleLpOracleLib for IPMarket;

    IPMarket public constant market = IPMarket(0xE11f9786B06438456b044B3E21712228ADcAA0D1);
    PendlePtLpOracle public constant oracle = PendlePtLpOracle(0x1Fd95db7B7C0067De8D45C0cb35D59796adfD187);
    IChainlinkAggregator public constant feed = IChainlinkAggregator(0xA736eAe8805dDeFFba40cAB8c99bCB309dEaBd9B); // weETH
        // to ETH, Redstone
    uint8 public feedDecimals;

    uint32 public constant twapDuration = 900;

    IStandardizedYield public SY;
    IPPrincipalToken public PT;
    IPYieldToken public YT;

    function setUp() public virtual {
        vm.createSelectFork({ urlOrAlias: "arbitrum", blockNumber: 192_001_277 });
        (SY, PT, YT) = IPMarket(market).readTokens();
        _test_oracle_ready(address(market), twapDuration);
        feedDecimals = uint8(feed.decimals());
    }

    function test_get_prices_use_library() external view {
        uint256 ptRateInEEth = IPMarket(market).getPtToAssetRate(twapDuration);
        console.log("1 PT = %s eEth (base 1e18)", ptRateInEEth);

        uint256 ptRateInWeEth = IPMarket(market).getPtToSyRate(twapDuration);
        console.log("1 PT = %s weEth (base 1e18)", ptRateInWeEth);

        uint256 lpRateInEEth = IPMarket(market).getLpToAssetRate(twapDuration);
        console.log("1 LP = %s eEth (base 1e18)", lpRateInEEth);

        uint256 lpRateInWeEth = IPMarket(market).getLpToSyRate(twapDuration);
        console.log("1 LP = %s weEth (base 1e18)", lpRateInWeEth);
    }

    function test_get_price_SY_multiply_by_external_price() external view {
        uint256 ptRateInWeEth = IPMarket(market).getPtToSyRate(twapDuration); // 1 SY-weETH = 1 weETH
        uint256 ptRateInEth = ptRateInWeEth * uint256(feed.latestAnswer()) / (10 ** feedDecimals);
        console.log("1 PT = %s ETH (base 1e18)", ptRateInEth);
    }

    function test_get_price_asset_multiply_by_external_price() external view {
        address aUSDCMarket = 0xBa4A858d664Ddb052158168DB04AFA3cFF5CFCC8;
        IChainlinkAggregator aUSDCFeed = IChainlinkAggregator(0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3); // aUSDC to
            // USD, Chainlink

        uint256 ptRateInUSDC = IPMarket(aUSDCMarket).getPtToAssetRate(twapDuration); // Have to get in asset because
            // SY-aUSDC ~= aUSDC and doesn't have a price

        uint256 ptRateInUsd = ptRateInUSDC * uint256(aUSDCFeed.latestAnswer()) / (10 ** 8);
        console.log("1 PT = %s USD (base 1e18)", ptRateInUsd);
    }

    function test_get_LP_price_use_library() external view {
        uint256 lpRateInEEth = IPMarket(market).getLpToAssetRate(twapDuration);
        console.log("1 LP = %s eEth (base 1e18)", lpRateInEEth);

        uint256 lpRateInWeEth = IPMarket(market).getLpToSyRate(twapDuration);
        console.log("1 LP = %s weEth (base 1e18)", lpRateInWeEth);

        uint256 lpRateInEth = lpRateInWeEth * uint256(feed.latestAnswer()) / (10 ** feedDecimals);
        console.log("1 LP = %s ETH (base 1e18)", lpRateInEth);
    }

    /// @dev more gas consuming than using library, same results
    function test_get_prices_use_oracle_contract() external view {
        uint256 ptRateInEEth = oracle.getPtToAssetRate(address(market), twapDuration);
        console.log("1 PT = %s eEth (base 1e18)", ptRateInEEth);

        uint256 ptRateInWeEth = oracle.getPtToSyRate(address(market), twapDuration);
        console.log("1 PT = %s weEth (base 1e18)", ptRateInWeEth);

        uint256 lpRateInEEth = oracle.getLpToAssetRate(address(market), twapDuration);
        console.log("1 LP = %s eEth (base 1e18)", lpRateInEEth);

        uint256 lpRateInWeEth = oracle.getLpToSyRate(address(market), twapDuration);
        console.log("1 LP = %s weEth (base 1e18)", lpRateInWeEth);
    }

    /// @dev Call only once for each (market, duration). Once successful, it's permanently valid (also for any shorter
    /// duration).
    function _test_oracle_ready(address marketToCheck, uint32 duration) public view {
        (bool increaseCardinalityRequired,, bool oldestObservationSatisfied) =
            oracle.getOracleState(marketToCheck, duration);

        if (increaseCardinalityRequired) {
            // It's required to call IPMarket(market).increaseObservationsCardinalityNext(cardinalityRequired) and wait
            // for at least the twapDuration, to allow data population.
        }

        if (!oldestObservationSatisfied) {
            // It's necessary to wait for at least the twapDuration, to allow data population.
        }

        assert(!increaseCardinalityRequired);
        assert(oldestObservationSatisfied);
    }
}
