import { tokens } from "./tokens";

export const getPoolAddress = async (pair) => {
  // pool addresses of the three pools this application uses
  const USDCETH = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";
  const ETHWBTC = "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed";
  const UNIUSDC = "0xd0fc8ba7e267f2bc56044a7715a489d851dc6d78";

  let poolAddress;
  // set the pool addresses based on the state passed in parameters
  if (pair[0] === "USDC" && pair[1] === "ETH") {
    poolAddress = USDCETH;
  } else if (pair[0] === "WBTC" && pair[1] === "ETH") {
    poolAddress = ETHWBTC;
  } else if (pair[0] === "UNI" && pair[1] === "USDC") {
    poolAddress = UNIUSDC;
  }
  return poolAddress;
};

export const getTokenDetails = async (token0Address, token1Address) => {
  let token0;
  let token1;

  // go through our tokens object to find the token with the correct address
  // currently we are only using the decimals value in this object

  for (let i in tokens) {
    if (token0Address === tokens[i].address) {
      token0 = tokens[i];
    }
    if (token1Address === tokens[i].address) {
      token1 = tokens[i];
    }
  }
  return [token0, token1];
};
