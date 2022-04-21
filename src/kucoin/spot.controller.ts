import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { kucoinOrder } from "src/@types/kucoin.types";
import { Log } from "src/util/logger";
import { KucoinFutureService } from "./kucoin.future.service";
import { KucoinSpotService } from "./kucoin.spot.service";

@Controller('kucoin/spot')
export class SpotController {
    constructor(private readonly spotService: KucoinSpotService,
        private readonly futureService: KucoinFutureService) { }


    @Get('')
    async get() {
        const response = await this.spotService.getAccountInfo()
        Log.log(response)
        return response
    }

    @Post('/order')
    async addOrder(@Body() body: kucoinOrder) {
        const response = await this.spotService.addOrder(body)
        Log.log(response)
        return response
    }

    @Get('/symbols')
    async getSymbols() {
        const response = await this.spotService.getSymbols()
        Log.log(response)
        return response
    }

    @Get('/order/:id')
    async getOrder(@Param('id') id: number) {
        const response = await this.spotService.getOrderByID(id)
        Log.log(response)
        return response
    }

    @Delete('/order/:id')
    async cancelOrder(@Param('id') id: number) {
        const response = await this.spotService.cancelOrder(id)
        Log.log(response)
        return response
    }
}