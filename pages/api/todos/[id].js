import nc from 'next-connect';
import { mongooseTodoMiddleware } from '../../../middleware/db-middleware';

const handler = nc();

handler.use(mongooseTodoMiddleware);

handler.delete(async (req, res) => {
    const id = req.query.id;
    console.log('deleting id: ', id);
    await req.db.Todo.deleteOne({ _id: id });
    const todos = await req.db.Todo.find();
    res.json(todos);
});

export default handler;
