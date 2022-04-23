import { RequestBuilder } from '../util/request.utils'
import { formatComplexResponse } from '../util/format.utils'
import { ComplexProps, TDComplexResponse } from 'src/@types/complex.types'
import {default as t} from '../../config/test.json'

export class SeriesService {

    private readonly builder: RequestBuilder = new RequestBuilder()

    async postComplex(body: ComplexProps) {
        const response = await this.builder.requestComplexFrom(body)
        // console.log(response);
        // console.log(t);

        return formatComplexResponse(response)
        // return null
    }

    async postSeries(body: string) {
        return await this.builder.requestPairFromQuery(body);
    }
}