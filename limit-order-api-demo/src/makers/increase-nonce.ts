import { getSigner } from "../share/signer";
import { OrderStruct } from "../share/types";
import { Contract } from "ethers";
import { LIMIT_ORDER_CONTRACTS } from "../share/constants";
import abi from '../abis/PendleLimitRouter.json';


export async function increaseNonce() {
  const signer = getSigner();
  const contract = new Contract(LIMIT_ORDER_CONTRACTS.ARBITRUM, abi, signer);

  const tx = await contract.increaseNonces();
  await tx.wait();

  console.debug(tx);

  console.log('Finished cancelling the order')
}
