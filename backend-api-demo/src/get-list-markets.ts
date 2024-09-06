import axios from "axios";
import { CORE_DOMAIN } from "./const";

interface Param {
  chainId: number;
}

interface Query {
  order_by?: string;
  skip?: number;
  limit?: number;
  is_expired?: boolean;
  select?: string;
  pt?: string;
  yt?: string;
  sy?: string;
  q?: string;
  is_active?: boolean;
  categoryId?: string;
}

interface MarketInfo {
  name: string;
  address: string;
  expiry: string;
  pt: {
    id: string;
  };
  yt: {
    id: string;
  };
  sy: {
    id: string;
  };
  liquidity: {
    usd: number;
    acc: number;
  };
  underlyingInterestApy: number;
  underlyingRewardApy: number,
  underlyingApy: number;
  impliedApy: number;
  ytFloatingApy: number;
  aggregatedApy: number;
  maxBoostedApy: number;
  lpRewardApy: number;
  voterApy: number;
}

interface Response {
  total: number;
  limit: number;
  skip: number;
  results: MarketInfo[];
}

export async function getMarkets() {
  // This is an example of how to get list of active Pendle markets on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
  }

  const query: Query = {
    order_by: 'name:1',
    skip: 0,
    limit: 10,
    is_expired: false,
    select: 'pro',
  }

  const targetPath = `/v1/${param.chainId}/markets`;

  const { data } = await axios.get<Response>(CORE_DOMAIN + targetPath, {params: query});

  const { results: markets, skip, limit, total } = data;

  console.log('result info', {limit, total, skip});

  const {name, address, expiry, pt, sy, yt, liquidity, impliedApy, aggregatedApy, underlyingApy, lpRewardApy, underlyingInterestApy, underlyingRewardApy, maxBoostedApy, voterApy, ytFloatingApy} = markets[0];
  const {id: ptId} = pt;
  const {id: syId} = sy;
  const {id: ytId} = yt;
  const {usd: liquidityUSD } = liquidity;

  console.log('first active market', {name, address, expiry, ptId, syId, ytId, liquidityUSD, impliedApy, aggregatedApy, underlyingApy, lpRewardApy, underlyingInterestApy, underlyingRewardApy, maxBoostedApy, voterApy, ytFloatingApy });
}