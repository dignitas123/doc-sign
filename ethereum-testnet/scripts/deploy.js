async function main() {
   const Greeter = await ethers.getContractFactory("Greeter");

   // Start deployment, returning a promise that resolves to a contract object
   const greeter = await Greeter.deploy("Hello World!");
   console.log("Contract deployed to address:", greeter.address);}

main()
  .then(() => process.exit(0))
	  .catch(error => {
	    console.error(error);
	    process.exit(1);
	  });
