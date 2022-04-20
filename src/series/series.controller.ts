import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SeriesService } from './series.service'
import { Request } from 'express';
import { ComplexMeta, ComplexProps } from 'src/@types';
import { Log } from '../util/logger'

@Controller('time_series')
export class SeriesController {

  constructor(private readonly service: SeriesService) {

  }

  @Get()
  async postSeries(@Req() request: Request): Promise<any> {
    const response = await this.service.postSeries(request.url.replace("/", ""));
    Log.log(request.url)
    Log.log(response)
    return response

  };

  @Post("complex")
  async postComplex(@Body() body: ComplexProps): Promise<ComplexMeta[]> {
    const response = await this.service.postComplex(body);
    Log.log(body)
    Log.log(response)
    return response
  }
}
