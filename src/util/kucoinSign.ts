import crypto from 'crypto'
import qs from 'querystring'

export function sign(endpoint: string, params: any, method: string, secretKey: string, passphrase: string, apiKey: string) {
    let header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let nonce = Date.now() + ''
    let strForSign = ''
    if (method === 'GET' || method === 'DELETE') {
        strForSign = nonce + method + endpoint + formatQuery(params)
    } else {
        strForSign = nonce + method + endpoint + JSON.stringify(params)
    }
    let signatureResult = crypto.createHmac('sha256', secretKey)
        .update(strForSign)
        .digest('base64')
    let passphraseResult = crypto.createHmac('sha256', secretKey)
        .update(passphrase)
        .digest('base64')
    header.headers['KC-API-SIGN'] = signatureResult
    header.headers['KC-API-TIMESTAMP'] = nonce
    header.headers['KC-API-KEY'] = apiKey
    header.headers['KC-API-PASSPHRASE'] = passphraseResult
    header.headers['KC-API-KEY-VERSION'] = 2
    return header
}

function formatQuery(queryObj) {
    if (JSON.stringify(queryObj).length !== 2) {
        return '?' + qs.stringify(queryObj)
    } else {
        return ''
    }
}