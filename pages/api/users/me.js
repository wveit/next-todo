import nc from 'next-connect';
import jwt from 'jsonwebtoken';
import { User } from '../../../db/User';

const handler = nc();
const JWT_SECRET = process.env.JWT_SECRET;

handler.get(async (req, res) => {
    const token = req.headers['x-auth-token'];

    if (typeof token !== 'string' || token.length < 3)
        return res
            .statusCode(400)
            .json({ errors: { token: 'Must send token' } });

    let id;
    try {
        id = jwt.verify(token, JWT_SECRET).id;
    } catch (error) {
        return res
            .status(400)
            .json({ errors: { token: 'Must provide valid token' } });
    }

    const user = await User.findById(id);
    const { username, email } = user;

    res.json({
        username,
        email,
    });
});

export default handler;
