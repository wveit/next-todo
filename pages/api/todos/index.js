import nc from 'next-connect';
import { Todo } from '../../../db/Todo';

const handler = nc();

handler.get(async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

handler.post(async (req, res) => {
    await Todo.create(req.body);
    const todos = await Todo.find();
    res.json(todos);
});

export default handler;
