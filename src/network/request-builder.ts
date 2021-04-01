import request from 'request'
import { TechnicalMethods } from '../config/methods'
import { ComplexRequestBody, Intervals, Methods, Pair, UrlData } from '../types/network'

const make = <T, K>({ url, method = Methods.GET, body }: UrlData = {
  url: '',
  json: true,
  method: Methods.GET
}) => {

  const requestOptions = {
    baseUrl: 'https://api.twelvedata.com',
    url: `${url}`,
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
    url: `time_series?symbol=${pair}&interval=5min&outputsize=5&apikey=${process.env.api_key2}`,
  })
}

export const requestPairFromQuery = async (query: string) => {
  return make<Pair, UrlData>({
    url: `time_series?${query}&apikey=${process.env.api_key2}`,
  })
}

export const requestComplexFrom = async (body: ComplexRequestBody) => {
  return make<Pair, UrlData>({
    url: `complex_data?apikey=${process.env.api_key2}`,
    method: Methods.POST,
    body: JSON.stringify(body)
  })
}