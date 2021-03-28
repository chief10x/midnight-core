import request from 'request'
import { TechnicalMethods } from '../config/methods'
import { Methods, Pair, UrlData } from '../types/network'

const API_KEY = 'a0617c2b98a646c69ffdf320431f71df'

const make = <T, K>({ url, method, body }: UrlData = {
  url: '',
  json: true,
  method: Methods.GET
}) => {

  const requestOptions = {
    baseUrl: 'https://api.twelvedata.com',
    url: url
  }

  return new Promise((resolve: (value: T) => void, reject) => {

    switch (method) {
      case Methods.GET:
        request(requestOptions, (error, { body }) => {
          if (error)
            return reject(error)

          resolve(body)
        })
        break
      case Methods.POST: {
        request.post(requestOptions, (error, { body }) => {
          if (error)
            return reject(error)

          resolve(body)
        }).form(body)
      }
    }
  })
}

export const requestPair = (pair: Pair) => {
  return requestPairFrom(pair)
}

export const requestPairFrom = async ({ pair, from }: Pair) => {
  return make<Pair, UrlData>({
    url: `time_series?symbol=${pair}&interval=5min&outputsize=5&apikey=${API_KEY}`,
  })
}

export const requestComplexFrom = async ({ pair, from, to }: Pair) => {

  const body = {
    symbols: [pair],
    intervals: ["1day"],
    start_date: '2021-03-21',
    end_data: '2021-03-25',
    methods: [
      TechnicalMethods.TimeSeries,
      TechnicalMethods.ATR,
    ]
  }

  return make<Pair, UrlData>({
    url: `complex_data?apikey=${API_KEY}`,
    method: Methods.POST,
    body: JSON.stringify(body)
  })
}