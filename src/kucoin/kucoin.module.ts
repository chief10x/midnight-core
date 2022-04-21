import { Module } from '@nestjs/common';
import { SpotController } from './spot.controller'
import { KucoinFutureService } from './kucoin.future.service';
import { KucoinSpotService } from './kucoin.spot.service';
import { FuturesController } from './futures.controller';
@Module({
    controllers: [SpotController, FuturesController],
    providers: [KucoinSpotService, KucoinFutureService]
})
export class KucoinModule { }
