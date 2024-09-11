import { LimitOrderType } from 'src/share/types';
import { GeneratedLimitOrderData } from './generate-limit-order-data';
import axios from 'axios';
import { LIMIT_ORDER_DOMAIN } from '../share/constants';

// The difference between CreateLimitOrderRequest and GeneratedLimitOrderData is the name of fields YT and orderType
// and CreateLimitOrderRequest has signature
export interface CreateLimitOrderRequest extends Omit<GeneratedLimitOrderData, 'YT' | 'orderType'> {
  yt: string;
  type: LimitOrderType;
  signature: string;
}

export async function postLimitOrder(generatedLimitOrderData: GeneratedLimitOrderData, signature: string) {
  const targetPath = '/v1/makers/limit-orders';

  console.log(`\nPreparing the create limit order request...`);

  const requestBody: CreateLimitOrderRequest = {
    ...generatedLimitOrderData,
    yt: generatedLimitOrderData.YT,
    type: generatedLimitOrderData.orderType,
    signature,
  };

  console.debug(requestBody);

  try {
    console.log(`\nPosting the limit order...`);
    const { data } = await axios.post(LIMIT_ORDER_DOMAIN + targetPath, requestBody);

    console.log(data);

    console.log(`\nPosted the limit order successfully`);
  } catch (error) {
    throw error;
  }
}
