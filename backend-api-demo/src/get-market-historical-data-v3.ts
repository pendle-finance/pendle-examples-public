import { CORE_DOMAIN } from "./const";
import axios from "axios";

interface Param {
  chainId: number;
  address: string;
}

interface Query {
  time_frame?: "hour" | "day" | "week";
  timestamp_start?: string;
  timestamp_end?: string;
  fields?: string;
  includeApyBreakdown?: boolean;
  includeFeeBreakdown?: boolean;
}

interface ApyItem {
  id: string;
  apy: number;
  tags: string[];
  source?: string;
  campaignDetail?: {
    amount: number;
    startTimestamp: string;
    endTimestamp: string;
  };
}

interface ApyCategory {
  label: string;
  apy: number;
  items: ApyItem[];
}

interface ApyBreakdown {
  categories: ApyCategory[];
}

interface DataPoint {
  timestamp: Date;

  // APY fields
  maxApy?: number;
  baseApy?: number;
  underlyingApy?: number;
  impliedApy?: number;
  underlyingInterestApy?: number;
  underlyingRewardApy?: number;
  ytFloatingApy?: number;
  swapFeeApy?: number;
  voterApr?: number;
  pendleApy?: number;
  lpRewardApy?: number;
  aggregatedApy?: number;

  // TVL and supply
  tvl?: number;
  totalTvl?: number;
  totalPt?: number;
  totalSy?: number;
  totalSupply?: number;

  // Prices
  ptPrice?: number;
  ytPrice?: number;
  syPrice?: number;
  lpPrice?: number;

  // Other metrics
  lastEpochVotes?: number;
  tradingVolume?: number;

  // Fee breakdown (only for daily/weekly timeframes when includeFeeBreakdown=true)
  explicitSwapFee?: number;
  implicitSwapFee?: number;
  limitOrderFee?: number;

  // APY breakdowns (only when includeApyBreakdown=true)
  ytApyBreakdown?: ApyBreakdown;
  lpApyBreakdown?: ApyBreakdown;
}

interface Response {
  total: number;
  timestamp_start: string;
  timestamp_end: string;
  results: DataPoint[];
}

export async function getMarketHistoricalDataV3() {
  // This example shows how to get historical data with detailed APY breakdown

  const param: Param = {
    chainId: 1, // Ethereum
    address: '0xc5b32dba5f29f8395fb9591e1a15f23a75214f33', // USDG
  }

  const query: Query = {
    time_frame: 'day',
    fields: 'timestamp,impliedApy,underlyingApy,ytFloatingApy,aggregatedApy,tvl,totalTvl,ptPrice,ytPrice,tradingVolume',
    includeApyBreakdown: true, // Enable detailed APY breakdown
  }

  const targetPath = `/v3/${param.chainId}/markets/${param.address}/historical-data`;

  const { data: response } = await axios.get<Response>(CORE_DOMAIN + targetPath, { params: query });

  console.log('Response metadata:', {
    total: response.total,
    timestamp_start: response.timestamp_start,
    timestamp_end: response.timestamp_end,
    dataPoints: response.results.length,
  });

  const firstDataPoint = response.results[0];
  if (!firstDataPoint) {
    console.log('No data points returned');
    return;
  }

  console.log('\nFirst data point:');
  console.log('  Timestamp:', new Date(firstDataPoint.timestamp).toISOString());
  console.log('  Implied APY:', firstDataPoint.impliedApy);
  console.log('  Underlying APY:', firstDataPoint.underlyingApy);
  console.log('  YT Floating APY:', firstDataPoint.ytFloatingApy);
  console.log('  Aggregated APY:', firstDataPoint.aggregatedApy);
  console.log('  TVL:', firstDataPoint.tvl);
  console.log('  Total TVL:', firstDataPoint.totalTvl);
  console.log('  PT Price:', firstDataPoint.ptPrice);
  console.log('  YT Price:', firstDataPoint.ytPrice);
  console.log('  Trading Volume:', firstDataPoint.tradingVolume);

  if (query.includeFeeBreakdown && firstDataPoint.explicitSwapFee !== undefined) {
    console.log('\nFee Breakdown:');
    console.log('  Explicit Swap Fee:', firstDataPoint.explicitSwapFee);
    console.log('  Implicit Swap Fee:', firstDataPoint.implicitSwapFee);
    console.log('  Limit Order Fee:', firstDataPoint.limitOrderFee);
  }

  if (firstDataPoint.ytApyBreakdown) {
    console.log('\nYT APY Breakdown:');
    firstDataPoint.ytApyBreakdown.categories.forEach((category: ApyCategory) => {
      console.log(`\n  ${category.label}: ${category.apy}`);
      category.items.forEach((item: ApyItem) => {
        console.log(`    - Asset ${item.id}: ${item.apy}`);
        console.log(`      Tags: ${item.tags.join(', ')}`);
        if (item.source) console.log(`      Source: ${item.source}`);
        if (item.campaignDetail) {
          console.log(`      Campaign: ${item.campaignDetail.amount} (${item.campaignDetail.startTimestamp} to ${item.campaignDetail.endTimestamp})`);
        }
      });
    });
  }

  if (firstDataPoint.lpApyBreakdown) {
    console.log('\nLP APY Breakdown:');
    firstDataPoint.lpApyBreakdown.categories.forEach((category: ApyCategory) => {
      console.log(`\n  ${category.label}: ${category.apy}`);
      category.items.forEach((item: ApyItem) => {
        console.log(`    - Asset ${item.id}: ${item.apy}`);
        console.log(`      Tags: ${item.tags.join(', ')}`);
        if (item.source) console.log(`      Source: ${item.source}`);
        if (item.campaignDetail) {
          console.log(`      Campaign: ${item.campaignDetail.amount} (${item.campaignDetail.startTimestamp} to ${item.campaignDetail.endTimestamp})`);
        }
      });
    });
  }
}
