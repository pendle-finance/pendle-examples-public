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
  tags: string[];
  expiry: string;
}

interface Response {
  assets: AssetInfo[];
}

export async function getAssets() {
  // This is an example of how to get list of Pendle assets on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
  }

  const targetPath = `/v3/${param.chainId}/assets/all`;

  const { data } = await axios.get<Response>(CORE_DOMAIN + targetPath);

  const {assets} = data;

  console.log('first asset', assets[0]);
}