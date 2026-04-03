import axios from "axios";
import { CORE_DOMAIN } from "./const";

interface Query {
  skip?: number;
  limit?: number;
  chainId?: number;
  isActive?: boolean;
  ids?: string; // Comma-separated market IDs (e.g., "1-0x...,42161-0x...")
}

interface PointMetadata {
  pointName: string;
  chainId: number;
  multiplier: number;
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

interface YieldRange {
  min: number;
  max: number;
}

interface MarketDetails {
  liquidity: number;
  totalTvl: number;
  tradingVolume: number;
  underlyingApy: number;
  swapFeeApy: number;
  pendleApy: number;
  ytFloatingApy: number;
  impliedApy: number;
  feeRate: number;
  yieldRange: YieldRange;
  aggregatedApy: number;
  maxBoostedApy: number;
  totalPt: number;
  totalSy: number;
  totalSupply: number;
  totalActiveSupply: number;
  ytRoi?: number;
  ptRoi?: number;
}

interface ExternalProtocolInfo {
  id: string;
  name: string;
  iconUrl: string;
  category: string;
  url: string;
  description?: string;
}

interface ExternalProtocolMetadata {
  protocol: ExternalProtocolInfo;
  integrationUrl: string;
  description: string;
  curatorAddress?: string;
  subtitle?: string;
  liquidity?: number;
  borrowApy?: number;
  supplyApy?: number;
  totalSupply?: number;
  supplyCap?: number;
  maxLtv?: number;
  chainId: number;
  spokeAddress?: string;
}

interface MarketExternalProtocols {
  pt: ExternalProtocolMetadata[];
  yt: ExternalProtocolMetadata[];
  lp: ExternalProtocolMetadata[];
  crossPt: ExternalProtocolMetadata[];
}

interface IncentiveCampaign {
  campaignName: string;
  assetId: string;
  rewardToken: string;
  amount: number;
  epochTimestamp: Date;
  nextEpochTimestamp: Date;
}

interface LimitOrderIncentive {
  mode: string;
  amountPerSec: number;
  impliedApy: number;
  minApy: number;
  maxApy: number;
  estimatedYtApr?: number;
  estimatedPtApr?: number;
}

interface PendleEmission {
  totalIncentive: number;
  tvlIncentive: number;
  feeIncentive: number;
  discretionaryIncentive: number;
  cobribingIncentive: number;
}

interface RewardApyBreakdown {
  asset: string;
  absoluteApy: number;
  relativeApy: number;
  source?: string;
  ytExclusive?: boolean;
  lpExclusive?: boolean;
  portalExtData?: {
    amount: number;
    startTimestamp: string;
    endTimestamp: string;
  };
}

interface MarketData {
  chainId: number;
  address: string;
  name: string;
  expiry: string;

