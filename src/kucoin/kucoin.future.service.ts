import { sign } from "src/util/kucoinSign";
import fetch from 'node-fetch';
import { kucoinPosition } from "src/@types/kucoin.types";

export class KucoinFutureService {

    async getOpenContracts() {
        const url = "/api/v1/contracts/active"
        const signature = sign(url, {}, 'GET', process.env.SECRET_KEY_FUTURES, process.env.PASSPHRASE_FUTURES, process.env.API_KEY_FUTURES)
        const response = await fetch(process.env.KUCOIN_FUTURES_BASE_URL + url, { method: 'GET', headers: signature.headers });
        if (!response.ok) {
            return response;
        }
        const quote = await response.json();
        return quote;
    }

    async openClosePosition(params: kucoinPosition) {
        const url = "/api/v1/orders"
        const signature = sign(url, params, 'POST', process.env.SECRET_KEY_FUTURES, process.env.PASSPHRASE_FUTURES, process.env.API_KEY_FUTURES)
        const response = await fetch(process.env.KUCOIN_FUTURES_BASE_URL + url, { method: 'POST', headers: signature.headers, body: JSON.stringify(params) });
        if (!response.ok) {
            return response;
        }
        const quote = await response.json();
        return quote;
    }

    async openPositions(symbol: string) {
        const url = `/api/v1/position?symbol=${symbol}`
        const signature = sign(url, {}, 'GET', process.env.SECRET_KEY_FUTURES, process.env.PASSPHRASE_FUTURES, process.env.API_KEY_FUTURES)
        const response = await fetch(process.env.KUCOIN_FUTURES_BASE_URL + url, { method: 'GET', headers: signature.headers });
        if (!response.ok) {
            return response;
        }
        const quote = await response.json();
        return quote;
    }

}