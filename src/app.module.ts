import { Module } from '@nestjs/common';
import { SeriesService } from './series/series.service'
import { SeriesController } from './series/series.controller';
import { ConfigModule } from '@nestjs/config';
import { WebhookController } from './webhook/webhook.controller';
import { webhookService } from './webhook/webhook.service'
import { RequestBuilder } from './util/RequestBuilder';

@Module({
  imports: [ConfigModule.forRoot(), RequestBuilder],
  controllers: [SeriesController, WebhookController],
  providers: [SeriesService, webhookService],
})
export class AppModule { }
