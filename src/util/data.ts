import { complexDataBody } from "./bodyCreator";
import { requestBuilder } from "./requestBuilder";
import { SignalDetectorProps } from "../signal/SignalDetector";
import { ComplexResponse } from "./types/network";
import { formatComplexResponse } from "./formatter";

export const getData =
  async (signalDetectorProps: SignalDetectorProps) => {
    // return requestComplexFrom(signalDetectorProps)
    //   .then((response) => formatComplexResponse(response))
  }