export enum AlarmType { Message, Warning }

export type AlarmData = {
  type: AlarmType,
  close: string,
  open: string,
  low: string,
  high: string,
  time: string,
  volume: string,
  ticker: string
}