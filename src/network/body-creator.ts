import { SignalDetectorProps } from "../singal/SignalDetector";
import { ComplexRequestBody, ListOrder } from "../types/network";
import { now } from "../utils/formatter";

export const complexDataBody =
  ({ symbol, interval }: SignalDetectorProps): ComplexRequestBody => ({
    symbols: [symbol],
    intervals: [interval],
    end_date: now(),
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
        start_date: '2022-01-8',
        end_date: now(),
      }, {
        name: 'macd',
        symbol: [symbol],
        order: ListOrder.DESC,
        interval: [interval],
        start_date: '2022-01-8',
        end_date: now(),
        fast_period: 20,
        slow_period: 40
      }
    ]
  })