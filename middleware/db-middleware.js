import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

export function mongooseTodoMiddleware(req, res, next) {
    mongoose.connect(
        MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        function (error) {
            if (error) console.log('Error connecting to db');
            else console.log('Connected to db');
        }
    );

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
