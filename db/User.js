import mongoose from 'mongoose';
import { ensureMongooseIsConnected } from './db';

ensureMongooseIsConnected();

let User = mongoose.models.User;
if (!User) {
    const userSchema = mongoose.Schema({
        username: String,
        email: String,
        passwordHash: String,
    });
    userSchema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
        },
    });
    User = mongoose.model('User', userSchema);
}

export { User };
