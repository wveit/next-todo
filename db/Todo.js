import mongoose from 'mongoose';
import { ensureMongooseIsConnected } from './db';

ensureMongooseIsConnected();

let Todo = mongoose.models.Todo;
if (!Todo) {
    const todoSchema = mongoose.Schema({ title: String });
    todoSchema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
        },
    });
    Todo = mongoose.model('Todo', todoSchema);
}

export { Todo };
