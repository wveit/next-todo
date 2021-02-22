import nc from 'next-connect';
import { User } from '../../../db/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const handler = nc();
const JWT_SECRET = process.env.JWT_SECRET;

handler.post(async (req, res) => {
    const { username, email, password } = req.body;

    const errors = await validateInputs({ username, email, password });
    if (errors) {
        return res.status(400).json({ errors });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, passwordHash });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET);
    res.json({ token });
});

async function validateInputs(inputs) {
    const { username, email, password } = inputs;
    const errors = {};

    if (typeof email !== 'string' || email.length < 3) {
        errors.email = 'Must provide valid email';
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) errors.email = 'Email already in use';

    if (typeof username !== 'string' || username.length < 3) {
        errors.username = 'Must provide valid username';
    }

    if (typeof password !== 'string' || password.length < 3) {
        errors.password = 'Must provide valid password';
    }

    if (Object.keys(errors).length === 0) return null;
    else return errors;
}

export default handler;
