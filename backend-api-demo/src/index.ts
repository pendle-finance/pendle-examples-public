import { getPendleAssets } from "./get-list-assets";
import { getAllMarkets } from "./get-all-markets";
import { getAssetPrices, getHistoricalAssetPrices } from "./get-asset-prices";
import { getMarketHistoricalDataV3 } from "./get-market-historical-data-v3";

async function main() {
  await getPendleAssets();
  await getAssetPrices();
  await getHistoricalAssetPrices();
  await getAllMarkets();
  await getMarketHistoricalDataV3();
}

main()