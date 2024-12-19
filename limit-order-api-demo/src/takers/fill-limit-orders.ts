import { Contract } from 'ethers';
import { LIMIT_ORDER_CONTRACTS } from '../share/constants';
import abi from '../abis/PendleLimitRouter.json';
import { getSigner } from '../share/signer';
import { SignedLimitOrderInfo, fromBackendSignedLimitOrderToOrderStruct } from '../share/types';

export async function fillLimitOrders(limitOrdersInfo: SignedLimitOrderInfo[]) {
  const signer = getSigner();
  const contract = new Contract(LIMIT_ORDER_CONTRACTS.ARBITRUM, abi, signer);

  const fillParams = limitOrdersInfo.map((limitOrderInfo) => {
    const { order, makingAmount } = limitOrderInfo;
    return {
      order: fromBackendSignedLimitOrderToOrderStruct(order),
      signature: order.signature,
      makingAmount: makingAmount, // How much you want to fill the order, the same unit with makingAmount of the order
    };
  });

  const sumNetFromTaker = limitOrdersInfo.reduce((acc, limitOrderInfo) => {
    return acc + BigInt(limitOrderInfo.netFromTaker);
  }, 0n);

  // Maximum amount to be used to fill the order
  // We recommend buffer the returned value from BE by 1% because
  // the netFromTaker amount will change by time
  const maxTaking = (sumNetFromTaker * 101n) / 100n;

  const tx = await contract.fill(
    fillParams, // limit of order to fill
    signer.getAddress(),
    maxTaking,
    '0x',
    '0x'
  );

  await tx.wait();

  console.debug(tx);

  console.log('Finished fill the order');
}
