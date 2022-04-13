import { AlarmData } from 'src/@types';
import { RequestBuilder } from '../util/RequestBuilder';

export class webhookService {

  private readonly mBuilder: RequestBuilder = new RequestBuilder()

  async postWebhook(body: AlarmData) {
    await this.mBuilder.sendMessageToDiscord(body)
  }
}