const { expect } = require("chai");
const { ethers } = require("hardhat");

// need to start a node with npx hardhat node first to be able to deploy

describe("KeyPairs function tests", async function () {
  before(async () => {
    this.KeyPairs = await ethers.getContractFactory("KeyPairs");
    this.keypairs = await this.KeyPairs.deploy();
    await this.keypairs.deployed();
    if (typeof ethers.address === "undefined")
      this.signer = await ethers.getSigner();
    else this.signer = ethers.getSigner();
  });

  // helper functions
  let cidRecordsFromContract;
  let documentsFromContract;
  const setKeyPairs = async () => {
    cidRecordsFromContract = await this.keypairs.getKeyPairs(
      this.signer.address
    );
  };
  const setDocumentKeyPairs = async () => {
    documentsFromContract = await this.keypairs.getDocuments(
      this.signer.address
    );
  };

  it("tests that cidRecords is an object with undefined when accessing cidRecords mapping", async function () {
    await setKeyPairs();
    expect(cidRecordsFromContract).to.be.an("object");
    expect(cidRecordsFromContract[signer.address]).to.be.an("undefined");
  });

  it("addDocumentCid to add the documentCid to the cidRecord", async function () {
    const addDocumentTx = await this.keypairs.addDocumentCid("documentcid");
    await addDocumentTx.wait();

    await setKeyPairs();

    expect(cidRecordsFromContract[signer.address]).to.equal("Hola, mundo!");
  });

  it("getDocuments to be able to get the documents", async function () {
    await setDocumentKeyPairs();
    expect(documentsFromContract).to.equal("Hola, mundo");
  });
});
