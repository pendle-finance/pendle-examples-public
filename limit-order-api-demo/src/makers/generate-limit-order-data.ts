import { ChainId, LIMIT_ORDER_DOMAIN, aUSDC_MARKET } from '../share/constants';
import { LimitOrderType } from '../share/types';
import { getSigner } from '../share/signer';
import axios from 'axios';

export interface GenerateLimitOrderDataRequest {
  chainId: number;
  YT: string;
  orderType: LimitOrderType;
  token: string;
  maker: string;
  makingAmount: string;
  impliedApy: number;
  expiry: string;
}

export interface GeneratedLimitOrderData extends GenerateLimitOrderDataRequest {
  salt: string;
  nonce: string;
  failSafeRate: string;
  receiver: string;
  lnImpliedRate: string;
  permit: string;
}

export async function generateLimitOrderData() {
  const targetPath = '/v1/makers/generate-limit-order-data';

  const signerAddress = await getSigner().getAddress();

  const requestBody: GenerateLimitOrderDataRequest = {
    chainId: ChainId.ARBITRUM,
    YT: aUSDC_MARKET.yt,
    maker: signerAddress,
    orderType: LimitOrderType.TOKEN_FOR_PT,
    token: aUSDC_MARKET.tokenIn.usdc, // Use USDC as token in to swap to PT
    makingAmount: '10000000', // 10 USDC
    impliedApy: 0.1, // 10% implied APY
    expiry: String(Math.floor(Date.now() / 1000) + 20 * 60), // order will be expired in 20 minutes
  };

  console.debug(requestBody);

  try {
    console.log(`\nGetting the limit order data...`);
    const { data } = await axios.post(LIMIT_ORDER_DOMAIN + targetPath, requestBody);

    console.debug(data);

    return data as GeneratedLimitOrderData;
  } catch (error) {
    throw error;
  }
}
