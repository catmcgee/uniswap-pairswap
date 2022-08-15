import { ethers } from "ethers";
import { Route } from "@uniswap/v3-sdk";
import { Trade } from "@uniswap/v3-sdk";
import { Token, CurrencyAmount, TradeType } from "@uniswap/sdk-core";
import { getPoolAddress, getTokenDetails } from "./helpers";
import { getPool } from "./uniswapPool";
const {
  abi: UniswapAbi,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const {
  abi: QuoterAbi,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const chainId = 1; // mainnet
const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"; // address of Uniswap V3 Quoter contract for getting trade quotes
const provider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_INFURA_URL
); // using Infura as the node provider

// main function

export const getPrice = async (inputAmount, pair, inverted) => {
  // get the pool address that contains the token pair inputted
  const poolAddress = getPoolAddress(pair);

  // generate the contract for this pool address
  const poolContract = await generateContract(poolAddress, UniswapAbi);

  // find the tokens from this contract, so that we can get more details from them
  const [token0Address, token1Address, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  // get details of these tokens
  // we currently only use the decimals later, but more information is here for future use
  let [token0, token1] = await getTokenDetails(token0Address, token1Address);

  // generate quoter contract, allowing us to create swap quotes
  const quoterContract = await generateContract(quoterAddress, QuoterAbi);

  // swap the token variables if the user has selected the inverse (e.g. USDC -> UNI)

  if (inverted) {
    const token3 = token1;
    token1 = token0;
    token0 = token3;
  }

  // generate ethers tokens instances to in order to generate pool

  const TokenA = new Token(chainId, token0.address, token0.decimals);
  const TokenB = new Token(chainId, token1.address, token1.decimals);

  // generate pool
  const Pool = await getPool(poolContract, TokenA, TokenB, fee);

  // create an amount inputted number that will work with ethers, using the decimals
  const amountIn = ethers.utils.parseUnits(
    inputAmount.toString(),
    token0.decimals
  );

  // call the UniSwap SDK quote to find the price of the token selected
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    token0.address,
    token1.address,
    fee,
    amountIn,
    0
  );

  // open a trade and print response
  const uncheckedTrade = await openTrade(
    Pool,
    TokenA,
    TokenB,
    amountIn,
    quotedAmountOut
  );
  console.log(uncheckedTrade);

  // format the output using the decimals of the token to send back to frontend
  const amountOut = ethers.utils.formatUnits(quotedAmountOut, token1.decimals);

  return amountOut;
};

const generateContract = async (address, abi) => {
  const contract = new ethers.Contract(address, abi, provider);
  return contract;
};

const openTrade = async (pool, tokenA, tokenB, amountIn, amountOut) => {
  const swapRoute = new Route([pool], tokenA, tokenB);

  const uncheckedTrade = await Trade.createUncheckedTrade({
    route: swapRoute,
    inputAmount: CurrencyAmount.fromRawAmount(tokenA, amountIn.toString()),
    outputAmount: CurrencyAmount.fromRawAmount(tokenB, amountOut.toString()),
    tradeType: TradeType.EXACT_INPUT,
  });

  return uncheckedTrade;
};

// TODO:
// Find a better way to get details (mainly decimals) for each token
