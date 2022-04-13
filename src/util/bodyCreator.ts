import { ComplexProps, ComplexRequestBody, ListOrder } from "src/@types";
import { now } from "./formatter";

export const complexDataBody =
  ({ symbol, interval, start_date, end_date }: ComplexProps): ComplexRequestBody => ({
    symbols: symbol,
    intervals: interval,
    end_date: end_date,
    outputsize: 12,
    order: ListOrder.DESC,
    timezone: 'Europe/Rome',
    methods: [
      'time_series',
    ]
  })