import { EXTERNAL_DOMAIN } from "./const";
import axios from "axios";

interface Param {
  chainId: number;
  address: string;
}

interface Query {
  timeFrame?: "hour" | "day" | "week";
  timestampStart?: Date;
  timestampEnd?: Date;
}

interface MarketHistoricalData {
  timestamps: number[];
  underlyingApys: number[];
  impliedApys: number[];
}

interface Response {
  total: number;
  limit: number;
  currency: string;
  timestampStart: string;
  timestampEnd: string;
  data: MarketHistoricalData;
}

export async function getMarketHistoricalData() {
  // This is an example of how to get daily historical data from 2024 Aug 5th to Aug 11st of USDO++ market on Ethereum

  const param: Param = {
    chainId: 1, // Ethereum
    address: '0x00b321d89a8c36b3929f20b7955080baed706d1b', // USDO++
  }

  const query: Query = {
    timeFrame: 'day',
    timestampStart: new Date("2024-08-05T00:00:00.000+00:00"),
    timestampEnd: new Date("2024-08-11T00:00:00.000+00:00"),
  }

  const targetPath = `/v1/${param.chainId}/markets/${param.address}/historical-data`;

  const { data: response } = await axios.get<Response>(EXTERNAL_DOMAIN + targetPath, {params: query});
  console.log('response data', {total: response.total, limit: response.limit, timestampStart: response.timestampStart, timestampEnd: response.timestampEnd});

  const {data} = response;
  console.log('first data point info', {
    timestamp: data.timestamps[0],
    underlyingApy: data.underlyingApys[0],
    impliedApy: data.impliedApys[0],
  })
}