import mongoose from 'mongoose';
import nc from 'next-connect';

///////////////////////////////////////
//
//      Middleware
//
///////////////////////////////////////
let Todo = null;
function dbMiddleware(req, res, next) {
    if (!Todo) {
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

        const todoSchema = mongoose.Schema({ title: String });
        todoSchema.set('toJSON', {
            virtuals: true,
            versionKey: false,
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        });
        Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
    }

    req.db = { Todo };
    next();
}

const handler = nc();
handler.use(dbMiddleware);

///////////////////////////////////////
//
//      Routes
//
///////////////////////////////////////
handler.get(async (req, res) => {
    const todos = await req.db.Todo.find();
    res.json(todos);
});

handler.post(async (req, res) => {
    await req.db.Todo.create(req.body);
    const todos = await req.db.Todo.find();
    res.json(todos);
});

export default handler;
