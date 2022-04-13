import { timeFormat } from "d3-time-format";
import { ComplexResponse } from "src/@types";
import { TDComplexResponse } from "src/@types/format.types";

export const formatComplexResponse = (res: TDComplexResponse): Array<ComplexResponse> => {

  if (res.data && res.data[0].values) {

    const quotes = res.data.find((data) => data.meta.indicator === undefined)
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

    const complexResponse = quotes.values.map((quote, index): ComplexResponse => {

      let quoteResponse: ComplexResponse = {
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

    return complexResponse
  }
}

export const now = () => {
  return timeFormat("%Y-%m-%d %H:%M:%S")(new Date())
}