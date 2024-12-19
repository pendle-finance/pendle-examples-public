import { TypedDataField } from 'ethers';

export const LIMIT_ORDER_DOMAIN = `https://api-v2.pendle.finance/limit-order`;

export enum ChainId {
  ARBITRUM = 42161,
}

export const LIMIT_ORDER_CONTRACTS = {
  ARBITRUM: '0x000000000000c9b3e2c3ec88b1b4c0cd853f4321',
};

export const aUSDC_MARKET = {
  yt: '0xa1c32ef8d3c4c30cb596bab8647e11daf0fa5c94',
  tokenIn: {
    usdc: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
  },
};

export const typesLimitOrder: Record<string, TypedDataField[]> = {
  Order: [
    { name: 'salt', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'orderType', type: 'uint8' },
    { name: 'token', type: 'address' },
    { name: 'YT', type: 'address' },
    { name: 'maker', type: 'address' },
    { name: 'receiver', type: 'address' },
    { name: 'makingAmount', type: 'uint256' },
    { name: 'lnImpliedRate', type: 'uint256' },
    { name: 'failSafeRate', type: 'uint256' },
    { name: 'permit', type: 'bytes' },
  ],
};

export const limitOrderDomainArbitrum = {
  name: 'Pendle Limit Order Protocol',
  version: '1',
  chainId: 42161,
  verifyingContract: LIMIT_ORDER_CONTRACTS.ARBITRUM,
};
