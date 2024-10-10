import { CORE_DOMAIN } from "./const";
import axios from "axios";
import { parse } from "csv-string";

interface GetAssetPricesParam {
  chainId: number;
}

interface GetAssetPricesQuery {
  addresses?: string; // separated by commas, return all asset prices if empty
}

interface GetAssetPricesResponse {
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
  currency: string;
  timeFrame: string;
  timestamp_start: number;
  timestamp_end: number;
  results: string;
}

export async function getAssetPrices() {
  // This is an example of how to get all spot prices of pendle assets on Ethereum

  const param: GetAssetPricesParam = {
    chainId: 1, // Ethereum
  };

  const addressPt_USDe = '0xa8778dd6b7f1f61f2cfda5d3cb18be8f99a8db30'; // address of PT-USDe-26DEC2024
  const addressPt_weETH = '0x6ee2b5e19ecba773a352e5b21415dc419a700d1d'; // address of PT-weETH-26DEC2024

  const addresses = `${addressPt_USDe},${addressPt_weETH}`;

  const query: GetAssetPricesQuery = {
    addresses: addresses
  }

  const targetPath = `/v1/${param.chainId}/assets/prices`;

  const { data } = await axios.get<GetAssetPricesResponse>(CORE_DOMAIN + targetPath, {
    params: query
  });

  const {prices: priceUsdMap} = data;

  console.log(`price of Pt USDe is ${priceUsdMap[addressPt_USDe] ?? 0} USD`);
  console.log(`price of Pt weETH is ${priceUsdMap[addressPt_weETH] ?? 0} USD`);
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

  const targetPath = `/v4/${param.chainId}/prices/${param.address}/ohlcv`;
  const { data: response } = await axios.get<GetHistoricalPricesResponse>(CORE_DOMAIN + targetPath, { params: query });
  console.log('response data', {total: response.total, currency: response.currency, timestamp_start: response.timestamp_start, timestamp_end: response.timestamp_end });

  const {results} = response;

  const data = parse(results, {output: 'objects'})

  console.log('first data point info', {
    timestamp: data[0].time,
    high: data[0].open,
    low: data[0].low,
    open: data[0].open,
    close: data[0].close,
  })
}