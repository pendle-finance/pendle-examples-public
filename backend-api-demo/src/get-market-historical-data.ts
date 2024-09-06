import { CORE_DOMAIN } from "./const";
import axios from "axios";
import { parse } from "csv-string";

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
  timestamp_start: string;
  timestamp_end: string;
  results: string;
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

  const targetPath = `/v2/${param.chainId}/markets/${param.address}/apy-history`;

  const { data: response } = await axios.get<Response>(CORE_DOMAIN + targetPath, {params: query});

  console.log('response data', {total: response.total, timestamp_start: response.timestamp_start, timestamp_end: response.timestamp_end });

  const {results} = response;

  const data = parse(results, {output: 'objects'})

  console.log('first data point info', {
    timestamp: data[0].timestamp,
    underlyingApy: data[0].underlyingApy,
    impliedApy: data[0].impliedApy,
  })
}