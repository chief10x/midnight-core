import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import { User, UserSchema } from 'src/schema/auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRoot({
            transport: {
                host: "mail.privateemail.com",
                port: 465,
                secure: true,
                tls: { rejectUnauthorized: false },
                auth: {
                    user: process.env.SENDER_EMAIL,
                    pass: process.env.SENDER_EMAIL_PASSWORD,
                },
                debug: true,
                logger: true
            },
            template: {
                dir: join(__dirname, '../../../email/templates/'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        MongooseModule.forRoot('mongodb+srv://test:1234@cluster0.ghufg.mongodb.net/midnight?retryWrites=true&w=majority', { dbName: 'midnight' }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }