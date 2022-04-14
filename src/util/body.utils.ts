import { ComplexProps, ComplexRequestBody, ListOrder } from "src/@types";

export const complexDataBody =
  ({ symbol, interval, start_date, end_date, indicators, outputsize }: ComplexProps): ComplexRequestBody => ({
    symbols: symbol,
    intervals: interval,
    start_date: start_date,
    end_date: end_date,
    outputsize: outputsize,
    order: ListOrder.DESC,
    timezone: process.env.TIME_ZONE,
    methods: ['time_series', ...indicators]
  })