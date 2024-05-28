# Pendle Limit Order API Demo

This repository is designed for developers seeking to interact with Pendle Limit Order using TypeScript. For simplicity, the examples are implemented purely in Node.js so that users can focus on the backend logic required to achieve the following Limit Order operations:

* Maker APIs:
  - Generate limit order data (generateLimitOrderData())
  - Sign limit order (signLimitOrderData())
  - Post limit order to backend system (postLimitOrder())
  
* Taker APIs:
  - Fetch limit orders to fill
  - Fill a limit order
  
## Getting Started
To run examples:
- Change directory to the demo project folder: `cd limit-order-api-demo`
- Install required dependencies with `npm install`
- Configure the ethers.js signer in `/src/libs/signer.ts`
- Execute the index.ts file using `npm run start`

## Api specifications
* [Maker](https://api-v2.pendle.finance/limit-order/docs)
* [Taker](https://api-v2.pendle.finance/limit-order/docs)

## Additional Notes

Please be aware that the code examples provided in this repository are for educational purposes and are not intended for production use. They serve as a starting point for integrating Pendle Limit Order functionality into your decentralized application (dApp).
