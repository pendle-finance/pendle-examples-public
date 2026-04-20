export interface OrderBookEntry {
  impliedApy: number;
  pySize: string;
  notionalSize: string;
  ammSize?: string;
  incentiveQualifiedPySize?: string;
}

export interface OrderBookPayload {
  longYieldEntries: OrderBookEntry[];
  shortYieldEntries: OrderBookEntry[];
}
