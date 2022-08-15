# Swap pairs - Uniswap V3

This is a simple React application to swap three pairs of tokens - USDC/WETH, WBTC/WETH, and UNI/USDC.
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

## Known issues

- This application uses WETH instead of ETH. I could not find the ETH/WBTC and ETH/USDC pools. The Uniswap site leads to WETH pools, and the graph explorer did not show me ETH pools either.
- There is a lot of code refactoring to be done, especially splitting into components on the frontend. I unfortunately did not have time.
- I am sure there are more efficient ways to use the SDK (in fact, I know there are) but I tried to stay within the resources that were sent to me by Erin. I mention this in the comments throughout.
- The final trade information is not shown on the frontend, only in the console.
- There is no error handling - again, no time.
- 2-3 hours as mentioned in the email is unfortunately not enough to make this into a good application. I would not be happy at all to share this with developers. I think another 3-4 hours would solve all issues mentioned here.
