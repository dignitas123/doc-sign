//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract DSCidRecords {
    struct CidRecords {
        string keyPairCid;
        string[] documentCids;
    }

    mapping(address => CidRecords) public cidRecords;

    event DocumentDeleted(string documentCid);

    function userExists(/*address _address*/) private pure returns (bool) {
      // return (cidRecords[_address] != bytes4(0x0));
      return true;
    }

    function showCidRecords(address _address) public view returns(CidRecords memory) {
      return cidRecords[_address];
    }

    function userHasKey(address _address) public view returns(bool) {
      require(userExists());
      return bytes(cidRecords[_address].keyPairCid).length > 0;
    }

    function setUserKeyCid(string memory _keyPairCid) external {
      cidRecords[msg.sender].keyPairCid = _keyPairCid;
    }

    function getUserKeyPairCid(address _address) external view returns(string memory) {
      require(userHasKey(_address));
      return cidRecords[_address].keyPairCid;
    }

    function indexOfDocument(string memory _documentCid, address _address) private view returns(uint256) {
        for (uint256 i = 0; i < cidRecords[_address].documentCids.length; ++i) {
            if (keccak256(abi.encodePacked(cidRecords[_address].documentCids[i])) == keccak256(abi.encodePacked(_documentCid))) {
              return i;
            }
        }
        return 0;
    }

    function addDocument(string memory _documentCid) external {
      cidRecords[msg.sender].documentCids.push(_documentCid);
    }

    function getUserDocuments(address _address) external view returns(string[] memory) {
      require(userExists());
      return cidRecords[_address].documentCids;
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
