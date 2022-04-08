import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Delete, Patch, Post, Put, Res } from '@nestjs/common';
import { Queue } from 'bull';
import { SignalDetectorProps } from 'src/signal/SignalDetector';

@Controller('job')
export class JobController {

    constructor(
        @InjectQueue('complex') private readonly complexQueue: Queue) { }

    @Post()
    async addJob(@Body() body: SignalDetectorProps, @Res() res): Promise<any> {
        await this.complexQueue.add('complex', {
            "signal": body
        }, { repeat: { cron: '*/1 * * * *' } });
        res.status(200).send({ status: "true" })
    }

    @Put()
    async resumeJob(@Res() res) {
        await this.complexQueue.resume()
        res.status(200).send({ status: "true" })
    }

    @Delete()
    async pauseJob(@Res() res) {
        await this.complexQueue.pause();
        res.status(200).send({ status: "true" })
    }
}
