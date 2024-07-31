import { ethers } from 'ethers';
import { ChainId } from './constants';

export function getProvider(): ethers.Provider {
  // Replace this with a RPC of your choice
  const providerUrl = 'https://arbitrum.llamarpc.com';
  const providerOptions = {
    // Testing on Polygon POS
    chainId: ChainId.ARBITRUM,
    name: 'Arbitrum',
  };
  return new ethers.JsonRpcProvider(providerUrl, providerOptions);
}
