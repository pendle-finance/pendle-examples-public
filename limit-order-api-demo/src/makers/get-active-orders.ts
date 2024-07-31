import axios from 'axios';
import { getSigner } from "../share/signer";
import { ChainId, LIMIT_ORDER_DOMAIN } from "../share/constants";
import { BackendSignedLimitOrder, LimitOrderType } from "../share/types";

export interface LimitOrderMakerQuery {
  skip: number;
  limit: number;
  chainId: number;
  maker: string;
  yt?: string;
  type?: LimitOrderType;
  isActive?: boolean;
}

export async function getMakerActiveLimitOrders(): Promise<BackendSignedLimitOrder[]> {
  const targetPath = '/v1/makers/limit-orders'
  console.log('Fetching limit order...')
  
  const requestQuery: LimitOrderMakerQuery = {
    skip: 0,
    limit: 10,
    chainId: ChainId.ARBITRUM,
    maker: await getSigner().getAddress(),
    isActive: true
  }

  console.debug(requestQuery)

  const {data} = await axios.get(LIMIT_ORDER_DOMAIN + targetPath, {params: requestQuery})

  console.log(`\nFinished fetching limit orders`);

  return data.results as BackendSignedLimitOrder[]
}
