import { ComplexProps, ComplexResponse } from "src/@types";

export class SignalDetector {

  data: Array<ComplexResponse> = []

  constructor(signalDetectorProps: ComplexProps) {
    console.log('requesting data')
    this.requestData(signalDetectorProps)
  }

  // on Event of new entry
  updateData = (newData: Array<ComplexResponse>) => {
    this.data = [...this.data, ...newData]
  }

  // Asks data util for the latest data!
  private requestData = async (signalDetectorProps: ComplexProps) => {

  }
}