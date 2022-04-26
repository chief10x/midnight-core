import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/@types';
import { AuthService } from './auth.service';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import RoleGuard from './role.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly mService: AuthService) { }

    @Post('login')
    async login(@Body() body: any) {
        return await this.mService.login(body);
    }

    @Post('signup')
    async signup(@Body() body: any) {
        return await this.mService.signup(body);
    }

    @Get('verify?')
    async verify(@Query('token') token: string) {
        return await this.mService.verify(token);
    }

    @UseGuards(RoleGuard(Roles.ADMIN))
    @UseGuards(JwtAuthenticationGuard)
    @Put('change-role?')
    async changeRole(@Query('email') email: string, @Query('role') role: Roles) {
        return await this.mService.changeRole(email, role);
    }
}
