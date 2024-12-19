// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 as console } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";
import "@pendle/core-v2/contracts/interfaces/IPAllActionV3.sol";
import "@pendle/core-v2/contracts/interfaces/IPMarket.sol";
import "../src/StructGen.sol";

contract RouterSample2 is PRBTest, StdCheats, StructGen {
  IPAllActionV3 public constant router = IPAllActionV3(0x888888888889758F76e7103c6CbF23ABbF58F946);
  IPMarket public constant market = IPMarket(0x8a49f2AC2730ba15AB7EA832EdaC7f6BA22289f8);
  address public constant USDE = 0x4c9EDD5852cd905f086C759E8383e09bff1E68B3;

  IStandardizedYield public SY;
  IPPrincipalToken public PT;
  IPYieldToken public YT;

  function setUp() public virtual {
    vm.createSelectFork({ urlOrAlias: "mainnet", blockNumber: 20_426_046 });

    (SY, PT, YT) = IPMarket(market).readTokens();

    deal(USDE, address(this), 1000e18);
    deal(address(SY), address(this), 1000e18);
    IERC20(USDE).approve(address(router), type(uint256).max);
    IERC20(SY).approve(address(router), type(uint256).max);
    IERC20(PT).approve(address(router), type(uint256).max);
    IERC20(YT).approve(address(router), type(uint256).max);
    IERC20(market).approve(address(router), type(uint256).max);
  }

  function test_ZapIn() external {
    (uint256 netLpOut, , ) = router.addLiquiditySingleToken(
      address(this),
      address(market),
      0,
      defaultApprox,
      createTokenInputStruct(USDE, 50e18),
      emptyLimit
    );

    router.addLiquiditySingleSy(address(this), address(market), 50e18, 0, defaultApprox, emptyLimit);
  }
}
