export enum LimitOrderType {
  TOKEN_FOR_PT,
  PT_FOR_TOKEN,
  TOKEN_FOR_YT,
  YT_FOR_TOKEN,
}

// OrderStruct has the same schema with struct Order on contract
export interface OrderStruct {
  salt: string;
  expiry: string;
  nonce: string;
  orderType: LimitOrderType;
  token: string;
  YT: string;
  maker: string;
  receiver: string;
  makingAmount: string;
  lnImpliedRate: string;
  failSafeRate: string;
  permit: string;
}

export type BackendSignedLimitOrder = Omit<OrderStruct, 'YT' | 'orderType'> & {
  id: string;
  signature: string;
  type: LimitOrderType;
  yt: string;
}

// SignedLimitOrder with some supported fields
export interface SignedLimitOrderInfo {
  order: BackendSignedLimitOrder;
  makingAmount: string;
  netFromTaker: string;
  netToTaker: string;
}


export function fromBackendSignedLimitOrderToOrderStruct(order: BackendSignedLimitOrder) {
  return {
    salt: order.salt,
    expiry: order.expiry,
    nonce: order.nonce,
    orderType: order.type,
    token: order.token,
    YT: order.yt,
    maker: order.maker,
    receiver: order.receiver,
    makingAmount: order.makingAmount,
    lnImpliedRate: order.lnImpliedRate,
    failSafeRate: order.failSafeRate,
    permit: order.permit,
  } satisfies OrderStruct;
}
