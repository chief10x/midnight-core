import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schema/auth.schema";
import { MailerService } from "@nestjs-modules/mailer";
import { join } from "path";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { JwtService } from '@nestjs/jwt';
import { Roles } from "src/@types";

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        private mailerService: MailerService,
        private jwtService: JwtService) {
        super();

    }

    async changeRole(email: string, role: Roles) {
        const user = await this.userModel.findOne({ email: email });
        if (user != undefined) {
            user.role = role;
            await user.save();
            return { status: 'success', message: 'Role changed' }
        }
        return { status: 'error', message: 'User not found' }
    }

    async login(body: User) {
        const user = await this.userModel.findOne({ email: body.email });
        if (user === undefined) {
            return {
                status: false,
                message: "User not found"
            }
        }
        if (user.isActive === false) {
            return {
                status: false,
                message: "User is not active"
            }
        }
        if (user.password === body.password) {
            const payload = { username: user.username, email: user.email, role: user.role };
            return {
                status: true,
                message: "Login Successful",
                access_token: this.jwtService.sign(payload),
            }
        }
    }

    async signup(user: User) {
        const previewUser = await this.userModel.findOne({ email: user.email })
        console.log(previewUser);
        if (previewUser != undefined) {
            if (previewUser.isActive === false) {
                this.signAndSendEmail(previewUser);
                return { status: 'success', message: 'User already exists, but not verified' }
            }
            return { status: 'error', message: 'Email already exists' }
        }

        const newUser = new this.userModel(user);
        newUser.isActive = false;
        this.signAndSendEmail(newUser);
        await newUser.save();

        return { status: 'success', message: 'User created' }
    }

    private async signAndSendEmail(user: User) {
        const payload = { username: user.username, email: user.email };
        this.sendEmail(user, this.jwtService.sign(payload));
    }

    async verify(token: string) {
        console.log(token);

        const verify = this.jwtService.decode(token);
        if (Date.now() / 1000 - verify['iat'] > 3600) {
            return { status: 'error', message: 'Token expired' }
        }
        const user = await this.userModel.findOne({ email: verify['email'] });
        user.isActive = true;
        await user.save();
        return { status: 'success', message: 'User verified' }
    }

    async sendEmail(user: User, token: string) {
        const url = `${process.env.URL}/auth/verify?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            from: process.env.SENDER_EMAIL, // override default from
            subject: 'Welcome to Midnight! Confirm your Email',
            template: 'confirmation',
            context: {
                name: user.username,
                url,
            },
        });
    }
}