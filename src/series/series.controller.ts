import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { EventsGateway } from 'src/gateway/events.gateway';
import { SignalDetectorProps } from 'src/signal/SignalDetector';
import { ComplexResponse } from 'src/util/types/network';
import { SeriesService } from './series.service'
import { Request } from 'express';

@Controller('time_series')
export class SeriesController {

    constructor(private readonly mService: SeriesService
    ) {

    }

    @Get()
    async postSeries(@Req() request: Request): Promise<any> {
        return await this.mService.postSeries(request.url.replace("/", ""));
    };

    @Post("complex")
    async postComplex(@Body() body: SignalDetectorProps): Promise<ComplexResponse[]> {
        return await this.mService.postComplex(body)
    }
}
