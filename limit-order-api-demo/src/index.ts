import { cancelSingleOrder } from './makers/cancel-orders';
import { generateLimitOrderData } from './makers/generate-limit-order-data';
import { getMakerActiveLimitOrders } from './makers/get-active-orders';
import { increaseNonce } from './makers/increase-nonce';
import { postLimitOrder } from './makers/post-limit-order';
import { signLimitOrderData } from './makers/sign-limit-order';
import { fromBackendSignedLimitOrderToOrderStruct } from './share/types';
import { fillLimitOrders } from './takers/fill-limit-orders';
import { getLimitOrders } from './takers/get-limit-orders';

/**
 * MAKER
 */
async function makeLimitOrderExample() {
  // Step 1: Generate limit order data
  const limitOrderData = await generateLimitOrderData();

  // Step 2: Sign signature
  const signature = await signLimitOrderData(limitOrderData);

  // Step 3: Post limit order to limit order system
  await postLimitOrder(limitOrderData, signature);
}
// void makeLimitOrderExample();

async function cancelOrderExample() {
  // Step 1: Get active orders from limit order's backend
  const limitOrders = await getMakerActiveLimitOrders()
  if (limitOrders.length == 0) {
    throw new Error('Maker does not have any active orders');
  }

  console.log(limitOrders)
  
  // Step 2: Cancel the order
  // In this example, we will cancel the first order fetched from backend
  // await cancelSingleOrder(fromBackendSignedLimitOrderToOrderStruct(limitOrders[0]))
}
// void cancelOrderExample()

async function increaseNonceExample() {
  // Order need to have nonce >= maker's nonce to be able to be filled. So increase nonce will help you to 
  // deactivate all your current orders (suppose that you always make orders with your current nonce)
  await increaseNonce()
}
void increaseNonceExample()

/**
 * TAKER
 */
async function fetchAndFillOrderExample() {
  // Step 1: Fetch the limit orders
  const limitOrdersData = await getLimitOrders();
  console.debug(limitOrdersData);
  // Step 2: Fill the first fetched order
  if (limitOrdersData.length == 0) {
    throw new Error('Can not find any order to fill');
  }
  const orderToFill = limitOrdersData[0];
  await fillLimitOrders([orderToFill]);
}
// void fetchAndFillOrderExample();
