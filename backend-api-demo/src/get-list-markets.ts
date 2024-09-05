import axios from "axios";
import { EXTERNAL_DOMAIN } from "./const";

interface Param {
  chainId: number;
}

interface MarketInfo {
  name: string;
  address: string;
  expiry: string;
  pt: string;
  yt: string;
  sy: string;
}

interface Response {
  markets: MarketInfo[];
}

export async function getActiveMarkets() {
  // This is an example of how to get list of active Pendle markets on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
  }

  const targetPath = `/v1/${param.chainId}/markets/active`;

  const { data } = await axios.get<Response>(EXTERNAL_DOMAIN + targetPath);

  const { markets } = data;

  const {name, address, expiry, pt, sy, yt} = markets[0];

  console.log('first active market', {name, address, expiry, pt, sy, yt});
}

export async function getInactiveMarkets() {
  // This is an example of how to get list of inactive Pendle markets on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
  }

  const targetPath = `/v1/${param.chainId}/markets/inactive`;

  const { data } = await axios.get<Response>(EXTERNAL_DOMAIN + targetPath);

  const { markets } = data;

  const {name, address, expiry, pt, sy, yt} = markets[0];

  console.log('first inactive market', {name, address, expiry, pt, sy, yt});
}