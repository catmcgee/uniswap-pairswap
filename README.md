# Swap pairs - Uniswap V3

This is a simple React application to swap three pairs of tokens - USDC/WETH, WBTC/WETH, and UNI/USDC. Completed in 3 hours so not very packed with features!
The application allows a user to select a token pair, input how much they would like to swap, and see the quoted amount from the Uniswap SDK.
It will also log the data that would be sent to complete a trade.
It does _not_ include a wallet connection so trades cannot be finalized.

## Technology Stack & Tools

- Javascript (React & Testing)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Infura](https://infura.io/) (Ethereum Node As A Service Provider)

## Requirements For Setup

- [NodeJS](https://nodejs.org/en/), this should work with any node version
- [npm](https://www.npmjs.com/)

## Setting Up

### 1. Clone/Download the Repository

```
$ git clone [https://github.com/catmcgee/uniswap-pairswap.git]
```

### 2. Install Dependencies:

```
$ cd uniswap-pairswap
$ npm install
```

### 3. Environment variables:

This app uses [Infura](https://infura.io) as its node provider. To use the app, you will need to create an Infura project and copy and paste the Ethereum mainnet URL. Set
this as the `REACT_APP_INFURA_URL` environment variable. It is important to use mainnet; currently this is the only network the project supports.

### 4. Start App

`$ npm start`
