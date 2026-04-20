import { ChainId } from '../share/constants';

export const ORDER_BOOK_EVENT = 'order-book';

// Any whitelisted-pro, safe, non-expired market works. Pick one by calling
// GET https://api-v2.pendle.finance/core/v2/<chainId>/markets?is_whitelisted_pro=true
export const SAMPLE_MARKET = {
  chainId: ChainId.ETHEREUM,
  address: '0xc5b32dba5f29f8395fb9591e1a15f23a75214f33',
};

// precisionDecimal is the number of decimal digits in percent:
//   0 -> 1%, 1 -> 0.1%, 2 -> 0.01%, 3 -> 0.001%
export const PRECISION_DECIMALS = [0, 1, 2, 3] as const;
export type PrecisionDecimal = (typeof PRECISION_DECIMALS)[number];

export function orderBookRoom(chainId: number, marketAddress: string, precisionDecimal: PrecisionDecimal): string {
  return `market:${chainId}-${marketAddress.toLowerCase()}:order-book:precision-${precisionDecimal}`;
}
