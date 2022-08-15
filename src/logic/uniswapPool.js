import { Pool } from "@uniswap/v3-sdk";

export const getPool = async (poolContract, tokenA, tokenB, fee) => {
  // find the pool state in order to generate a new pool
  const [liquidity, slot] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  const state = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };

  // new pool
  const pool = new Pool(
    tokenA,
    tokenB,
    fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );

  return pool;
};
