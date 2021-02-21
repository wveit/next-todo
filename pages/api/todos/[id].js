import nc from 'next-connect';
import { Todo } from '../../../db/Todo';

const handler = nc();

handler.delete(async (req, res) => {
    const id = req.query.id;
    console.log('deleting id: ', id);
    await Todo.deleteOne({ _id: id });
    const todos = await Todo.find();
    res.json(todos);
});

export default handler;
