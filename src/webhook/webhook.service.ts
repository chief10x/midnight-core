import { Injectable } from "@nestjs/common";
import { AlarmData } from "src/util/types/alarmHook";
import { RequestBuilder } from '../util/RequestBuilder';

export class webhookService {

    private readonly mBuilder: RequestBuilder = new RequestBuilder()

    async postWebhook(body: AlarmData) {
        await this.mBuilder.sendMessageToDiscord(body)
    }

}