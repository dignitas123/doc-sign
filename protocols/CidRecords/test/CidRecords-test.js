const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CidRecords function tests", async function () {
  const CidRecords = await ethers.getContractFactory("CidRecords");
  const cidrecords = await CidRecords.deploy();
  await cidrecords.deployed();
  const signer = await ethers.getSigner();

  test("getCidRecords, getDocuments and addDocumentCid", async function () {
    let cidRecordsFromContract;
    let documentsFromContract;
    const awaitCidRecords = async () => {
      cidRecordsFromContract = await cidrecords.getCidRecords(signer.address);
    }
    const awaitDocumentCidRecords = async () => {
      documentsFromContract = await cidrecords.getDocuments(signer.address);
    }

    it("should be an object with undefined when accessing cidRecords mapping", async function() {
      awaitCidRecords();
      expect(cidRecordsFromContract).to.be.an('object');
      expect(cidRecordsFromContract[signer.address]).to.be.an('undefined');
    })

    it("should add the documentCid to the cidRecord", async function() {
      const addDocumentTx = await cidrecords.addDocumentCid("documentcid");
      await addDocumentTx.wait();

      awaitCidRecords();

      expect(cidRecordsFromContract[signer.address]).to.equal("Hola, mundo!");
    })

    it("should be able to get the documents", async function() {
      awaitDocumentCidRecords();
      expect(documentsFromContract).to.equal("Hola, mundo")
    })
  });
});
