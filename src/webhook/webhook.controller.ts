import { Body, Controller, Post } from '@nestjs/common';
import { AlarmData } from 'src/@types';
import { webhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {

  constructor(private readonly mService: webhookService) { }

  @Post()
  async postWebhook(@Body() body: AlarmData): Promise<any> {
    return this.mService.postWebhook(body);
  }
}
