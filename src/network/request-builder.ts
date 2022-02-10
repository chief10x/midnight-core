import request, { CoreOptions } from 'request'
import { TechnicalMethods } from '../config/methods'
import { SignalDetectorProps } from '../singal/SignalDetector'
import { AlarmData } from '../types/alarm-hook'
import { ComplexRequestBody, ComplexResponse, Currencies, Intervals, ListOrder, Methods, Pair, UrlData } from '../types/network'
import { now } from '../utils/formatter'
import { complexDataBody } from './body-creator'

const make = <T, K>({ url, method = Methods.GET, body }: UrlData = {
  url: '',
  json: true,
  method: Methods.GET
}) => {

  const requestOptions = {
    baseUrl: 'https://api.twelvedata.com',
    url: url,
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

export const requestComplexFrom = async (props: SignalDetectorProps) => {

  const body = complexDataBody(props)

  return make<ComplexResponse, UrlData>({
    url: `complex_data?apikey=${process.env.api_key2}`,
    method: Methods.POST,
    body: JSON.stringify(body)
  })
}

export const sendMessageToDiscord = async (data: AlarmData) => {
  //const url = process.env.DISCORD_HOOK || ''
  const url = 'https://discordapp.com/api/webhooks/941341047223635978/blci76B9oa9ar-BC7WtBZUBjQy2GUiOAR0OabF6TRI9rzS5iC736_2zQPnZvgwcy2rn2'

  const title = `<:sus:930429523642708038> **${data.ticker}**\n`
  const content = `${title}*${data.close}* Movement with Volume of ${data.volume}`

  const body = {
    "content": content
  }

  request.post(url, { form: body })
}