import mongoose from 'mongoose';

export function mongooseTodoMiddleware(req, res, next) {
    mongoose.connect(
        'mongodb://localhost:27017/test',
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
