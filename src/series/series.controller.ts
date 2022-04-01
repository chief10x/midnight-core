import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SignalDetectorProps } from 'src/signal/SignalDetector';
// import { requestPairFromQuery, requestComplexFrom } from '../util/requestBuilder'
import {SeriesService} from './series.service'

@Controller('series')
export class SeriesController {

    constructor(private readonly mService: SeriesService) {}
    @Get()
    async postSeries(@Body() req: string): Promise<any> {
        // const response = await requestPairFromQuery(req)
        // return response
    };

    @Post("complex")
    async postComplex(@Body() body: SignalDetectorProps): Promise<any> {
        return await this.mService.postComplex(body)
    }
}
