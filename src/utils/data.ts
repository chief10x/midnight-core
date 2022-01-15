import { complexDataBody } from "../network/body-creator";
import { requestComplexFrom } from "../network/request-builder";
import { SignalDetectorProps } from "../singal/SignalDetector";
import { ComplexResponse } from "../types/network";
import { formatComplexResponse } from "./formatter";

export const getData =
  async (signalDetectorProps: SignalDetectorProps): Promise<ComplexResponse[]> => {
    return requestComplexFrom(signalDetectorProps)
      .then((response) => formatComplexResponse(response))
  }