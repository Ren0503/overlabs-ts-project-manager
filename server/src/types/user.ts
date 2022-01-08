import mongoose, { Document } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    avatar: string;   
}

export interface UserDocument extends IUser, Document {
    matchPassword: (password: string) => Promise<boolean>
}

export interface UserModel extends mongoose.Model<UserDocument> {}