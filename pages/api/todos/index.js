import nc from 'next-connect';
import { mongooseTodoMiddleware } from '../../../middleware/db-middleware';

const handler = nc();

handler.use(mongooseTodoMiddleware);

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
