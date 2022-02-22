const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CidRecords function tests", async function () {

  before(async () => {
    const CidRecords = await ethers.getContractFactory("CidRecords");
    const cidrecords = await CidRecords.deploy();
    await cidrecords.deployed();
    const signer = await ethers.getSigner();
  })

  // helper functions
  let cidRecordsFromContract;
  let documentsFromContract;
  const awaitCidRecords = async () => {
    cidRecordsFromContract = await cidrecords.getCidRecords(signer.address);
  }
  const awaitDocumentCidRecords = async () => {
    documentsFromContract = await cidrecords.getDocuments(signer.address);
  }

  it("cidRecords be an object with undefined when accessing cidRecords mapping", async function() {
    awaitCidRecords();
    expect(cidRecordsFromContract).to.be.an('object');
    expect(cidRecordsFromContract[signer.address]).to.be.an('undefined');
  })

  it("addDocumentCid to add the documentCid to the cidRecord", async function() {
    const addDocumentTx = await cidrecords.addDocumentCid("documentcid");
    await addDocumentTx.wait();

    awaitCidRecords();

    expect(cidRecordsFromContract[signer.address]).to.equal("Hola, mundo!");
  })

  it("getDocuments to be able to get the documents", async function() {
    awaitDocumentCidRecords();
    expect(documentsFromContract).to.equal("Hola, mundo")
  })
});
