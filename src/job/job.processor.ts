import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ComplexResponse } from 'src/@types';
import { EventsGateway } from 'src/gateway/events.gateway';
import { SeriesService } from 'src/series/series.service';

@Processor('complex')
export class JobProcessor {

  constructor(private readonly signal: EventsGateway, private readonly series: SeriesService) { }

  @Process('complex')
  async handleTranscode(job: Job) {
    console.log("job started", job.data.signal);

    const complexResponse: ComplexResponse[] = await this.series.postComplex(job.data.signal);
    this.signal.server.emit("complexSignal", complexResponse)
  }
}