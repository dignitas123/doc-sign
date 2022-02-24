//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KeyPairs {

    mapping(address => string) public keyPairCids;

    function setUserKeyCid(string memory _keyPairCid) external {
      keyPairCids[msg.sender] = _keyPairCid;
    }
}
