import { EXTERNAL_DOMAIN } from "./const";
import axios from "axios";

interface GetSpotPriceParam {
  chainId: number;
}

interface GetSpotPriceQuery {
  address?: string[];
}

interface GetSpotPriceResponse {
  prices: Record<string, number>;
}

interface GetHistoricalPricesParam {
  chainId: number;
  address: string;
}

interface GetHistoricalPricesQuery {
  timeFrame?: "hour" | "day" | "week";
  timestampStart?: Date;
  timestampEnd?: Date;
}

interface HistoricalPriceData {
  timestamps: number[];
  highs: number[];
  lows: number[];
  opens: number[];
  closes: number[];
}

interface GetHistoricalPricesResponse {
  total: number;
  limit: number;
  currency: string;
  timestampStart: string;
  timestampEnd: string;
  data: HistoricalPriceData;
}

export async function getAssetPrices() {
  // This is an example of how to get all spot prices of assets on Ethereum

  const param: GetSpotPriceParam = {
    chainId: 1, // Ethereum
  };

  const targetPath = `/v1/${param.chainId}/assets/prices`;

  const { data } = await axios.get<GetSpotPriceResponse>(EXTERNAL_DOMAIN + targetPath);

  const { prices } = data;

  const key = Object.keys(prices)[0];
  console.log(`prices of ${key} is ${prices[key]} USD`);
}

export async function getHistoricalAssetPrices() {
  // This is an example of how to get daily historical prices from 2024 Aug 5th to Aug 11st of PT-USDO++ on Ethereum

  const param: GetHistoricalPricesParam = {
    chainId: 1, // Ethereum
    address: '0x270d664d2fc7d962012a787aec8661ca83df24eb' // PT-USD0++ 31OCT 2024
  };

  const query: GetHistoricalPricesQuery = {
    timeFrame: "day",
    timestampStart: new Date("2024-08-05T00:00:00.000+00:00"),
    timestampEnd: new Date("2024-08-11T00:00:00.000+00:00"),
  };

  const targetPath = `/v1/${param.chainId}/assets/${param.address}/historical-prices`;
  const { data: response } = await axios.get<GetHistoricalPricesResponse>(EXTERNAL_DOMAIN + targetPath, { params: query });
  console.log('response data', {total: response.total, limit: response.limit, currency: response.currency, timestampStart: response.timestampStart, timestampEnd: response.timestampEnd});

  const {data} = response;
  console.log('first data point info', {
    timestamp: data.timestamps[0],
    high: data.highs[0],
    low: data.lows[0],
    open: data.opens[0],
    close: data.closes[0],
  })
}