import { SignalDetectorProps } from '../signal/SignalDetector'
import { AlarmData } from './types/alarmHook'
import { ComplexRequestBody, ComplexResponse, Currencies, Intervals, ListOrder, Methods, Pair, UrlData } from './types/network'
import { complexBody } from './bodyCreator'
import fetch from 'node-fetch';

var headers = {
  'Content-Type': 'application/json',
};

export class RequestBuilder {

  make = <T, K>({ url, method = Methods.GET, body }: UrlData = {
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
          fetch(requestOptions.baseUrl  +"/"+ requestOptions.url).then((res) => {
            return res.json()
          }).then((json) => {
            resolve(json)
          }).catch((e) => {
            return reject(e)
          })
          break
        case Methods.POST: {
          console.log(requestOptions, body);

          fetch(requestOptions.baseUrl + "/" + requestOptions.url, {
            body: body,
            method: 'post',
            headers: headers
          }).then((res) => {
            return res.json()
          }).then((json) => {
            resolve(json)
          }).catch((e) => {
            return reject(e)
          })
        }
      }
    })
  }

  requestPair = (pair: Pair) => {
    return this.requestPairFrom(pair)
  }

  requestPairFrom = async ({ pair, from }: Pair) => {
    return this.make<Pair, UrlData>({
      url: `time_series?symbol=${pair}&interval=5min&outputsize=5&apikey=${process.env.api_key2}`,
    })
  }

  requestPairFromQuery = async (query: string) => {
    return this.make<Pair, UrlData>({
      url: `${query}&apikey=${process.env.api_key2}`,
    })
  }

  async requestComplexFrom(props: SignalDetectorProps) {

    const body = complexBody(props)

    return this.make<string, UrlData>({
      url: `complex_data?apikey=${process.env.api_key2}`,
      method: Methods.POST,
      body: JSON.stringify(body)
    })
  }

  async sendMessageToDiscord(data: AlarmData) {
    const baseUrl = process.env.DISCORD_BASE || ""
    const url = process.env.DISCORD_HOOK || ""

    const title = `<:sus:930429523642708038> **${data.ticker}**\n`
    const content = `${title}*${data.close}* Movement with Volume of ${data.volume}`

    const body = {
      "content": content
    }

    const requestOptions = {
      baseUrl: baseUrl,
      url: url,
    }

    await fetch(requestOptions.baseUrl+"/" + requestOptions.url, {
      body: body,
      method: 'post',
      headers: headers
    }).catch((e) => {

    })
  }
}