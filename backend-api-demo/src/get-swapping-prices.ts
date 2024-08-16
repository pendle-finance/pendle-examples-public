import axios from "axios";
import { EXTERNAL_DOMAIN } from "./const";

interface Param {
  chainId: number;
  address: string;
}

interface Response {
  underlyingTokenToPtRate: number;
  ptToUnderlyingTokenRate: number;
  underlyingTokenToYtRate: number;
  ytToUnderlyingTokenRate: number;
  impliedApy: number;
}

export async function getSwappingPrices() {
  // This is an example of how to get swapping prices of USD0++ market on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
    address: '0x00b321d89a8c36b3929f20b7955080baed706d1b', // USDO++
  }

  const targetPath = `/v1/${param.chainId}/markets/${param.address}/swapping-prices`;

  const { data } = await axios.get<Response>(EXTERNAL_DOMAIN + targetPath);

  const { underlyingTokenToPtRate, ptToUnderlyingTokenRate, underlyingTokenToYtRate, ytToUnderlyingTokenRate, impliedApy } = data;

  console.log('swapping prices', {underlyingTokenToPtRate, ptToUnderlyingTokenRate, underlyingTokenToYtRate, ytToUnderlyingTokenRate, impliedApy });
}