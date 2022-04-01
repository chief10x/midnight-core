import { Module } from '@nestjs/common';
import { SeriesService } from './series/series.service'
import { SeriesController } from './series/series.controller';
import { ConfigModule } from '@nestjs/config';
import { requestBuilder } from './util/requestBuilder';

@Module({
  imports: [ConfigModule.forRoot(), requestBuilder],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class AppModule { }
