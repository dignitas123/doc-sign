# doc-sign

Doc Sign is a project to make Documents Signing easy and permissionless.

# backend

```shell
python3 -m venv dsenv
source dsenv/bin/activate
pip install -e .
```

# frontend

```shell
yarn
yarn build
```

# start application in development mode with:

```shell
cd frontend
yarn backend:dev
yarn dev
```

# deploy ethereum smart contract on ropsten testnet/local

```shell
cd contracts/DSCidRecords
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network ropsten
npx hardhat run scripts/deploy.js --network localhost
npx hardhat console --network localhost
```