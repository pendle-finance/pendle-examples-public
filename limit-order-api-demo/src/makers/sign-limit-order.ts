import { GeneratedLimitOrderData, generateLimitOrderData } from './generate-limit-order-data';
import { limitOrderDomainArbitrum, typesLimitOrder } from '../share/constants';
import { getSigner } from '../share/signer';

export async function signLimitOrderData(data: GeneratedLimitOrderData): Promise<string> {
  try {
    const signer = getSigner();

    console.log(`\nStart signing the limit order data...`);

    console.log(data);
    console.log(typesLimitOrder);

    const signature = await signer.signTypedData(limitOrderDomainArbitrum, typesLimitOrder, data);

    console.log(`\nSigned the limit order data successfully`);

    return signature;
  } catch (error) {
    throw error;
  }
}
