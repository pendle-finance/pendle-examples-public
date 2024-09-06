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
  zappable?: boolean;
  type?: string;
  address?: string;
  q?: string;
}

interface AssetInfo {
  name: string;
  decimals: number;
  address: string;
  symbol: string;
  types: string[];
  expiry: string;
}

interface Response {
  results: AssetInfo[];
  total: number;
  limit: number;
  skip: number;
}

export async function getAssets() {
  // This is an example of how to get list of Pendle assets on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
  }

  const query: Query = {
    order_by: 'name:1',
    skip: 0,
    limit: 10,
    is_expired: false,
  }

  const targetPath = `/v1/${param.chainId}/assets`;

  const { data } = await axios.get<Response>(CORE_DOMAIN + targetPath, {params: query});

  const {total, limit, skip, results: assets} = data;

  console.log('result info', {limit, total, skip});

  const {name, address, decimals, expiry, symbol, types} = assets[0];

  console.log('first asset', {name, address, decimals, expiry, symbol, types});
}