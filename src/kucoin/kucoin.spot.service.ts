import { sign } from "src/util/kucoinSign";
import fetch from 'node-fetch';
import { kucoinOrder } from "src/@types/kucoin.types";

export class KucoinSpotService {

    async addOrder(params: kucoinOrder) {
        const signature = sign(process.env.ADD_ORDER, params, 'POST', process.env.API_SECRET_SPOT, process.env.API_PASSPHRASE_SPOT, process.env.API_KEY_SPOT)
        const response = await fetch(process.env.KUCOIN_BASE_URL + process.env.ADD_ORDER_URL, { method: 'POST', headers: signature.headers, body: JSON.stringify(params) });
        if (!response.ok) {
            return response;
        }
        const quote = await response.json();
        return quote;
    }

    async getAccountInfo() {
        const signature = sign(process.env.ACCOUNT_INFO_URL, {}, 'GET', process.env.API_SECRET_SPOT, process.env.API_PASSPHRASE_SPOT, process.env.API_KEY_SPOT)
        const response = await fetch(process.env.KUCOIN_BASE_URL + process.env.ACCOUNT_INFO_URL, { method: 'GET', headers: signature.headers });
        if (!response.ok) {
            return response
        }
        const quote = await response.json();
        return quote
    }

    async getSymbols() {
        const signature = sign(process.env.GET_SYMBOL_URL, {}, 'GET', process.env.API_SECRET_SPOT, process.env.API_PASSPHRASE_SPOT, process.env.API_KEY_SPOT)
        const response = await fetch(process.env.KUCOIN_BASE_URL + process.env.GET_SYMBOL_URL, { method: 'GET', headers: signature.headers });
        if (!response.ok) {
            return response;
        }
        const quote = await response.json();
        return quote;
    }

    async getOrderByID(orderID: number) {
        const url = `${process.env.GET_ORDER_BY_ID_URL}/${orderID}`
        const signature = sign(url, {}, 'GET', process.env.API_SECRET_SPOT, process.env.API_PASSPHRASE_SPOT, process.env.API_KEY_SPOT)
        const response = await fetch(process.env.KUCOIN_BASE_URL + url, { method: 'GET', headers: signature.headers });
        if (!response.ok) {
            return response;
        }
        const quote = await response.json();
        return quote;
    }

    async cancelOrder(orderID: number) {
        const url = `${process.env.CANCEL_ORDER_BY_ID_URL}/${orderID}`
        const signature = sign(url, {}, 'DELETE', process.env.API_SECRET_SPOT, process.env.API_PASSPHRASE_SPOT, process.env.API_KEY_SPOT)
        const response = await fetch(process.env.KUCOIN_BASE_URL + url, { method: 'DELETE', headers: signature.headers });
        if (!response.ok) {
            return response;
        }
        const quote = await response.json();
        return quote;
    }

}