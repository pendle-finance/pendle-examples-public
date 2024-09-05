import { getAssetList } from "./get-list-assets";
import { getActiveMarkets, getInactiveMarkets } from "./get-list-markets";
import { getAssetPrices, getHistoricalAssetPrices } from "./get-asset-prices";
import { getMarketHistoricalData } from "./get-market-historical-data";
import { getSwappingPrices } from "./get-swapping-prices";

async function main() {
  await getAssetList();
  await getActiveMarkets();
  await getInactiveMarkets();
  await getAssetPrices();
  await getSwappingPrices();
  await getHistoricalAssetPrices();
  await getMarketHistoricalData();
}

main()