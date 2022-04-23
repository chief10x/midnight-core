import { ComplexMeta, ComplexQuote, ComplexInterval, Intervals } from "src/@types";
import { TDComplexResponse } from "src/@types";
import { Datum } from "../@types/format.types";

export const formatComplexResponse = (res: TDComplexResponse): ComplexMeta[] => {

  if (res.data && res.data[0].values) {
    const uniqueSymbols = [...new Map(res.data.map(item =>[item.meta['symbol'], item.meta])).values()];
    const uniqueIntervals = [...new Set(res.data.flatMap(({ meta }) => meta.interval))].sort()

    const containsIndicators = res.data.length > 1

    const metas: ComplexMeta[] = []
    uniqueSymbols.map((meta: any) => {
      const inters: ComplexInterval[] = uniqueIntervals.map((interval: Intervals) => {
        const quotes: ComplexQuote[][] = res.data.filter((data1) => data1.meta.symbol === meta.symbol && data1.meta.interval === interval && data1.meta.indicator === undefined).map((data2) => {
          const atr = res.data.find((data) => {
            return data.meta.interval == data2.meta.interval && data.meta.indicator != undefined && data.meta.indicator.name.includes('ATR')
          })
          const ichi = res.data.find((data) => {
            return data.meta.interval == data2.meta.interval && data.meta.indicator != undefined && data.meta.indicator.name.includes('ICHIMOKU')
          })
          const macd = res.data.find((data) => {
            return data.meta.interval == data2.meta.interval && data.meta.indicator != undefined && data.meta.indicator.name.includes('MACD')
          })
          console.log(getQuote(data2, containsIndicators, atr, ichi));

          return getQuote(data2, containsIndicators, atr, ichi);
        })
        return  { interval: interval, values: quotes[0][0] } as ComplexInterval
      })
      metas.push({
        currency_base: meta.currency_base,
        currency_quote: meta.currency_quote,
        symbol: meta.symbol,
        interval: inters
      })

    })
    return metas
  }
}

function getQuote(quote: Datum, containsIndicators: boolean, atr: Datum, ichi: Datum) {
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
          ichi: ichi === undefined ? undefined : parseFloat(ichi.values[index].senkou_span_a),
        }
      }
    }

    return quoteResponse
  })
}