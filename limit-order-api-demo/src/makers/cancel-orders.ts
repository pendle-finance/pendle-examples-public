import { getSigner } from "../share/signer";
import { OrderStruct } from "../share/types";
import { Contract } from "ethers";
import { LIMIT_ORDER_CONTRACTS } from "../share/constants";
import abi from '../abis/PendleLimitRouter.json';


export async function cancelSingleOrder(order: OrderStruct) {
  const signer = getSigner();
  const contract = new Contract(LIMIT_ORDER_CONTRACTS.ARBITRUM, abi, signer);

  const tx = await contract.cancelSingle(order);
  await tx.wait();

  console.debug(tx);

  console.log('Finished cancelling the order')
}

export async function cancelBatchOrders(orders: OrderStruct[]) {
  const signer = getSigner();
  const contract = new Contract(LIMIT_ORDER_CONTRACTS.ARBITRUM, abi, signer);

  const tx = await contract.cancelBatch(orders);
  await tx.wait();

  console.debug(tx);

  console.log('Finished cancelling the orders')
}
