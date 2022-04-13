import { Module } from '@nestjs/common';
import { SeriesService } from './series/series.service'
import { SeriesController } from './series/series.controller';
import { ConfigModule } from '@nestjs/config';
import { WebhookController } from './webhook/webhook.controller';
import { webhookService } from './webhook/webhook.service'
import { RequestBuilder } from './util/request.utils';
import { EventsGateway } from './gateway/events.gateway';
import { BullModule } from '@nestjs/bull';
import { JobController } from './job/job.controller';
import { JobProcessor } from './job/job.processor';

@Module({
  imports: [ConfigModule.forRoot(), RequestBuilder,
  BullModule.registerQueue({
    name: 'complex',
  }),
  BullModule.forRoot({
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD
    },
  }),
  ],
  controllers: [JobController, SeriesController, WebhookController],
  providers: [SeriesService, webhookService, EventsGateway, JobProcessor],
})
export class AppModule { }
