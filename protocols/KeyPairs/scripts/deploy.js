async function main() {
    const KeyPairs = await ethers.getContractFactory("KeyPairs");
   // Hardhat always runs the compile task when running scripts with its command
   // line interface.
   //
   // If this script is run directly using `node` you may want to call compile
   // manually to make sure everything is compiled
   // await hre.run('compile');
 
   // We get the contract to deploy
    const keypairs = await KeyPairs.deploy();
    console.log("Contract deployed to address:", keypairs.address);}
 
 main()
   .then(() => process.exit(0))
       .catch(error => {
         console.error(error);
         process.exit(1);
       });