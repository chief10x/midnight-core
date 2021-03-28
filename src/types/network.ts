export enum Methods {
  POST,
  GET
}

export interface UrlData {
  url: string,
  json?: boolean,
  method?: Methods,
  body?: Object
}

export interface Pair {
  pair: string,
  from?: string,
  to?: string
}

export interface PairData {
  pair: string
}

export interface PairCommandOption extends Pair {
  verbose: boolean
}