  pt: string;
  yt: string;
  sy: string;
  underlyingAsset: string;
  accountingAsset: string;
  rewardTokens: string[];
  inputTokens: string[];
  outputTokens: string[];
  details: MarketDetails;
  ytApyBreakdown?: ApyBreakdown;
  lpApyBreakdown?: ApyBreakdown;
  underlyingRewardApyBreakdown?: RewardApyBreakdown[];
  lpRewardApyBreakdown?: RewardApyBreakdown[];
  isNew: boolean;
  isPrime: boolean;
  timestamp: Date;
  lpWrapper?: string;
  categoryIds: string[];
  isVolatile?: boolean;
  points?: PointMetadata[];
  externalProtocols?: MarketExternalProtocols;
  incentiveCampaigns?: IncentiveCampaign[];
  limitOrderIncentive?: LimitOrderIncentive;
  pendleEmission?: PendleEmission;
}

interface Response {
  results: MarketData[];
  total: number;
  skip: number;
  limit: number;
}

export async function getAllMarkets() {
  // This example shows how to get all markets across all chains

  const query: Query = {
    skip: 0,
    limit: 10, // Max 100
    isActive: true, // Only active markets
    // chainId: 1, // Optional: filter by specific chain (e.g., Ethereum)
  };

  const targetPath = `/v2/markets/all`;

  const { data } = await axios.get<Response>(CORE_DOMAIN + targetPath, { params: query });

  console.log('Pagination info:', {
    total: data.total,
    skip: data.skip,
    limit: data.limit,
    returned: data.results.length,
  });

  const firstMarket = data.results[0];
  if (firstMarket) {
    console.log('\nFirst market:');
    console.log('  Name:', firstMarket.name);
    console.log('  Chain:', firstMarket.chainId);
    console.log('  Address:', firstMarket.address);
    console.log('  Expiry:', new Date(firstMarket.expiry).toISOString());
    console.log('  Is New:', firstMarket.isNew);
    console.log('  Is Prime:', firstMarket.isPrime);

    console.log('\nAsset IDs:');
    console.log('  PT:', firstMarket.pt);
    console.log('  YT:', firstMarket.yt);
    console.log('  SY:', firstMarket.sy);
    console.log('  Underlying:', firstMarket.underlyingAsset);

    console.log('\nMarket Details:');
    console.log('  TVL:', firstMarket.details.totalTvl);
    console.log('  Liquidity:', firstMarket.details.liquidity);
    console.log('  Trading Volume (24h):', firstMarket.details.tradingVolume);
    console.log('  Implied APY:', firstMarket.details.impliedApy);
    console.log('  Underlying APY:', firstMarket.details.underlyingApy);
    console.log('  YT Floating APY:', firstMarket.details.ytFloatingApy);
    console.log('  Swap Fee APY:', firstMarket.details.swapFeeApy);
    console.log('  Pendle APY:', firstMarket.details.pendleApy);
    console.log('  Aggregated APY:', firstMarket.details.aggregatedApy);
    console.log('  Max Boosted APY:', firstMarket.details.maxBoostedApy);

    if (firstMarket.ytApyBreakdown) {
      console.log('\nYT APY Breakdown:');
      firstMarket.ytApyBreakdown.categories.forEach((category: ApyCategory) => {
        console.log(`\n  ${category.label}: ${category.apy}`);
        category.items.forEach((item: ApyItem) => {
          console.log(`    - Asset ${item.id}: ${item.apy}`);
          console.log(`      Tags: ${item.tags.join(', ')}`);
          if (item.source) console.log(`      Source: ${item.source}`);
        });
      });
    }

    if (firstMarket.lpApyBreakdown) {
      console.log('\nLP APY Breakdown:');
      firstMarket.lpApyBreakdown.categories.forEach((category: ApyCategory) => {
        console.log(`\n  ${category.label}: ${category.apy}`);
        category.items.forEach((item: ApyItem) => {
          console.log(`    - Asset ${item.id}: ${item.apy}`);
          console.log(`      Tags: ${item.tags.join(', ')}`);
          if (item.source) console.log(`      Source: ${item.source}`);
        });
      });
    }

    if (firstMarket.points && firstMarket.points.length > 0) {
      console.log('\nPoints:');
      firstMarket.points.forEach((point: PointMetadata) => {
        console.log(`  - ${point.pointName}: ${point.multiplier}x`);
      });
    }

    if (firstMarket.pendleEmission) {
      console.log('\nPendle Emission (weekly):');
      console.log('  Total:', firstMarket.pendleEmission.totalIncentive);
      console.log('  TVL-based:', firstMarket.pendleEmission.tvlIncentive);
      console.log('  Fee-based:', firstMarket.pendleEmission.feeIncentive);
      console.log('  Discretionary:', firstMarket.pendleEmission.discretionaryIncentive);
      console.log('  Co-bribing:', firstMarket.pendleEmission.cobribingIncentive);
    }

    if (firstMarket.externalProtocols) {
      const { pt, yt, lp } = firstMarket.externalProtocols;
      if (pt.length > 0 || yt.length > 0 || lp.length > 0) {
        console.log('\nExternal Protocol Integrations:');
        if (pt.length > 0) console.log(`  PT integrations: ${pt.length}`);
        if (yt.length > 0) console.log(`  YT integrations: ${yt.length}`);
        if (lp.length > 0) console.log(`  LP integrations: ${lp.length}`);
      }
    }
  }

  // Example: Fetch next page
  // const nextQuery: Query = {
  //   skip: data.skip + data.limit,
  //   limit: 10,
  //   isActive: true,
  // };
  // const { data: nextPage } = await axios.get<Response>(CORE_DOMAIN + targetPath, { params: nextQuery });
}
