export enum Methods {
    POST,
    GET
  }

  export enum ListOrder {
    ASC = 'ASC',
    DESC = 'DESC'
  }

  export enum Currencies {
    EURUSD = 'EUR/USD',
    GBPUSD = 'GBP/USD'
  }

  export enum Intervals {
    DAY = '1day',
    HOUR = '1h',
    Minute = '30min',
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
    start_date?: string,
    end_date?: string,
    methods: Array<any>,
    order: ListOrder,
    outputsize: number,
    timezone: string
  }

  export interface ComplexResponse {
    date: Date,
    high: Number,
    low: Number,
    open: Number,
    close: Number,
    atr: Number,
    ichi: Number,
  }

  export interface PairData {
    pair: string
  }

  export interface PairCommandOption extends Pair {
    verbose: boolean,
    pair: Currencies
  }