import { Currencies, Intervals } from "./complex.types";

export interface JobConfig {
  type: string,
}

export interface ComplexConfig extends JobConfig {
  pairs: Currencies[],
  intervals: Intervals[],
}