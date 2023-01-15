// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import {NFT} from "contracts/NFT.sol";

import "lib/forge-std/src/Test.sol";

contract TestContract is Test {
  address deployer;
  NFT nft;
    function setUp() public {
        deployer = vm.addr(69);
        vm.startPrank(deployer);
        vm.deal(deployer, 1000 ether);

         nft = new NFT();
    }

    function testOwner() public {
      assertEq(nft.owner(), deployer);
    }
}

