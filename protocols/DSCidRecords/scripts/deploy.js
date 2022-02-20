async function main() {
   const DSCidRecords = await ethers.getContractFactory("DSCidRecords");
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
   const dscidrecords = await DSCidRecords.deploy();
   console.log("Contract deployed to address:", dscidrecords.address);}

main()
  .then(() => process.exit(0))
	  .catch(error => {
	    console.error(error);
	    process.exit(1);
	  });
