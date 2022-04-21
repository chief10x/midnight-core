import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ComplexMeta, ComplexSignal } from 'src/@types';
import { EventsGateway } from 'src/gateway/events.gateway';
import { SeriesService } from 'src/series/series.service';
import { DateTime } from 'luxon';

import { default as complexSignal } from '../../config/complexSignal.json'
import { ComplexProps } from "src/@types";
import { Log } from 'src/util/logger';

// Redis calls this on cycle
@Processor('complex')
export class JobProcessor {

  constructor(private readonly signal: EventsGateway, private readonly series: SeriesService) { }

  @Process('complex')
  async handleTranscode(job: Job) {
    console.log("job started");
    const start_date = DateTime.now().startOf('hour').toFormat('yyyy-LL-dd HH:mm')
    const end_date = DateTime.now().toFormat('yyyy-LL-dd HH:mm')

    const { pairs, intervals } = complexSignal as ComplexSignal

    const data: ComplexProps = {
      start_date: start_date,
      end_date: end_date,
      symbol: pairs,
      interval: intervals,
      outputsize: 12,
      indicators: []
    }

    const complexResponse: ComplexMeta[] = await this.series.postComplex(data);
    Log.log(complexResponse)

    this.signal.server.emit("complexSignal", complexResponse)
  }
}