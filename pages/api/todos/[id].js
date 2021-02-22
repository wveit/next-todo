import nc from 'next-connect';
import { Todo } from '../../../db/Todo';
import jwt from 'jsonwebtoken';

const handler = nc();
const JWT_SECRET = process.env.JWT_SECRET;

handler.delete(async (req, res) => {
    let userId;
    try {
        const token = req.headers['x-auth-token'];
        const payload = jwt.verify(token, JWT_SECRET);
        userId = payload.id;
    } catch (error) {
        console.error('Error /api/todos/delete: ', error.message);
        return res
            .status(400)
            .json({ errors: { token: 'Must provide valid token' } });
    }

    const id = req.query.id;
    await Todo.deleteOne({ _id: id, owner: userId });
    const todos = await Todo.find({ owner: userId });
    res.json(todos);
});

handler.put(async (req, res) => {
    let userId;
    try {
        const token = req.headers['x-auth-token'];
        const payload = jwt.verify(token, JWT_SECRET);
        userId = payload.id;
    } catch (error) {
        console.error('Error /api/todos/update: ', error.message);
        return res
            .status(400)
            .json({ errors: { token: 'Must provide valid token' } });
    }

    const inputTodo = req.body;
    if (inputTodo.owner !== userId) {
        console.error(
            `Error /api/todos/update: ${inputTodo.owner} does not equal ${userId}`
        );
        return res
            .status(400)
            .json({ errors: { token: 'Token does not match todo' } });
    }

    const id = req.query.id;
    await Todo.findOneAndUpdate({ _id: id }, inputTodo);
    const todos = await Todo.find({ owner: userId });
    res.json(todos);
});

export default handler;
