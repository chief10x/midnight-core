import { SignalDetector, SignalDetectorProps } from "../signal/SignalDetector";
import { ComplexRequestBody, ListOrder } from "../util/types/network";
import { now } from "./formatter";

export function complexBody(props: SignalDetectorProps) {
  console.log(props.indicators);

  if (props.indicators) {
    return getComplexBody(props)
  } else {
    return getSimpleBody(props)
  }
}

function getSimpleBody({ symbol, interval, start_date, end_date }: SignalDetectorProps) {
  const body: ComplexRequestBody = {
    symbols: symbol,
    intervals: interval,
    end_date: end_date,
    start_date: start_date,
    outputsize: 48,
    order: ListOrder.DESC,
    timezone: 'Europe/Rome',
    methods: [
      {
        name: "atr",
        symbol: symbol,
        order: ListOrder.DESC,
        interval: interval
      }
    ]
  }
  return body
}

function getComplexBody({ symbol, interval, start_date, end_date }: SignalDetectorProps) {
  const body: ComplexRequestBody = {
    symbols: symbol,
    intervals: interval,
    end_date: end_date,
    start_date: start_date,
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
  }
  return body
}
// const complexDataBody =
//   ({ symbol, interval, start_date, end_date, indicators }: SignalDetectorProps): ComplexRequestBody => ({
//     symbols: symbol,
//     intervals: interval,
//     end_date: end_date,
//     outputsize: 48,
//     order: ListOrder.DESC,
//     timezone: 'Europe/Rome',
//     methods: [
//       'time_series',
//       {
//         name: "atr",
//         symbol: [symbol],
//         order: ListOrder.DESC,
//         interval: [interval]
//       }, {
//         name: 'ichimoku',
//         symbol: [symbol],
//         interval: [interval],
//         start_date: start_date,
//         end_date: end_date,
//       }, {
//         name: 'macd',
//         symbol: [symbol],
//         order: ListOrder.DESC,
//         interval: [interval],
//         start_date: start_date,
//         end_date: end_date,
//         fast_period: 20,
//         slow_period: 40
//       }
//     ]
//   })