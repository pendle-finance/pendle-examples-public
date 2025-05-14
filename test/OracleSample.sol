// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 as console } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";
import "@pendle/core-v2/contracts/interfaces/IPAllActionV3.sol";
import "@pendle/core-v2/contracts/interfaces/IPMarket.sol";

import "@pendle/core-v2/contracts/oracles/PtYtLpOracle/PendlePYLpOracle.sol";
import "../src/StructGen.sol";
import { AggregatorV2V3Interface as IChainlinkAggregator } from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV2V3Interface.sol";

contract OracleSample is PRBTest, StdCheats, StructGen {
  using PendlePYOracleLib for IPMarket;
  using PendleLpOracleLib for IPMarket;

  IStandardizedYield public SY;
  IPPrincipalToken public PT;
  IPYieldToken public YT;

  IPMarket public constant market = IPMarket(0x952083cde7aaa11AB8449057F7de23A970AA8472);
  PendlePYLpOracle public constant oracle = PendlePYLpOracle(0x9a9Fa8338dd5E5B2188006f1Cd2Ef26d921650C2);

  IChainlinkAggregator public constant weETH_ETH_feed =
    IChainlinkAggregator(0xE141425bc1594b8039De6390db1cDaf4397EA22b);
  IChainlinkAggregator public constant ETH_USD_feed = IChainlinkAggregator(0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612);
  IChainlinkAggregator public constant USDC_USD_Feed = IChainlinkAggregator(0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3);

  uint32 public constant twapDuration = 900;

  function setUp() public virtual {
    vm.createSelectFork({ urlOrAlias: "arbitrum", blockNumber: 218241893 });
    (SY, PT, YT) = IPMarket(market).readTokens();
    _test_oracle_ready(address(market), twapDuration);
  }

  ////////////////
  //// Using Oracle
  ////////////////

  function test_get_price_LRT_in_underlying() external view {
    uint256 ptRateInWeEth = oracle.getPtToSyRate(address(market), twapDuration);
    uint256 ytRateInWeEth = oracle.getYtToSyRate(address(market), twapDuration);
    uint256 lpRateInWeEth = oracle.getLpToSyRate(address(market), twapDuration);

    console.log("1 PT = %s Wrapped eEth (base 1e18)", ptRateInWeEth);
    console.log("1 YT = %s Wrapped eEth (base 1e18)", ytRateInWeEth);
    console.log("1 LP = %s Wrapped eEth (base 1e18)", lpRateInWeEth);
  }

  function test_get_price_LRT_with_external_oracle() external view {
    uint256 ptRateInWeEth = oracle.getPtToSyRate(address(market), twapDuration); // 1 SY-weETH = 1 weETH

    uint256 ptRateInEth = (ptRateInWeEth * uint256(weETH_ETH_feed.latestAnswer())) / (10 ** weETH_ETH_feed.decimals());
    console.log("1 PT = %s ETH (base 1e18)", ptRateInEth); // 1 PT = 0.980103943942239852 ETH

    uint256 ptRateInUsd = (ptRateInEth * uint256(ETH_USD_feed.latestAnswer())) / (10 ** ETH_USD_feed.decimals());
    console.log("1 PT = %s USD (base 1e18)", ptRateInUsd); // 1 PT = 3714.1302603652102 USD
  }

  function test_get_price_aUSDC_with_external_price() external view {
    address aUSDCMarket = 0xBa4A858d664Ddb052158168DB04AFA3cFF5CFCC8;

    // Have to get price in asset because SY-aUSDC != aUSDC and doesn't have a price
    uint256 ptRateInUSDC = oracle.getPtToAssetRate(aUSDCMarket, twapDuration);

    uint256 ptRateInUsd = (ptRateInUSDC * uint256(USDC_USD_Feed.latestAnswer())) / (10 ** USDC_USD_Feed.decimals());
    console.log("1 PT = %s USD (base 1e18)", ptRateInUsd);
  }

  ////////////////
  //// Using Lib
  ////////////////

  function test_get_price_LRT_in_underlying_with_lib() external view {
    uint256 ptRateInWeEth = market.getPtToSyRate(twapDuration);
    uint256 ytRateInWeEth = market.getYtToSyRate(twapDuration);
    uint256 lpRateInWeEth = market.getLpToSyRate(twapDuration);

    console.log("1 PT = %s Wrapped eEth (base 1e18)", ptRateInWeEth);
    console.log("1 YT = %s Wrapped eEth (base 1e18)", ytRateInWeEth);
    console.log("1 LP = %s Wrapped eEth (base 1e18)", lpRateInWeEth);
  }

  function test_get_price_LRT_with_external_oracle_with_lib() external view {
    uint256 ptRateInWeEth = market.getPtToSyRate(twapDuration); // 1 SY-weETH = 1 weETH

    uint256 ptRateInEth = (ptRateInWeEth * uint256(weETH_ETH_feed.latestAnswer())) / (10 ** weETH_ETH_feed.decimals());
    console.log("1 PT = %s ETH (base 1e18)", ptRateInEth); // 1 PT = 0.980103943942239852 ETH

    uint256 ptRateInUsd = (ptRateInEth * uint256(ETH_USD_feed.latestAnswer())) / (10 ** ETH_USD_feed.decimals());
    console.log("1 PT = %s USD (base 1e18)", ptRateInUsd); // 1 PT = 3714.1302603652102 USD
  }

  /// @dev Call only once for each (market, duration). Once successful, it's permanently valid (also for any shorter
  /// duration).
  function _test_oracle_ready(address marketToCheck, uint32 duration) public view {
    (bool increaseCardinalityRequired, , bool oldestObservationSatisfied) = oracle.getOracleState(
      marketToCheck,
      duration
    );

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
