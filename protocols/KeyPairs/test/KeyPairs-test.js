const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KeyPairs function tests", async () => {
  let signer
  let keyPairFactory
  let keypairs

  before(async () => {
    keyPairFactory = await ethers.getContractFactory("KeyPairs");
    keypairs = await keyPairFactory.deploy();
    await keypairs.deployed();
    signer = await ethers.getSigner();
  });

  it("sets keyPairCid", async () => {
    const setUserKeyCidTx = await keypairs.setUserKeyCid("KeyPairCid");
    await setUserKeyCidTx.wait(setUserKeyCidTx);
    const keyPairCidSignerAddress = await keypairs.keyPairCids(signer.address);
    expect(keyPairCidSignerAddress).to.equal("KeyPairCid");
  });
});
