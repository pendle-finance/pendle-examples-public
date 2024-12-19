import axios from "axios";
import { CORE_DOMAIN } from "./const";

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
  underlyingAsset: string;
}

interface Response {
  markets: MarketInfo[];
}

export async function getMarkets() {
  // This is an example of how to get list of active Pendle markets on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
  }

  const targetPath = `/v1/${param.chainId}/markets/active`;

  const { data } = await axios.get<Response>(CORE_DOMAIN + targetPath);

  const { markets } = data;

  console.log('first active market', markets[0]);
}