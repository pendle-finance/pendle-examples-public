import { ethers } from 'ethers';
import { getProvider } from './provider';

/**
 * To be able to run this example, you need to implement this function
 * For example, you can implement this by
 * return new ethers.Wallet('YOUR_PRIVATE_KEY', getProvider());
 *
 * CAUTION: Never expose your private keys (i.e. commit to a public repo)
 */
export function getSigner(): ethers.Signer {
  throw new Error("");
}
