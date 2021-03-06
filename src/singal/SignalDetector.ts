import { ComplexResponse, Currencies, Intervals } from "../types/network";
import { getData } from "../utils/data";

export interface SignalDetectorProps {
  symbol: Currencies,
  interval: Intervals,
  dates?: [string, string],
}

export class SignalDetector {

  data: Array<ComplexResponse> = []

  constructor(signalDetectorProps: SignalDetectorProps) {
    console.log('requesting data')
    this.requestData(signalDetectorProps)    
  }

  // on Event of new entry
  updateData = (newData: Array<ComplexResponse>) => {
    this.data = [...this.data, ...newData]
  }

  // Asks data util for the latest data! 
  private requestData = async (signalDetectorProps: SignalDetectorProps) => {
    const data = await getData(signalDetectorProps)
    console.log('DataProvider', data)
  }
}