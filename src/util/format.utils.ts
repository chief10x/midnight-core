import { getQueueToken } from "@nestjs/bull";
import { ComplexMeta, ComplexQuote, ComplexResponse } from "src/@types";
import { TDComplexResponse } from "src/@types";
import { Datum } from "../@types/format.types";

export const formatComplexResponse = (res: TDComplexResponse): ComplexMeta[] => {

  if (res.data && res.data[0].values) {


    const quotes = res.data.filter((data) => data.meta.indicator === undefined)

    const metas = []
    res.data.forEach(element => {
      if(element.meta.indicator === undefined){
        metas.push(element.meta)
      }
    });

    const containsIndicators = res.data.length > 1

    const atr = res.data.find((data) => {
      return data.meta.indicator != undefined && data.meta.indicator.name.includes('ATR')
    })

    const ichi = res.data.find((data) => {
      return data.meta.indicator != undefined && data.meta.indicator.name.includes('ICHIMOKU')
    })

    const macd = res.data.find((data) => {
      return data.meta.indicator != undefined && data.meta.indicator.name.includes('MACD')
    })

    const signals = quotes.map((quote, index): ComplexMeta => {
      const q = getQuote(quote, containsIndicators, atr, ichi)
      let meta : ComplexMeta = {
        currency_base: quote.meta.currency_base,
        currency_quote: quote.meta.currency_quote,
        interval: quote.meta.interval,
        symbol: quote.meta.symbol,
        complexQuote: q
      }
      return meta
    })
    console.log(signals);
    return signals
  }
}

function getQuote(quote: Datum,  containsIndicators: boolean, atr: Datum, ichi: Datum) {
  return quote.values.map((quote, index): ComplexQuote => {

    let quoteResponse: ComplexQuote = {
      date: new Date(quote.datetime),
      quotes: {
        high: parseFloat(quote.high),
        low: parseFloat(quote.low),
        open: parseFloat(quote.open),
        close: parseFloat(quote.close),
      },
    }

    if (containsIndicators) {
      quoteResponse = {
        ...quoteResponse,
        indicators: {
          atr: atr === undefined ? undefined : parseFloat(atr.values[index].atr),
          ichi: ichi === undefined ? undefined : parseFloat(ichi.values[index].senkou_span_a)
        }
      }
    }

    return quoteResponse
  })
}