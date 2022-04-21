export type kucoinOrder = {
    clientOid: string;
    side: kucoinOrderSide;
    symbol: string;
    type: kucoinOrderType;
    tradeType: 'TRADE';
    size: number;
}

export enum kucoinOrderSide {
    BUY = 'buy',
    SELL = 'sell'
}

export enum kucoinOrderType {
    LIMIT = 'limit',
    MARKET = 'market'
}

export type kucoinPosition = {
    clientOid: string;
    side: kucoinOrderSide;
    symbol: string;
    type: kucoinOrderType;
    leverage: number;
    closeOrder: boolean;
    size: number;
}
