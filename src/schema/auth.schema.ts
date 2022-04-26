import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Roles } from "src/@types";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ unique: false, required: true, dropDups: true })
    username: string;

    @Prop()
    password: string;

    @Prop({ unique: true, required: true, dropDups: true })
    email: string;

    @Prop()
    isActive: boolean;

    @Prop({default: Roles.USER})
    role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);