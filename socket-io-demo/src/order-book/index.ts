import { connect, subscribe } from '../share/socket';
import { ORDER_BOOK_EVENT, PrecisionDecimal, SAMPLE_MARKET, orderBookRoom } from './constants';
import { OrderBookPayload } from './types';

export async function streamOrderBookExample() {
  const socket = connect();

  socket.on('connect', () => {
    console.log(`connected: socketId=${socket.id}`);

    const precision: PrecisionDecimal = 2;
    const room = orderBookRoom(SAMPLE_MARKET.chainId, SAMPLE_MARKET.address, precision);

    console.log(`subscribing to ${room}`);
    subscribe(socket, room);
  });

  socket.on(ORDER_BOOK_EVENT, (payload: OrderBookPayload) => {
    const bestLong = payload.longYieldEntries[0];
    const bestShort = payload.shortYieldEntries[0];
    console.log(
      `order-book update: long top=${bestLong?.impliedApy ?? 'n/a'} (${payload.longYieldEntries.length} entries), ` +
        `short top=${bestShort?.impliedApy ?? 'n/a'} (${payload.shortYieldEntries.length} entries)`,
    );
  });

  socket.on('disconnect', (reason) => {
    console.log(`disconnected: ${reason}`);
  });

  socket.on('connect_error', (err) => {
    console.error(`connect_error: ${err.message}`);
  });
}
