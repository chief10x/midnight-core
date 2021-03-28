export interface UrlData {
  url: string,
  json?: boolean
}

export interface Pair {
  pair: string,
  from?: string
}

export interface PairData {
  pair: string
}

export interface PairCommandOption extends Pair {
  verbose: boolean
}