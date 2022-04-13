import { timeFormat } from "d3-time-format"

export const now = () => {
  return timeFormat("%Y-%m-%d %H:%M:%S")(new Date())
}