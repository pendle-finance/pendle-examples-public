import axios from 'axios';
import { ChainId, LIMIT_ORDER_DOMAIN, aUSDC_MARKET } from '../share/constants';
import { LimitOrderType, SignedLimitOrderInfo } from '../share/types';

export interface LimitOrderTakerQuery {
  skip: number;
  limit: number;
  chainId: number;
  yt: string;
  type: LimitOrderType;
  sortBy: 'Implied Rate';
  sortOrder: 'asc' | 'desc';
}


export async function getLimitOrders(): Promise<SignedLimitOrderInfo[]> {
  const targetPath = '/v1/takers/limit-orders';

  console.log(`Fetching limit orders...`);

  const requestQuery: LimitOrderTakerQuery = {
    skip: 0,
    limit: 10, // Use skip and limit to fetch the orders, you can fetch upto 100 orders at a request
    chainId: ChainId.ARBITRUM,
    yt: aUSDC_MARKET.yt,
    type: LimitOrderType.TOKEN_FOR_PT,
    sortBy: 'Implied Rate',
    sortOrder: 'asc',
  };

  console.debug(requestQuery);

  const { data } = await axios.get(LIMIT_ORDER_DOMAIN + targetPath, { params: requestQuery });

  console.log(`\nFinished fetching limit orders`);

  return data.results as SignedLimitOrderInfo[];
}
