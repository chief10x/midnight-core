import { SignalDetectorProps } from "../signal/SignalDetector";
import { ComplexRequestBody, ListOrder } from "../util/types/network";
import { now } from "./formatter";
export const complexDataBody =
  ({ symbol, interval, start_date, end_date }: SignalDetectorProps): ComplexRequestBody => ({
    symbols: [symbol],
    intervals: [interval],
    end_date: end_date,
    outputsize: 48,
    order: ListOrder.DESC,
    timezone: 'Europe/Rome',
    methods: [
      'time_series',
      {
        name: "atr",
        symbol: [symbol],
        order: ListOrder.DESC,
        interval: [interval]
      }, {
        name: 'ichimoku',
        symbol: [symbol],
        interval: [interval],
        start_date: start_date,
        end_date: end_date,
      }, {
        name: 'macd',
        symbol: [symbol],
        order: ListOrder.DESC,
        interval: [interval],
        start_date: start_date,
        end_date: end_date,
        fast_period: 20,
        slow_period: 40
      }
    ]
  })