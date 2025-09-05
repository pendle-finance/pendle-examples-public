import axios, { AxiosResponse } from 'axios';
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

type TokenAmountResponse = {
    token: string;
    amount: string;
};

type ContractParamInfo = {
    method: string;
    contractCallParamsName: string[];
    contractCallParams: any[];
};

type TransactionDto = {
    data: string;
    to: string;
    from: string;
    value: string;
};

type ConvertData = {
    priceImpact: number;
    impliedApy?: any;
    effectiveApy?: number;
    paramsBreakdown?: any;
};

type RouteResponse = {
    contractParamInfo: ContractParamInfo;
    tx: TransactionDto;
    outputs: TokenAmountResponse[];
    data: ConvertData;
};

type ConvertResponse = {
    action: string;
    inputs: TokenAmountResponse[];
    requiredApprovals?: TokenAmountResponse[];
    routes: RouteResponse[];
};

export async function callSDK<Data>(path: string, params: Record<string, any> = {}) {
    const response = await axios.get<MethodReturnType<Data>>(HOSTED_SDK_URL + path, {
        params
    });

    return response;
}

export async function callConvertAPI(chainId: number, params: Record<string, any> = {}) {
    const response = await axios.get<ConvertResponse>(HOSTED_SDK_URL + `v2/sdk/${chainId}/convert`, {
        params
    });

    return response;
}

export function printConvertOutput(axiosResponse: AxiosResponse<ConvertResponse>) {
    const resp = axiosResponse.data;
    console.log('Action: ', resp.action);
    console.log('Method: ', resp.routes[0].contractParamInfo.method);
    console.log('Outputs: ', resp.routes[0].outputs);
    console.log('Price impact: ', resp.routes[0].data.priceImpact);
    console.log('Computing unit: ', axiosResponse.headers['x-computing-unit']);
    console.log('\n--------------------------------\n');
}

export function getSigner() {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth');
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    return signer;
}
