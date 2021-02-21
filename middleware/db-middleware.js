import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

export async function mongooseTodoMiddleware(req, res, next) {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to db');
    } catch (error) {
        console.error(
            'Error: mongooseTodoMiddleware db connection: ' + error.message
        );
        return res
            .status(500)
            .json({ errors: { serverError: 'There was a server error' } });
    }

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

    req.db = { Todo };
    next();
}
