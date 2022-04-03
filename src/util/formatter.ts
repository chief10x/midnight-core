import { ComplexResponse } from "./types/network"
import { timeFormat } from "d3-time-format";
import { Log } from "./logger"

export const formatComplexResponse = (resJson): Array<ComplexResponse> => {

  if (resJson.data && resJson.data[0].values) {
    const atr = resJson.data[1].values
    const ichi = resJson.data[2]?.values
    const macd = resJson.data[3]?.values

    const res = resJson.data[0].values.map((row, index) => {
      var trendDown = -1000;
      var trendUp = -1000;
      if (macd != undefined) {
        const rowMacd = macd[index].macd
        const rowMacd1 = index > 0 ? macd[index - 1].macd : rowMacd

        //const rowMacd2 = macd[index - 2].macd
        //const rowMacd3 = macd[index - 3].macd

        const t1 = (rowMacd - rowMacd1) * 150
        //const t2 = rowMacd2 - rowMacd3 * 150

        trendUp = t1 >= 0 ? t1 : 0
        trendDown = t1 < 0 ? (-1 * t1) : 0
      }
      return ({
        date: new Date(row.datetime),
        high: parseFloat(row.high),
        low: parseFloat(row.low),
        open: parseFloat(row.open),
        close: parseFloat(row.close),
        atr: parseFloat(atr == undefined ? -1000 : atr[index].atr),
        ichi: parseFloat(ichi == undefined ? -1000 : ichi[index].senkou_span_a),
        macd: parseFloat(macd == undefined ? -1000 : macd[index].macd),
        trendUp: trendUp,
        trendDown: trendDown
      })
    })

    return res
  }
  return JSON.parse(resJson)
}

export const now = () => {
  return timeFormat("%Y-%m-%d %H:%M:%S")(new Date())
}