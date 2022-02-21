//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CidRecords {
    struct Records {
        string keyPairCid;
        string[] documentCids;
    }

    mapping(address => Records) public cidRecords;

    event DocumentDeleted(string documentCid);

    function getCidRecords(address _address) external view returns(Records memory) {
      return cidRecords[_address];
    }

    function getDocuments(address _address) external view returns(string[] memory) {
      return cidRecords[_address].documentCids;
    }

    function setUserKeyCid(string memory _keyPairCid) external {
      cidRecords[msg.sender].keyPairCid = _keyPairCid;
    }

    function addDocumentCid(string memory _documentCid) external {
      cidRecords[msg.sender].documentCids.push(_documentCid);
    }

    function indexOfDocument(string memory _documentCid, address _address) private view returns(uint256) {
        for (uint256 i = 0; i < cidRecords[_address].documentCids.length; ++i) {
            if (keccak256(abi.encodePacked(cidRecords[_address].documentCids[i])) == keccak256(abi.encodePacked(_documentCid))) {
              return i;
            }
        }
        return 0;
    }

    function deleteDocument(string memory _documentCid) external returns(bool documentFound) {
      uint256 rowToDelete = indexOfDocument(_documentCid, msg.sender);
      if (rowToDelete > 0) {
        delete cidRecords[msg.sender].documentCids[rowToDelete];
        emit DocumentDeleted(_documentCid);
        return true;
      } else {
        return false;
      }
    }
}
