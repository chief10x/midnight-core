import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignalDetectorProps } from 'src/signal/SignalDetector';
import { SeriesService } from './series.service'

@Controller('series')
export class SeriesController {

    constructor(private readonly mService: SeriesService) { }

    @Get()
    async postSeries(@Body() req: string): Promise<any> {
        return await this.mService.postSeries(req);
    };

    @Post("complex")
    async postComplex(@Body() body: SignalDetectorProps): Promise<any> {
        return await this.mService.postComplex(body)
    }
}
