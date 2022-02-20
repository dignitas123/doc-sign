// import { expect } from "chai";
import { ethers } from "hardhat";

describe("DSCidRecords", async function () {
  it("Should do something", function () {
    const DSCidRecords = await ethers.getContractFactory("DSCidRecords");
    const dscidrecords = await DSCidRecords.deploy("Hello, world!");
    await dscidrecords.deployed();

    // expect(await dsdocumentstore.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await dsdocuments.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await dsdocuments.greet()).to.equal("Hola, mundo!");
  });
});
