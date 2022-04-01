import { Injectable, Scope } from '@nestjs/common';
import { SignalDetectorProps } from '../signal/SignalDetector';
import { requestBuilder } from '../util/requestBuilder'
import {formatComplexResponse} from '../util/formatter'

@Injectable()
export class SeriesService {

    private readonly builder: requestBuilder = new requestBuilder()

    async postComplex(body: SignalDetectorProps) {
        const response = await this.builder.requestComplexFrom(body)
        const complex = formatComplexResponse(response)
        return complex
    }
}