import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { EventsGateway } from 'src/gateway/events.gateway';
import { EventsModule } from 'src/gateway/events.module';
import { SignalDetectorProps } from 'src/signal/SignalDetector';
import { ComplexResponse } from 'src/util/types/network';
import { SeriesService } from './series.service'

@Controller('series')
export class SeriesController {

    constructor(private readonly mService: SeriesService,
        private readonly eventGateway: EventsGateway
    ) {

    }

    @Get()
    async postSeries(@Body() req: string): Promise<any> {
        return await this.mService.postSeries(req);
    };

    @Post("complex")
    async postComplex(@Body() body: SignalDetectorProps): Promise<ComplexResponse[]> {
        return await this.mService.postComplex(body)
    }

    @Post()
    async post(@Body() body: SignalDetectorProps, @Res() res): Promise<any> {
        const complexResponse: ComplexResponse[] = await this.postComplex(body)
        this.eventGateway.server.emit("complexSignal", complexResponse);
        res.status(200).send({ status: "true" })
    }
}
