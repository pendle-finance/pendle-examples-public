import axios from "axios";
import { CORE_DOMAIN } from "./const";

interface Query {
  chainId?: number;
  type?: string; // PT, YT, SY, LP
  address?: string;
  q?: string; // Search query
}

interface AssetInfo {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  expiry?: string;
  tags: string[];
  type: string;
  underlyingAsset?: string;
  protocol?: string;
  yieldBearingAsset?: string;
}

interface Response {
  assets: AssetInfo[];
}

export async function getPendleAssets() {
  // This example shows how to get all Pendle assets across all chains
  // using the /v1/assets/all cross-chain endpoint

  const query: Query = {
    // chainId: 1, // Optional: filter by specific chain
    // type: 'PT', // Optional: filter by asset type (PT, YT, SY, LP)
  };

  const targetPath = `/v1/assets/all`;

  const { data } = await axios.get<Response>(CORE_DOMAIN + targetPath, { params: query });

  console.log('Total assets:', data.assets.length);

  if (data.assets.length > 0) {
    const firstAsset = data.assets[0];
    console.log('\nFirst asset:');
    console.log('  Chain:', firstAsset.chainId);
    console.log('  Address:', firstAsset.address);
    console.log('  Name:', firstAsset.name);
    console.log('  Symbol:', firstAsset.symbol);
    console.log('  Type:', firstAsset.type);
    console.log('  Decimals:', firstAsset.decimals);
    if (firstAsset.expiry) {
      console.log('  Expiry:', new Date(firstAsset.expiry).toISOString());
    }
    console.log('  Tags:', firstAsset.tags.join(', '));
  }
}
