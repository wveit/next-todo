import nc from 'next-connect';
import { Todo } from '../../../db/Todo';
import jwt from 'jsonwebtoken';

const handler = nc();

handler.get(async (req, res) => {
    let userId;
    try {
        const token = req.headers['x-auth-token'];
        const payload = jwt.verify(token, '<<<JWT_SECRET>>>');
        userId = payload.id;
    } catch (error) {
        console.error(error.message);
        return res
            .status(400)
            .json({ errors: { token: 'Must provide valid token' } });
    }

    const todos = await Todo.find({ owner: userId });
    res.json(todos);
});

handler.post(async (req, res) => {
    let userId;
    try {
        const token = req.headers['x-auth-token'];
        const payload = jwt.verify(token, '<<<JWT_SECRET>>>');
        userId = payload.id;
    } catch (error) {
        console.error(error.message);
        return res
            .status(400)
            .json({ errors: { token: 'Must provide valid token' } });
    }

    await Todo.create({ ...req.body, owner: userId });
    const todos = await Todo.find({ owner: userId });
    res.json(todos);
});

export default handler;
