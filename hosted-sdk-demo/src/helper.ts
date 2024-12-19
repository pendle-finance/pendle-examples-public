import axios from 'axios';
import { ethers } from 'ethers';

const HOSTED_SDK_URL = 'https://api-v2.pendle.finance/core/';
export const LIMIT_ORDER_URL = 'https://api-v2.pendle.finance/limit-order/'

type MethodReturnType<Data> = {
    tx: {
        data: string;
        to: string;
        value: string;
    };
    data: Data;
};

export async function callSDK<Data>(path: string, params: Record<string, any> = {}) {
    const response = await axios.get<MethodReturnType<Data>>(HOSTED_SDK_URL + path, {
        params
    });

    return response.data;
}

export function getSigner() {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth');
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    return signer;
}