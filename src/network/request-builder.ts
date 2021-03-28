import request from 'request'
import { Pair, UrlData } from '../types/network'

const API_KEY = 'a0617c2b98a646c69ffdf320431f71df'

const make = <T, K>({ url }: UrlData = { url: '', json: true }) => {

  const requestOptions = {
    baseUrl: 'https://api.twelvedata.com',
    url: url
  }

  return new Promise((resolve: (value: T) => void, reject) => {

    request(requestOptions, (error, { body }) => {
      if (error)
        return reject(error)

      resolve(body)
    })
  })
}

export const requestPair = (pair: Pair) => {
  return requestPairFrom(pair)
}

export const requestPairFrom = async ({ pair, from }: Pair) => {
  return make<Pair, UrlData>({ url: `time_series?symbol=${pair}&interval=5min&apikey=${API_KEY}` })
}