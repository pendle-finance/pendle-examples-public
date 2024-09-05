import axios from "axios";
import { EXTERNAL_DOMAIN } from "./const";

interface Param {
  chainId: number;
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

export async function getAssetList() {
  // This is an example of how to get list of Pendle assets on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
  }

  const targetPath = `/v1/${param.chainId}/assets/all`;

  const { data } = await axios.get<Response>(EXTERNAL_DOMAIN + targetPath);

  const { assets } = data;

  const {name, address, decimals, expiry, symbol, tags} = assets[0];

  console.log('first asset', {name, address, decimals, expiry, symbol, tags});
}