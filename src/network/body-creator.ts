import { SignalDetectorProps } from "../singal/SignalDetector";
import { ComplexRequestBody, ListOrder } from "../types/network";
import { now } from "../utils/formatter";

export const complexDataBody =
  ({ symbol, interval }: SignalDetectorProps): ComplexRequestBody => ({
    symbols: [symbol],
    intervals: [interval],
    start_date: '2021-03-27',
    end_date: now(),
    outputsize: 12,
    order: ListOrder.ASC,
    timezone: 'Europe/Rome',
    methods: [
      'time_series', {
        name: "atr",
        symbol: [symbol],
        order: ListOrder.ASC,
        interval: [interval]
      }, {
        name: 'ichimoku',
        symbol: [symbol],
        interval: [interval],
        end_date: now(),
      }, {
        name: 'macd',
        symbol: [symbol],
        order: ListOrder.ASC,
        interval: [interval],
        fast_period: 20,
        slow_period: 40
      }
    ]
  })