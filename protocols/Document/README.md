# Basic Sample Hardhat Project

Protocols for the Docsign Project

# dotenvrinment setup

alchemayapi.io account necessary
create .env in root with
API_URL = "<alchemyapikey>"
PRIVATE_KEY = "<metamask ropsten network private key>"

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
npx hardhat run scripts/deploy.js --network ropsten
see: https://ethereum.org/en/developers/tutorials/hello-world-smart-contract/#step-11 for complete tutorial
```

# interact with the contract in the hardhat console, needs node 16.14.0 (openssl change in 17.x not supported)

```shell
const contract = await hre.ethers.getContractAt,("KeyPairss","0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
```

# test

```shell
npm test
```
