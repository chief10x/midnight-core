import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SeriesService } from './series.service'
import { Request } from 'express';
import { ComplexProps, ComplexResponse } from 'src/@types';

@Controller('time_series')
export class SeriesController {

  constructor(private readonly service: SeriesService) {

  }

  @Get()
  async postSeries(@Req() request: Request): Promise<any> {
    return await this.service.postSeries(request.url.replace("/", ""));
  };

  @Post("complex")
  async postComplex(@Body() body: ComplexProps): Promise<ComplexResponse[]> {
    return await this.service.postComplex(body)
  }
}
