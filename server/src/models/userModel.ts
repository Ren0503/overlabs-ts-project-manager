import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { UserDocument } from '../types';

const userSchema = new mongoose.Schema<UserDocument>({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: function () {
            return `https://www.gravatar.com/avatar/${this._id}?d=wavatar`;
        }
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function (this: UserDocument, next) {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 12);
    else next();
});

userSchema.methods.matchPassword = async function (
    this: UserDocument,
    enteredPassword: string,
) {
    return await bcrypt.compare(enteredPassword, this.password)
};

export const User = mongoose.model<UserDocument>('User', userSchema);