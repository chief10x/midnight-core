import { RequestBuilder } from '../util/RequestBuilder'
import { formatComplexResponse } from '../util/formatter'
import { ComplexProps } from 'src/@types/complex.types'

export class SeriesService {

    private readonly builder: RequestBuilder = new RequestBuilder()

    async postComplex(body: ComplexProps) {
        const response = await this.builder.requestComplexFrom(body)
        return formatComplexResponse(response)
    }

    async postSeries(body: string) {
        return await this.builder.requestPairFromQuery(body)
    }
}