import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/gateway/events.gateway';
import { SeriesController } from 'src/series/series.controller';
import { SeriesService } from 'src/series/series.service';
import { JobController } from './job.controller';
import { JobProcessor } from './job.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'complex',
    }),
  ],
  controllers: [JobController, SeriesController],
  providers: [JobProcessor, EventsGateway, SeriesService],
})
export class JobModule { }