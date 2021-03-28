export enum Methods {
  POST,
  GET
}

export enum Currencies {
  EURUSD = 'EUR/USD',
  GBPUSD = 'GBP/USD'
}

export enum Intervals {
  DAY = '1day',
  HOUR = '1hour'
}

export interface UrlData {
  url: string,
  json?: boolean,
  method?: Methods,
  body?: Object
}

export interface Pair {
  pair: Currencies,
  from?: string,
  to?: string
}

export interface ComplexRequestBody {
  symbols: Array<Currencies>,
  intervals: Array<Intervals>,
  start_date: string,
  end_date: string,
  methods: Array<any>
}

export interface PairData {
  pair: string
}

export interface PairCommandOption extends Pair {
  verbose: boolean
}