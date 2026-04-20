# Pendle Socket.IO Demo

Examples of consuming Pendle V2 real-time feeds over Socket.IO.

## Connection

- URL: `https://api-v2.pendle.finance`
- Namespace: `/pendle-v2`
- Transport: `websocket`

To join a room, emit `subscribe` with the room id string. To leave, emit `unsubscribe` with the same id. Events are delivered on the room; the event name depends on the feed (see each example).

Shared helpers live in [`src/share/`](src/share).

## Examples

| Feed | Directory | Event | Room id |
|---|---|---|---|
| Order book snapshots (every 5s, whitelisted-pro markets, 4 precisions) | [`src/order-book`](src/order-book) | `order-book` | `market:<chainId>-<marketAddress>:order-book:precision-<0\|1\|2\|3>` |

More feeds will be added here as they come online.

## Run

```bash
cd socket-io-demo
npm install
npm start
```

`src/index.ts` is the entry point — switch which example runs by editing that file.
