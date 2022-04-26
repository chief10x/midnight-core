import { RequestBuilder } from '../util/request.utils'
import { formatComplexResponse } from '../util/format.utils'
import { ComplexProps, TDComplexResponse } from 'src/@types/complex.types'

export class SeriesService {

    private readonly builder: RequestBuilder = new RequestBuilder()

    async postComplex(body: ComplexProps) {
        const response = await this.builder.requestComplexFrom(body)
        console.log(response);
        
        return formatComplexResponse(response)
    }

    async postSeries(body: string) {
        return await this.builder.requestPairFromQuery(body);
    }
}