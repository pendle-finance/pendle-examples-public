import axios from "axios";
import { CHAIN_ID, ORDER_ID, USER_ADDRESS } from "./constants";
import { callSDK, getSigner, LIMIT_ORDER_URL } from "./helper";
import { LimitOrderResponse } from "./types";

export async function cancelAll() {
    // Cancel all limit orders on <CHAIN_ID> made by <USER_ADDRESS>
    const res = await callSDK(`v1/sdk/${CHAIN_ID}/limit-order/cancel-all`, {
        userAddress: USER_ADDRESS,
    });

    // Send tx
    getSigner().sendTransaction(res.tx);
}

export async function cancelSingle() {
    // Get order with <ORDER_ID>
    const {
        data: orderData
    } = await axios.get<LimitOrderResponse>(LIMIT_ORDER_URL + `/v1/limit-order/${ORDER_ID}`, {});

    // Cancel the order
    const res = await callSDK(`v1/sdk/${CHAIN_ID}/limit-order/cancel-single`, {
        userAddress: USER_ADDRESS,
        salt: orderData.salt,
        expiry: orderData.expiry,
        nonce: orderData.nonce,
        orderType: orderData.type,
        token: orderData.token,
        YT: orderData.yt,
        maker: orderData.maker,
        receiver: orderData.receiver,
        makingAmount: orderData.makingAmount,
        lnImpliedRate: orderData.lnImpliedRate,
        failSafeRate: orderData.failSafeRate,
        permit: orderData.permit,
    });

    // Send tx
    getSigner().sendTransaction(res.tx);
}