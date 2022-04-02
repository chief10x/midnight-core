import { complexDataBody } from "./bodyCreator";
import { RequestBuilder } from "./RequestBuilder";
import { SignalDetectorProps } from "../signal/SignalDetector";
import { ComplexResponse } from "./types/network";
import { formatComplexResponse } from "./formatter";

export const getData =
  async (signalDetectorProps: SignalDetectorProps) => {
    // return requestComplexFrom(signalDetectorProps)
    //   .then((response) => formatComplexResponse(response))
  }