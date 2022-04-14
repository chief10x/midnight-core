export interface Indicator {
  name: string;
  time_period: number;
}

export interface Meta {
  symbol: string;
  interval: string;
  currency_base: string;
  currency_quote: string;
  type: string;
  indicator: Indicator;
}

export interface Value {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  atr: string;
  senkou_span_a: string;
}

export interface Datum {
  meta: Meta;
  values: Value[];
  status: string;
}