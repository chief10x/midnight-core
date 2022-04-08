import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventsGateway } from 'src/gateway/events.gateway';
import { SeriesService } from 'src/series/series.service';
import { ComplexResponse } from 'src/util/types/network';

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