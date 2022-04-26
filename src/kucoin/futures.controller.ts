import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/@types";
import { kucoinPosition } from "src/@types/kucoin.types";
import JwtAuthenticationGuard from "src/auth/jwt-authentication.guard";
import RoleGuard from "src/auth/role.guard";
import { Log } from "src/util/logger";
import { KucoinFutureService } from "./kucoin.future.service";

@UseGuards(RoleGuard(Roles.ADMIN))
@UseGuards(JwtAuthenticationGuard)
@Controller('kucoin/futures')
export class FuturesController {

    constructor(private readonly futureService: KucoinFutureService) {

    }

    @Get('/contracts')
    async getOpenContracts() {
        const response = await this.futureService.getOpenContracts();
        Log.log(response);
        return response;
    }

    @Post('/order')
    async openClosePosition(@Body() body: kucoinPosition) {
        const response = await this.futureService.openClosePosition(body)
        Log.log(response)
        return response
    }

    @Get('/positions/:symbol')
    async getOpenPositions(@Param('symbol') symbol: string) {
        const response = await this.futureService.openPositions(symbol)
        Log.log(response)
        return response
    }

}