import { Body, Controller, Post } from '@nestjs/common';
import { AlarmData } from 'src/@types';
import { Log } from 'src/util/logger';
import { webhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {

  constructor(private readonly mService: webhookService) { }

  @Post()
  async postWebhook(@Body() body: AlarmData): Promise<any> {
    const response = await this.mService.postWebhook(body);
    Log.log(response);
    return response;
  }
}
