import { RequestBuilder } from '../util/request.utils'
import { formatComplexResponse } from '../util/format.utils'
import { ComplexProps } from 'src/@types/complex.types'

export class SeriesService {

    private readonly builder: RequestBuilder = new RequestBuilder()

    async postComplex(body: ComplexProps) {
        console.log("hello");

        const response = await this.builder.requestComplexFrom(body)
        return formatComplexResponse(response)
    }

    async postSeries(body: string) {
        return await this.builder.requestPairFromQuery(body);
    }
}