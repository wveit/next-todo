import nc from 'next-connect';
import { User } from '../../../db/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const handler = nc();

handler.post(async (req, res) => {
    const { email, password } = req.body;

    const errors = await validateInputs({ email, password });
    if (errors) {
        return res.status(400).json({ errors });
    }

    let user;
    try {
        user = await User.findOne({ email });
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) throw new Error('password did not match');
    } catch (error) {
        return res
            .status(400)
            .json({ errors: { credentials: 'Credentials are invalid' } });
    }

    const token = jwt.sign({ id: user.id }, '<<<JWT_SECRET>>>');
    res.json({ token });
});

async function validateInputs(inputs) {
    const { email, password } = inputs;
    const errors = {};

    if (typeof email !== 'string' || email.length < 3) {
        errors.email = 'Must provide valid email';
    }

    if (typeof password !== 'string' || password.length < 3) {
        errors.password = 'Must provide valid password';
    }

    if (Object.keys(errors).length === 0) return null;
    else return errors;
}

export default handler;
