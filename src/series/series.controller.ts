import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SeriesService } from './series.service'
import { Request } from 'express';
import { ComplexMeta, ComplexProps, Roles } from 'src/@types';
import { Log } from '../util/logger'
import RoleGuard from 'src/auth/role.guard';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';

@Controller('time_series')
export class SeriesController {

  constructor(private readonly service: SeriesService) {

  }

  @UseGuards(RoleGuard(Roles.USER))
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async postSeries(@Req() request: Request): Promise<any> {
    const response = await this.service.postSeries(request.url.replace("/", ""));
    // Log.log(request.url)
    // Log.log(response)
    return response

  };

  @UseGuards(RoleGuard(Roles.USER))
  @UseGuards(JwtAuthenticationGuard)
  @Post("complex")
  async postComplex(@Body() body: ComplexProps): Promise<ComplexMeta[]> {
    const response = await this.service.postComplex(body);
    // Log.log(body)
    // Log.log(response)
    return response
  }
}