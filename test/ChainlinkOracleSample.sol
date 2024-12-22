// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 as console } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";
import "@pendle/core-v2/contracts/interfaces/IPAllActionV3.sol";
import "@pendle/core-v2/contracts/interfaces/IPMarket.sol";
import "../src/StructGen.sol";
import { AggregatorV2V3Interface as IChainlinkAggregator } from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV2V3Interface.sol";

import "@pendle/core-v2/contracts/oracles/PtYtLpOracle/chainlink/PendleChainlinkOracle.sol";
import "@pendle/core-v2/contracts/oracles/PtYtLpOracle/chainlink/PendleChainlinkOracleWithQuote.sol";
import "@pendle/core-v2/contracts/oracles/PtYtLpOracle/chainlink/PendleChainlinkOracleFactory.sol";

contract ChainlinkOracleSample2 is PRBTest, StdCheats, StructGen {
  IStandardizedYield public SY;
  IPPrincipalToken public PT;
  IPYieldToken public YT;

  IPMarket public constant market = IPMarket(0xCaE62858DB831272A03768f5844cbe1B40bB381f);
  PendleChainlinkOracleFactory public factory;
  PendleChainlinkOracle public PT_LBTC_oracle;
  PendleChainlinkOracleWithQuote public PT_USD_oracle;

  IChainlinkAggregator public constant LBTC_USD_feed = IChainlinkAggregator(0x5c29868C58b6e15e2b962943278969Ab6a7D3212);

  uint16 public constant twapDuration = 900;

  function setUp() public virtual {
    vm.createSelectFork({ urlOrAlias: "mainnet", blockNumber: 21193294 });
    (SY, PT, YT) = IPMarket(market).readTokens();
    factory = new PendleChainlinkOracleFactory(0x9a9Fa8338dd5E5B2188006f1Cd2Ef26d921650C2);
    PT_LBTC_oracle = PendleChainlinkOracle(
      factory.createOracle(address(market), twapDuration, PendleOracleType.PT_TO_SY)
    );

    PT_USD_oracle = PendleChainlinkOracleWithQuote(
      factory.createOracleWithQuote(address(market), twapDuration, PendleOracleType.PT_TO_SY, address(LBTC_USD_feed))
    );
  }

  function test_get_prices_in_SY() external view {
    (uint80 roundId, int256 answer, , uint256 updatedAt, uint80 answeredInRound) = PT_LBTC_oracle.latestRoundData();
    console.log("PT LBTC to SY-LBTC");
    console.log(uint256(roundId), uint256(answer), updatedAt, uint256(answeredInRound));
    // answer = 992893819205953801, meaning 1 PT = 0.992893819205953801 SY-LBTC
  }

  function test_get_prices_in_quote() external view {
    (uint80 roundId, int256 answer, , uint256 updatedAt, uint80 answeredInRound) = PT_USD_oracle.latestRoundData();
    console.log("PT LBTC to BTC");
    console.log(uint256(roundId), uint256(answer), updatedAt, uint256(answeredInRound));
    // answer = 990999427443599801, meaning 1 PT = 0.9909994274435997 BTC
  }
}
