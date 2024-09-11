import { getAssets } from "./get-list-assets";
import { getMarkets } from "./get-list-markets";
import { getAssetPrices, getHistoricalAssetPrices } from "./get-asset-prices";
import { getMarketHistoricalData } from "./get-market-historical-data";

async function main() {
  await getAssets();
  await getMarkets();
  await getAssetPrices();
  await getHistoricalAssetPrices();
  await getMarketHistoricalData();
}

main()